import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalculatorIcon, Home, DollarSign, Percent, TrendingUp } from "lucide-react";

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function toNumber(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(n: number) {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function monthlyPI(loanAmount: number, annualRatePct: number, termYears: number) {
  const r = annualRatePct / 100 / 12;
  const n = termYears * 12;
  if (loanAmount <= 0) return 0;
  if (r === 0) return loanAmount / n;
  return (loanAmount * r) / (1 - Math.pow(1 + r, -n));
}

function monthlyTax(homePrice: number, taxRatePct: number) {
  return (homePrice * (taxRatePct / 100)) / 12;
}

function monthlyPMI(loanAmount: number, pmiRatePct: number, downPaymentPct: number) {
  if (downPaymentPct >= 20) return 0;
  return (loanAmount * (pmiRatePct / 100)) / 12;
}

function solveHomePriceFromMonthlyTarget(opts: {
  monthlyTarget: number;
  downPaymentPct: number;
  annualRatePct: number;
  termYears: number;
  taxRatePct: number;
  insuranceMonthly: number;
  hoaMonthly: number;
  pmiRatePct: number;
}) {
  const {
    monthlyTarget,
    downPaymentPct,
    annualRatePct,
    termYears,
    taxRatePct,
    insuranceMonthly,
    hoaMonthly,
    pmiRatePct,
  } = opts;

  const dp = clamp(downPaymentPct, 0, 100) / 100;
  if (monthlyTarget <= 0) return 0;

  let lo = 0;
  let hi = 10_000_000;

  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const loan = mid * (1 - dp);
    const pi = monthlyPI(loan, annualRatePct, termYears);
    const tax = monthlyTax(mid, taxRatePct);
    const pmi = monthlyPMI(loan, pmiRatePct, downPaymentPct);
    const total = pi + tax + insuranceMonthly + hoaMonthly + pmi;

    if (total > monthlyTarget) {
      hi = mid;
    } else {
      lo = mid;
    }
  }

  return lo;
}

export default function Calculator() {
  const [mode, setMode] = useState<"afford" | "payment">("afford");

  // Shared inputs
  const [ratePct, setRatePct] = useState("6.75");
  const [termYears, setTermYears] = useState<"30" | "15">("30");
  const [taxRatePct, setTaxRatePct] = useState("1.25");
  const [insuranceMonthly, setInsuranceMonthly] = useState("150");
  const [hoaMonthly, setHoaMonthly] = useState("0");
  const [downPaymentPct, setDownPaymentPct] = useState("20");
  const [pmiRatePct, setPmiRatePct] = useState("0.60");

  // Mode A inputs
  const [grossAnnualIncome, setGrossAnnualIncome] = useState("200000");
  const [monthlyDebts, setMonthlyDebts] = useState("800");
  const [dtiCapPct, setDtiCapPct] = useState("36");

  // Mode B input
  const [homePrice, setHomePrice] = useState("900000");

  const numbers = useMemo(() => {
    const rate = clamp(toNumber(ratePct), 0, 25);
    const taxRate = clamp(toNumber(taxRatePct), 0, 5);
    const ins = clamp(toNumber(insuranceMonthly), 0, 5000);
    const hoa = clamp(toNumber(hoaMonthly), 0, 5000);
    const dpPct = clamp(toNumber(downPaymentPct), 0, 100);
    const pmiRate = clamp(toNumber(pmiRatePct), 0, 5);
    const incomeAnnual = clamp(toNumber(grossAnnualIncome), 0, 10_000_000);
    const debts = clamp(toNumber(monthlyDebts), 0, 100_000);
    const dti = clamp(toNumber(dtiCapPct), 10, 60);
    const price = clamp(toNumber(homePrice), 0, 10_000_000);

    return {
      rate,
      termYears: parseInt(termYears),
      taxRate,
      ins,
      hoa,
      dpPct,
      pmiRate,
      incomeAnnual,
      debts,
      dti,
      price,
    };
  }, [ratePct, termYears, taxRatePct, insuranceMonthly, hoaMonthly, downPaymentPct, pmiRatePct, grossAnnualIncome, monthlyDebts, dtiCapPct, homePrice]);

  const results = useMemo(() => {
    const { rate, termYears: term, taxRate, ins, hoa, dpPct, pmiRate, incomeAnnual, debts, dti, price } = numbers;

    if (mode === "payment") {
      const dp = (dpPct / 100) * price;
      const loan = Math.max(price - dp, 0);
      const pi = monthlyPI(loan, rate, term);
      const tax = monthlyTax(price, taxRate);
      const pmi = monthlyPMI(loan, pmiRate, dpPct);
      const total = pi + tax + ins + hoa + pmi;
      const n = term * 12;
      const totalPIpaid = pi > 0 ? pi * n : 0;
      const totalInterest = totalPIpaid - loan;

      return {
        mode: "payment" as const,
        homePrice: price,
        downPayment: dp,
        loanAmount: loan,
        monthlyPI: pi,
        monthlyTax: tax,
        monthlyIns: ins,
        monthlyHOA: hoa,
        monthlyPMI: pmi,
        monthlyTotal: total,
        totalInterest: Math.max(totalInterest, 0),
      };
    }

    // Mode: afford
    const grossMonthly = incomeAnnual / 12;
    const maxTotalDebt = grossMonthly * (dti / 100);
    const maxHousing = Math.max(maxTotalDebt - debts, 0);

    const maxPrice = solveHomePriceFromMonthlyTarget({
      monthlyTarget: maxHousing,
      downPaymentPct: dpPct,
      annualRatePct: rate,
      termYears: term,
      taxRatePct: taxRate,
      insuranceMonthly: ins,
      hoaMonthly: hoa,
      pmiRatePct: pmiRate,
    });

    const dp = (dpPct / 100) * maxPrice;
    const loan = Math.max(maxPrice - dp, 0);
    const pi = monthlyPI(loan, rate, term);
    const tax = monthlyTax(maxPrice, taxRate);
    const pmi = monthlyPMI(loan, pmiRate, dpPct);
    const total = pi + tax + ins + hoa + pmi;

    return {
      mode: "afford" as const,
      maxHousing,
      maxHomePrice: maxPrice,
      downPayment: dp,
      loanAmount: loan,
      monthlyPI: pi,
      monthlyTax: tax,
      monthlyIns: ins,
      monthlyHOA: hoa,
      monthlyPMI: pmi,
      monthlyTotal: total,
    };
  }, [numbers, mode]);

  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <CalculatorIcon className="w-5 h-5" />
              <span className="font-medium">Tools</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-calculator-headline">
              Affordability Calculator
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Estimate what you can afford or calculate monthly payments for a specific home price.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={mode} onValueChange={(v) => setMode(v as "afford" | "payment")} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="afford" data-testid="tab-afford">What can I afford?</TabsTrigger>
              <TabsTrigger value="payment" data-testid="tab-payment">Monthly payment</TabsTrigger>
            </TabsList>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <TabsContent value="afford" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-primary" />
                        Income & Debts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="income">Gross annual household income</Label>
                        <Input
                          id="income"
                          type="text"
                          value={grossAnnualIncome}
                          onChange={(e) => setGrossAnnualIncome(e.target.value)}
                          placeholder="200000"
                          data-testid="input-income"
                        />
                      </div>
                      <div>
                        <Label htmlFor="debts">Monthly debt payments</Label>
                        <Input
                          id="debts"
                          type="text"
                          value={monthlyDebts}
                          onChange={(e) => setMonthlyDebts(e.target.value)}
                          placeholder="800"
                          data-testid="input-debts"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Car, student loans, credit cards, personal loans</p>
                      </div>
                      <div>
                        <Label htmlFor="dti">DTI cap (%)</Label>
                        <Select value={dtiCapPct} onValueChange={setDtiCapPct}>
                          <SelectTrigger data-testid="select-dti">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="36">36% (Conservative)</SelectItem>
                            <SelectItem value="43">43% (Maximum)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payment" className="mt-0 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Home className="w-5 h-5 text-primary" />
                        Home Price
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <Label htmlFor="homePrice">Home price ($)</Label>
                        <Input
                          id="homePrice"
                          type="text"
                          value={homePrice}
                          onChange={(e) => setHomePrice(e.target.value)}
                          placeholder="900000"
                          data-testid="input-home-price"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Percent className="w-5 h-5 text-accent" />
                      Loan Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="downPayment">Down payment (%)</Label>
                        <Input
                          id="downPayment"
                          type="text"
                          value={downPaymentPct}
                          onChange={(e) => setDownPaymentPct(e.target.value)}
                          placeholder="20"
                          data-testid="input-down-payment"
                        />
                      </div>
                      <div>
                        <Label htmlFor="rate">Interest rate (%)</Label>
                        <Input
                          id="rate"
                          type="text"
                          value={ratePct}
                          onChange={(e) => setRatePct(e.target.value)}
                          placeholder="6.75"
                          data-testid="input-rate"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="term">Loan term</Label>
                      <Select value={termYears} onValueChange={(v) => setTermYears(v as "30" | "15")}>
                        <SelectTrigger data-testid="select-term">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 years</SelectItem>
                          <SelectItem value="15">15 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="hoa">HOA ($ per month)</Label>
                      <Input
                        id="hoa"
                        type="text"
                        value={hoaMonthly}
                        onChange={(e) => setHoaMonthly(e.target.value)}
                        placeholder="0"
                        data-testid="input-hoa"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-chart-3" />
                      Taxes & Insurance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="taxRate">Property tax rate (% per year)</Label>
                      <Input
                        id="taxRate"
                        type="text"
                        value={taxRatePct}
                        onChange={(e) => setTaxRatePct(e.target.value)}
                        placeholder="1.25"
                        data-testid="input-tax-rate"
                      />
                      <p className="text-xs text-muted-foreground mt-1">CA average is ~1.25%</p>
                    </div>
                    <div>
                      <Label htmlFor="insurance">Homeowners insurance ($ per month)</Label>
                      <Input
                        id="insurance"
                        type="text"
                        value={insuranceMonthly}
                        onChange={(e) => setInsuranceMonthly(e.target.value)}
                        placeholder="150"
                        data-testid="input-insurance"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pmi">PMI rate (% per year)</Label>
                      <Input
                        id="pmi"
                        type="text"
                        value={pmiRatePct}
                        onChange={(e) => setPmiRatePct(e.target.value)}
                        placeholder="0.60"
                        data-testid="input-pmi"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Applied if down payment is less than 20%</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="sticky top-20 bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {mode === "afford" ? "Your Estimated Budget" : "Monthly Payment Breakdown"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {mode === "afford" && results.mode === "afford" && (
                      <>
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground mb-1">Estimated max home price</p>
                          <p className="text-4xl font-bold text-primary" data-testid="text-max-price">
                            {formatMoney(results.maxHomePrice)}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="p-3 rounded-md bg-background">
                            <p className="text-muted-foreground">Down payment</p>
                            <p className="font-semibold">{formatMoney(results.downPayment)}</p>
                          </div>
                          <div className="p-3 rounded-md bg-background">
                            <p className="text-muted-foreground">Loan amount</p>
                            <p className="font-semibold">{formatMoney(results.loanAmount)}</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t">
                          <p className="text-sm text-muted-foreground mb-1">Target monthly housing payment</p>
                          <p className="text-2xl font-bold" data-testid="text-monthly-total">
                            {formatMoney(results.monthlyTotal)}/mo
                          </p>
                        </div>
                      </>
                    )}

                    {mode === "payment" && results.mode === "payment" && (
                      <>
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground mb-1">Total monthly payment</p>
                          <p className="text-4xl font-bold text-primary" data-testid="text-monthly-payment">
                            {formatMoney(results.monthlyTotal)}/mo
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="p-3 rounded-md bg-background">
                            <p className="text-muted-foreground">Down payment</p>
                            <p className="font-semibold">{formatMoney(results.downPayment)}</p>
                          </div>
                          <div className="p-3 rounded-md bg-background">
                            <p className="text-muted-foreground">Loan amount</p>
                            <p className="font-semibold">{formatMoney(results.loanAmount)}</p>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-2 pt-4 border-t">
                      <p className="text-sm font-medium mb-3">Monthly breakdown</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Principal & interest</span>
                        <span>{formatMoney(results.monthlyPI)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Property taxes</span>
                        <span>{formatMoney(results.monthlyTax)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Insurance</span>
                        <span>{formatMoney(results.monthlyIns)}</span>
                      </div>
                      {results.monthlyHOA > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">HOA</span>
                          <span>{formatMoney(results.monthlyHOA)}</span>
                        </div>
                      )}
                      {results.monthlyPMI > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">PMI</span>
                          <span>{formatMoney(results.monthlyPMI)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                        <span>Total</span>
                        <span>{formatMoney(results.monthlyTotal)}</span>
                      </div>
                    </div>

                    {mode === "payment" && results.mode === "payment" && results.totalInterest > 0 && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground">Total interest over loan life</p>
                        <p className="font-semibold">{formatMoney(results.totalInterest)}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mt-6 bg-muted/30 border-0">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">
                      This calculator provides estimates for educational purposes only. 
                      Actual loan terms, rates, and costs will vary. Consult with a lender 
                      for accurate pre-approval and payment information.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
