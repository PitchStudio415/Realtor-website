import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";

/** Email capture for the First-Time Buyer Guide; feeds the newsletter list. */
export function GuideEmailCard() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const mutation = useMutation({
    mutationFn: async () =>
      apiRequest("POST", "/api/newsletter", { email, source: "buyer-guide" }),
    onSuccess: () => {
      setDone(true);
      trackEvent("buyer_guide_signup", { source: "buyer-hub" });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or email Muzamil@risegroup.com.",
        variant: "destructive",
      });
    },
  });

  return (
    <div
      className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-7"
      data-testid="card-buyer-guide-gate"
    >
      {done ? (
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
          <p className="font-medium">
            You're on the list — the complete guide is headed to your inbox.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">
              Get the complete East Bay First-Time Buyer Guide
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Every module below in one place, plus first-time buyer tips I only send
            by email. One useful email a month, no spam, unsubscribe anytime.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (/\S+@\S+\.\S+/.test(email)) mutation.mutate();
            }}
          >
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="sm:max-w-xs bg-background"
              data-testid="input-buyer-guide-email"
            />
            <Button
              type="submit"
              disabled={mutation.isPending}
              data-testid="button-buyer-guide-submit"
            >
              {mutation.isPending ? "Sending..." : "Email me the guide"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
