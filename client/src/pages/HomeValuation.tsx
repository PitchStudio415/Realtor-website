import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowLeft, CheckCircle2, Home } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";

const CITIES = [
  "El Cerrito",
  "Kensington",
  "Albany",
  "Berkeley",
  "Oakland",
  "Richmond",
  "Pinole",
  "Hercules",
  "San Pablo",
  "El Sobrante",
  "Rodeo",
  "Other East Bay",
];

const TIMELINES = [
  { value: "just-curious", label: "Just curious what it's worth" },
  { value: "6-12-months", label: "Thinking about selling in 6–12 months" },
  { value: "0-6-months", label: "Planning to sell in the next 6 months" },
];

export default function HomeValuation() {
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timeline, setTimeline] = useState("just-curious");

  const valuationMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/contacts", {
        name,
        email,
        phone,
        type: "seller",
        timeline,
        city,
        message: `Home valuation request: ${street}, ${city} ${zip}`.trim(),
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      trackEvent("home_valuation_submit", { timeline, city });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again, or call me at (415) 819-8312.",
        variant: "destructive",
      });
    },
  });

  const stepOneValid = street.trim().length > 3 && city;
  const stepTwoValid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);

  return (
    <Layout>
      <section className="bg-[#071B2C] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-valuation-headline">
            What's your home actually worth?
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            A real number based on 15 years of construction experience and live East Bay
            data. Not a Zestimate.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <Card data-testid="card-valuation-thanks">
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-3">Got it — I'm on it.</h2>
                <p className="text-muted-foreground">
                  I'll personally review {street} and send you a real valuation within
                  24 hours. If I have a question about the property, I'll reach out
                  first.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                  <span className={step === 1 ? "font-semibold text-foreground" : ""}>1. Your property</span>
                  <span>→</span>
                  <span className={step === 2 ? "font-semibold text-foreground" : ""}>2. Where to send it</span>
                </div>

                {step === 1 ? (
                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="street">Street address</Label>
                      <Input
                        id="street"
                        placeholder="123 Main St"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        data-testid="input-valuation-street"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>City</Label>
                        <Select value={city} onValueChange={setCity}>
                          <SelectTrigger data-testid="select-valuation-city">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {CITIES.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP (optional)</Label>
                        <Input
                          id="zip"
                          placeholder="94530"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          data-testid="input-valuation-zip"
                        />
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={!stepOneValid}
                      onClick={() => setStep(2)}
                      data-testid="button-valuation-next"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="val-name">Name</Label>
                        <Input
                          id="val-name"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          data-testid="input-valuation-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="val-email">Email</Label>
                        <Input
                          id="val-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          data-testid="input-valuation-email"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="val-phone">Phone (optional)</Label>
                      <Input
                        id="val-phone"
                        placeholder="(510) 555-0123"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        data-testid="input-valuation-phone"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">When are you thinking of selling?</Label>
                      <RadioGroup value={timeline} onValueChange={setTimeline} className="space-y-2">
                        {TIMELINES.map((t) => (
                          <div key={t.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={t.value} id={t.value} />
                            <Label htmlFor={t.value} className="font-normal cursor-pointer">
                              {t.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        data-testid="button-valuation-back"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        className="flex-1"
                        size="lg"
                        disabled={!stepTwoValid || valuationMutation.isPending}
                        onClick={() => valuationMutation.mutate()}
                        data-testid="button-valuation-submit"
                      >
                        {valuationMutation.isPending ? "Sending..." : "Get my valuation"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      No spam, no obligation. I respond personally within 24 hours.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="mt-10 grid sm:grid-cols-3 gap-4 text-center text-sm text-muted-foreground">
            <div className="flex flex-col items-center gap-1">
              <Home className="w-5 h-5 text-primary" />
              <span>Walked-the-property accuracy, not an algorithm</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Repair costs factored in from 15 years in construction</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ArrowRight className="w-5 h-5 text-primary" />
              <span>Yours free, whether or not you ever list</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
