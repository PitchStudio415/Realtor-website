import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { CheckCircle2, Phone, Mail, ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";

const GOAL_OPTIONS = [
  { value: "buyer", label: "Buy a home" },
  { value: "seller", label: "Sell a home" },
  { value: "both", label: "Both" },
  { value: "exploring", label: "Just exploring" },
];

const AREA_OPTIONS = [
  "El Cerrito",
  "Albany",
  "Berkeley",
  "Kensington",
  "Richmond",
  "Oakland",
  "Not sure yet",
];

const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3months", label: "1-3 months" },
  { value: "3-6months", label: "3-6 months" },
  { value: "6-12months", label: "6-12 months" },
  { value: "researching", label: "Just researching" },
];

const BLOCKER_OPTIONS = [
  "Not sure I can afford it",
  "Don't know where to start",
  "Need to sell first",
  "Waiting on the market",
  "Just a matter of timing",
  "Something else",
];

/** A large, tappable selectable pill. */
function Pill({
  selected,
  onClick,
  children,
  testid,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  testid?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testid}
      className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-colors ${
        selected
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background border-border hover:border-primary/40 hover:bg-muted/40"
      }`}
    >
      {children}
    </button>
  );
}

function QuestionBlock({
  step,
  title,
  required,
  children,
}: {
  step: number;
  title: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-primary font-bold text-sm">{step}.</span>
        <h2 className="text-lg font-semibold">
          {title}
          {required && <span className="text-primary"> *</span>}
          {!required && <span className="text-muted-foreground text-sm font-normal"> (optional)</span>}
        </h2>
      </div>
      {children}
    </div>
  );
}

export default function Start() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const [goal, setGoal] = useState("");
  const [areas, setAreas] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [blocker, setBlocker] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const toggleArea = (area: string) => {
    setAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    );
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const messageParts: string[] = [];
      if (blocker) messageParts.push(`Biggest obstacle: ${blocker}`);
      if (note.trim()) messageParts.push(note.trim());
      return apiRequest("POST", "/api/contacts", {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        type: goal,
        timeline: timeline || undefined,
        city: areas.length ? areas.join(", ") : undefined,
        message: messageParts.length ? messageParts.join("\n\n") : undefined,
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      trackEvent("lead_form_submit", { lead_type: goal });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again, or text me directly at 415-819-8312.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!goal) {
      setError("Let me know what you're looking to do (question 1).");
      return;
    }
    if (name.trim().length < 2) {
      setError("Please add your name so I know who I'm talking to.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError("Please add a valid email so I can reach you.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please add a phone number so I can reach you quickly.");
      return;
    }
    mutation.mutate();
  };

  if (submitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Got it, {name.split(" ")[0] || "thank you"}!</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Thanks for sharing where you're headed. I'll personally review this and reach out within one business day with a clear next step, no pressure. If you'd rather talk sooner, text or call me anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a href="tel:+14158198312">
              <Button className="w-full sm:w-auto"><Phone className="w-4 h-4 mr-2" />415-819-8312</Button>
            </a>
            <a href="mailto:Muzamil@risegroup.com">
              <Button variant="outline" className="w-full sm:w-auto"><Mail className="w-4 h-4 mr-2" />Email me</Button>
            </a>
          </div>
          <p className="text-sm text-muted-foreground mb-3">While you're here:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="ghost" onClick={() => navigate("/first-time-home-buyer")}>
              First-Time Buyer Guide <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="ghost" onClick={() => navigate("/neighborhoods")}>
              East Bay Neighborhoods <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[#071B2C] text-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-3">East Bay Realtor · DRE# 02400805</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4" data-testid="text-start-headline">
            Let's Get You Moving
          </h1>
          <p className="text-white/75 text-lg leading-relaxed">
            Answer a few quick questions and I'll reach out with a clear next step, tailored to where you are in the process.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            <QuestionBlock step={1} title="What are you looking to do?" required>
              <div className="grid grid-cols-2 gap-3">
                {GOAL_OPTIONS.map((o) => (
                  <Pill key={o.value} selected={goal === o.value} onClick={() => setGoal(o.value)} testid={`goal-${o.value}`}>
                    {o.label}
                  </Pill>
                ))}
              </div>
            </QuestionBlock>

            <QuestionBlock step={2} title="Which areas are you interested in?">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AREA_OPTIONS.map((a) => (
                  <Pill key={a} selected={areas.includes(a)} onClick={() => toggleArea(a)} testid={`area-${a.toLowerCase().replace(/\s+/g, "-")}`}>
                    {a}
                  </Pill>
                ))}
              </div>
            </QuestionBlock>

            <QuestionBlock step={3} title="When are you hoping to make a move?">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIMELINE_OPTIONS.map((o) => (
                  <Pill key={o.value} selected={timeline === o.value} onClick={() => setTimeline(o.value)} testid={`timeline-${o.value}`}>
                    {o.label}
                  </Pill>
                ))}
              </div>
            </QuestionBlock>

            <QuestionBlock step={4} title="What's the biggest obstacle in your way right now?">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BLOCKER_OPTIONS.map((b) => (
                  <Pill key={b} selected={blocker === b} onClick={() => setBlocker(blocker === b ? "" : b)} testid={`blocker-${b.toLowerCase().replace(/\s+/g, "-").slice(0, 16)}`}>
                    {b}
                  </Pill>
                ))}
              </div>
            </QuestionBlock>

            <QuestionBlock step={5} title="Where can I reach you?" required>
              <div className="space-y-3">
                <Input placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} data-testid="input-name" />
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="input-email" />
                  <Input type="tel" placeholder="Phone *" value={phone} onChange={(e) => setPhone(e.target.value)} data-testid="input-phone" />
                </div>
              </div>
            </QuestionBlock>

            <QuestionBlock step={6} title="Anything else you want me to know?">
              <Input placeholder="One line is plenty, e.g. relocating for work in the fall" value={note} onChange={(e) => setNote(e.target.value)} data-testid="input-note" />
            </QuestionBlock>

            {error && <p className="text-sm text-destructive" data-testid="text-error">{error}</p>}

            <div>
              <Button type="submit" size="lg" className="w-full text-base" disabled={mutation.isPending} data-testid="button-submit">
                {mutation.isPending ? "Sending..." : "Send it to Muzamil"}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                All Rights Reserved. Muzamil Khan reads each entry and responds personally. Your info is never sold.
              </p>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
