import { PTK, type PtkStep, type PtkDeadline } from "./pathToKeys";

export const TD = PTK.timelineDefaults as Record<string, number>;
export const ESCROW_DAYS = TD.escrowDays;
export const PTK_BASE = "/buy/path-to-keys";
export const stepPath = (slug: string) => `${PTK_BASE}/${slug}`;
export const docPath = (slug: string) => `${PTK_BASE}/documents/${slug}`;

export const DOCS = Object.fromEntries(PTK.documents.map((d) => [d.abbr, d]));
export const PHASE_NAME = Object.fromEntries(PTK.phases.map((p) => [p.number, p.title])) as Record<number, string>;

export function ptkPhaseCounts() {
  return PTK.phases.map((p) => ({ number: p.number, title: p.title, steps: PTK.steps.filter((s) => s.phase === p.number).length }));
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function addBusinessDays(d: Date, n: number) {
  const x = new Date(d);
  while (n > 0) {
    x.setDate(x.getDate() + 1);
    if (x.getDay() % 6 !== 0) n--;
  }
  return x;
}

export function deadlineDate(dl: PtkDeadline | null, acceptance: Date, escrowDays: number): Date | null {
  if (!dl) return null;
  const n = dl.configKey ? TD[dl.configKey] : dl.days ?? 0;
  if (dl.from === "acceptance") return dl.type === "business" ? addBusinessDays(acceptance, n) : addDays(acceptance, n);
  const close = addDays(acceptance, escrowDays);
  return dl.configKey ? addDays(close, -n) : addDays(close, n);
}

export const fmtLong = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
export const fmtShort = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

/** Sample acceptance date: the Monday after the build date, so prerendered HTML is stable. */
export function sampleAcceptance(ref: Date): Date {
  const d = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate(), 12);
  const add = (8 - d.getDay()) % 7 || 7;
  return addDays(d, add);
}

export const CLOCK_KEYS: [string, string][] = [
  ["escrow-and-deposit", "Deposit due"],
  ["disclosures", "Disclosures"],
  ["inspections", "Investigation ends"],
  ["appraisal", "Appraisal ends"],
  ["loan-approval", "Loan ends"],
  ["final-walkthrough", "Walkthrough"],
  ["keys", "Close & keys"],
];

export const stepBySlug = (slug: string): PtkStep | undefined => PTK.steps.find((s) => s.slug === slug);
export const docBySlug = (slug: string) => PTK.documents.find((d) => d.slug === slug);
