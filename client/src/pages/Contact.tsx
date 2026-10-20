import { useState } from "react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import { TrailPage, PageHero, ChatIcon } from "@/components/trail/Parts";
import { PHONE, SMS, EMAIL, CALENDLY } from "@/lib/trail";

type Intent = "buy" | "sell" | "exploring";

export default function Contact() {
  const { toast } = useToast();
  const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  const [intent, setIntent] = useState<Intent>(params.get("type") === "seller" ? "sell" : "buy");
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const send = useMutation({
    mutationFn: async () =>
      apiRequest("POST", "/api/contacts", {
        ...form,
        type: intent === "sell" ? "seller" : "buyer",
        timeline: intent === "exploring" ? "exploring" : "",
      }),
    onSuccess: () => {
      setSent(true);
      trackEvent("contact_form_submit", { lead_type: intent === "sell" ? "seller" : "buyer" });
    },
    onError: () => toast({ title: "Something went wrong", description: `Please text ${PHONE} instead.`, variant: "destructive" }),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please add your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Please add a valid email.";
    setErrors(errs);
    if (!Object.keys(errs).length) send.mutate();
  };

  const field = (key: keyof typeof form, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <>
      <label htmlFor={`f-${key}`}>{label}</label>
      <input
        id={`f-${key}`}
        className="in"
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        aria-invalid={!!errors[key]}
        data-testid={`input-contact-${key}`}
        {...props}
      />
      {errors[key] && <p className="err">{errors[key]}</p>}
    </>
  );

  return (
    <TrailPage>
      <PageHero title="Get in touch" lede="Buying, selling, or just exploring? Text is fastest. I'll get back to you within a business day." />
      <section className="s">
        <div className="w ct">
          {sent ? (
            <div className="form" data-testid="contact-success">
              <h2 style={{ fontSize: 32 }}>Thanks, I've got it.</h2>
              <p style={{ color: "var(--ink-2)", marginTop: 12 }}>
                I'll get back to you within a business day. While you wait, the Path to Keys guide walks through every step of buying here.
              </p>
              <div className="acts" style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link className="btn go" href="/buy/path-to-keys">See Path to Keys</Link>
                <Link className="btn alt" href="/blog">Read the blog</Link>
              </div>
            </div>
          ) : (
            <form className="form" onSubmit={submit} noValidate>
              {field("name", "Name", { placeholder: "Your name", autoComplete: "name" })}
              {field("email", "Email", { type: "email", placeholder: "you@example.com", autoComplete: "email" })}
              {field("phone", "Phone (optional)", { type: "tel", placeholder: "(510) 555-0123", autoComplete: "tel" })}
              <label id="intent-label">I'm looking to</label>
              <div className="chips" role="radiogroup" aria-labelledby="intent-label">
                {(
                  [
                    ["buy", "Buy"],
                    ["sell", "Sell"],
                    ["exploring", "Just exploring"],
                  ] as [Intent, string][]
                ).map(([v, l]) => (
                  <button type="button" key={v} role="radio" aria-checked={intent === v} className={`chip${intent === v ? " on" : ""}`} onClick={() => setIntent(v)} data-testid={`chip-${v}`}>
                    {l}
                  </button>
                ))}
              </div>
              {field("city", "City you're focused on (optional)", { placeholder: "Berkeley, Oakland, El Cerrito..." })}
              <label htmlFor="f-message">Message</label>
              <textarea
                id="f-message"
                className="in ta"
                placeholder="Tell me about your situation"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                data-testid="input-contact-message"
              />
              <button className="btn go" type="submit" style={{ marginTop: 24 }} disabled={send.isPending} data-testid="button-contact-submit">
                {send.isPending ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
          <div className="direct">
            <div className="it">
              <div className="lab">Call or text</div>
              <div className="val num">{PHONE}</div>
              <a className="btn go small" href={SMS}>
                <ChatIcon />
                Text me
              </a>
            </div>
            <div className="it">
              <div className="lab">Email</div>
              <div className="val" style={{ fontSize: 20 }}>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </div>
            <div className="it">
              <div className="lab">Prefer a set time?</div>
              <div className="val" style={{ fontSize: 20 }}>Book a 30-minute call</div>
              <a className="btn alt small" href={CALENDLY} target="_blank" rel="noopener noreferrer" data-testid="link-calendly">
                Open my calendar
              </a>
            </div>
            <div className="it">
              <div className="lab">Based in</div>
              <div className="val" style={{ fontSize: 20 }}>El Cerrito, CA</div>
            </div>
          </div>
        </div>
      </section>
    </TrailPage>
  );
}
