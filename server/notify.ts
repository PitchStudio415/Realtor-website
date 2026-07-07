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

/** Human-readable summary of a lead, used as the Follow Up Boss inquiry note. */
function summarize(c: Contact): string {
  const lines = [
    `Looking to: ${TYPE_LABELS[c.type || ""] || c.type}`,
    c.timeline ? `Timeline: ${TIMELINE_LABELS[c.timeline] || c.timeline}` : null,
    c.city ? `Areas of interest: ${c.city}` : null,
    c.message ? `\n${c.message}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

/**
 * Creates a lead in Follow Up Boss via the events API. Follow Up Boss then
 * notifies the agent (email + app) per their own notification settings.
 * No-op (silent) unless FUB_API_KEY is set, so the form keeps working before
 * the secret is added.
 */
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

/** Deliver a lead to all configured channels; never throws, so it can't block the submission. */
export async function deliverLead(c: Contact): Promise<void> {
  await Promise.allSettled([sendToFollowUpBoss(c)]);
}
