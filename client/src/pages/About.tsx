import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { Phone, Mail, ArrowRight, Star, Home, TrendingUp, Users, BadgeCheck } from "lucide-react";
import profilePhoto from "@assets/ProfilePhoto_1773373912154.jpeg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const stats = [
  { icon: TrendingUp, label: "Years in Sales", value: "14+" },
  { icon: Home, label: "East Bay Focus", value: "100%" },
  { icon: Users, label: "Client First", value: "Always" },
  { icon: BadgeCheck, label: "DRE Licensed", value: "CA" },
];

export default function About() {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) =>
      apiRequest("POST", "/api/contacts", {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone || "",
        message: data.message,
        type: "general",
      }),
    onSuccess: () => {
      toast({ title: "Message sent!", description: "I'll be in touch shortly." });
      form.reset();
    },
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    },
  });

  return (
    <Layout>
      {/* Hero: photo + info split */}
      <section className="min-h-[85vh] grid lg:grid-cols-2">
        {/* Photo */}
        <div className="relative order-2 lg:order-1 min-h-[50vh] lg:min-h-full">
          <img
            src={profilePhoto}
            alt="Muzamil Khan — Realtor"
            className="w-full h-full object-cover object-top absolute inset-0"
            data-testid="img-profile-photo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
        </div>

        {/* Info panel */}
        <div className="order-1 lg:order-2 bg-[#0F172A] text-white flex flex-col justify-center px-8 md:px-14 py-14 lg:py-20">
          <p className="text-xs tracking-widest uppercase text-white/50 mb-3 font-medium">Muzamil Khan - Realtor®</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2" data-testid="text-about-headline">
            Muzamil Khan
          </h1>
          <p className="text-lg text-white/60 font-medium mb-1">Realtor®</p>
          <p className="text-sm text-white/40 mb-6">DRE# 02400805</p>

          <div className="w-16 h-px bg-white/30 mb-8" />

          <div className="space-y-3 mb-8">
            <a
              href="tel:+15105550123"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
              data-testid="link-phone"
            >
              <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-base">(510) 555-0123</span>
            </a>
            <a
              href="mailto:hello@muzamilkhanrealtor.com"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
              data-testid="link-email"
            >
              <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-base">hello@muzamilkhanrealtor.com</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="tel:+15105550123">
              <Button
                size="lg"
                className="bg-white text-[#0F172A] hover:bg-white/90 font-semibold px-6"
                data-testid="button-call"
              >
                <Phone className="w-4 h-4 mr-2" />
                CALL ME
              </Button>
            </a>
            <a href="mailto:hello@muzamilkhanrealtor.com">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-semibold px-6"
                data-testid="button-email"
              >
                <Mail className="w-4 h-4 mr-2" />
                EMAIL ME
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-primary/5 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center py-8 px-4 border-r border-border last:border-r-0 even:border-r-0 lg:even:border-r"
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Icon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission / Bio */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-xs tracking-widest uppercase text-primary font-medium mb-3">About Me</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Data-driven guidance you can trust in the East Bay.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                Real estate is one of the most significant financial decisions people make, and I believe it should be approached with clear information and proper guidance at every step. With over 14 years of experience in sales across multiple industries, I have learned that the best outcomes and effective problem solving come from truly understanding my clients' needs and communicating honestly.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                I bring that same approach to real estate by providing clear data, explaining all available options, and advocating strongly for my clients' interests. I live in El Cerrito and know the East Bay deeply — from the hills of Berkeley and the neighborhoods of Oakland to Walnut Creek and Fremont — using that local knowledge to help buyers find the right fit and sellers understand who is buying in their area.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  icon: Star,
                  title: "Honest, clear communication",
                  body: "I tell you what you need to know — not just what you want to hear. Clear information leads to better decisions.",
                },
                {
                  icon: TrendingUp,
                  title: "Data-first approach",
                  body: "Every recommendation is backed by market data so you can make confident, informed choices.",
                },
                {
                  icon: Users,
                  title: "Strong advocacy",
                  body: "I negotiate hard for my clients' interests and stay focused on your goals throughout the entire process.",
                },
                {
                  icon: Home,
                  title: "Deep local knowledge",
                  body: "Based in El Cerrito, I know Alameda and Contra Costa counties inside and out.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-4" data-testid={`value-${i}`}>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 md:py-20 bg-muted/40 border-t border-border" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-xs tracking-widest uppercase text-primary font-medium mb-3">Get in Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Contact Muzamil Khan
              </h2>
              <div className="w-12 h-px bg-border mb-6" />
              <p className="text-muted-foreground text-base md:text-lg mb-8">
                Whether you're buying, selling, or just exploring your options, I'm happy to answer questions and discuss your goals — no pressure, no obligation.
              </p>
              <div className="space-y-3">
                <a href="tel:+15105550123" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>(510) 555-0123</span>
                </a>
                <a href="mailto:hello@muzamilkhanrealtor.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>hello@muzamilkhanrealtor.com</span>
                </a>
              </div>
            </div>

            <Card className="shadow-sm border-border">
              <CardContent className="p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                    className="space-y-5"
                    data-testid="form-contact"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane" {...field} data-testid="input-first-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Smith" {...field} data-testid="input-last-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jane@example.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(510) 555-0000" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me how I can help..."
                              rows={4}
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-semibold"
                      disabled={mutation.isPending}
                      data-testid="button-submit"
                    >
                      {mutation.isPending ? "Sending..." : "Submit"}
                      {!mutation.isPending && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
