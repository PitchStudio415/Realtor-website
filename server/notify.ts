import nodemailer from "nodemailer";
import type { Contact } from "@shared/schema";

const TYPE_LABELS: Record<string, string> = {
  buyer: "Buy a home",
  seller: "Sell a home",
  both: "Buy and sell",
  exploring: "Just exploring",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "As soon as possible",
  "1-3months": "1-3 months",
  "3-6months": "3-6 months",
  "6-12months": "6-12 months",
  researching: "Just researching",
};

/** Human-readable summary of a lead, used in both the email and the FUB note. */
function summarize(c: Contact): string {
  const lines = [
    `Name: ${c.name}`,
    `Email: ${c.email}`,
    c.phone ? `Phone: ${c.phone}` : null,
    `Looking to: ${TYPE_LABELS[c.type || ""] || c.type}`,
    c.timeline ? `Timeline: ${TIMELINE_LABELS[c.timeline] || c.timeline}` : null,
    c.city ? `Areas of interest: ${c.city}` : null,
    c.message ? `\n${c.message}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

/** Emails the lead to the agent. No-op (silent) unless SMTP env vars are set. */
export async function sendLeadEmail(c: Contact): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return;
  try {
    const port = Number(SMTP_PORT || 587);
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    const to = process.env.LEAD_NOTIFY_EMAIL || "Muzamil@risegroup.com";
    await transport.sendMail({
      from: `"New Website Lead" <${SMTP_USER}>`,
      to,
      replyTo: c.email,
      subject: `New lead: ${c.name} (${TYPE_LABELS[c.type || ""] || c.type})`,
      text: `You have a new lead from muzamilkhanrealtor.com/start\n\n${summarize(c)}\n\nReply to this email to respond directly to ${c.name}.`,
    });
  } catch (err) {
    console.error("Lead email failed:", (err as Error).message);
  }
}

/** Creates a lead in Follow Up Boss. No-op (silent) unless FUB_API_KEY is set. */
export async function sendToFollowUpBoss(c: Contact): Promise<void> {
  const apiKey = process.env.FUB_API_KEY;
  if (!apiKey) return;
  try {
    const parts = c.name.trim().split(/\s+/);
    const firstName = parts[0] || c.name;
    const lastName = parts.slice(1).join(" ");
    const auth = Buffer.from(`${apiKey}:`).toString("base64");
    const person: Record<string, unknown> = {
      firstName,
      emails: [{ value: c.email }],
      tags: ["Website Lead", "Start Form"],
    };
    if (lastName) person.lastName = lastName;
    if (c.phone) person.phones = [{ value: c.phone }];
    if (c.city) person.addresses = [{ city: c.city, type: "interested" }];

    const res = await fetch("https://api.followupboss.com/v1/events", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        "X-System": "muzamilkhanrealtor.com",
      },
      body: JSON.stringify({
        source: "muzamilkhanrealtor.com",
        system: "muzamilkhanrealtor.com",
        type: "Inquiry",
        message: summarize(c),
        person,
      }),
    });
    if (!res.ok) {
      console.error("Follow Up Boss lead failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Follow Up Boss lead error:", (err as Error).message);
  }
}

/** Fire both delivery channels; never throws, so a failure can't block the submission. */
export async function deliverLead(c: Contact): Promise<void> {
  await Promise.allSettled([sendLeadEmail(c), sendToFollowUpBoss(c)]);
}
