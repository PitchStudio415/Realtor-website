import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Layout } from "@/components/layout/Layout";
import { Phone, Mail, ArrowRight, Star, Home, TrendingUp, BadgeCheck } from "lucide-react";
import { SiInstagram, SiZillow } from "react-icons/si";
import profilePhoto from "@assets/DSC04311_1775541143310.jpeg";
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
  { icon: TrendingUp, label: "Construction & Real Estate", value: "15 Years" },
  { icon: Home, label: "East Bay Focus", value: "100%" },
  { icon: Star, label: "Client Rating", value: "5-Star" },
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
      <section className="grid lg:grid-cols-2">
        {/* Photo */}
        <div className="order-2 lg:order-1 bg-[#071B2C] flex flex-col items-center justify-center py-10 px-8">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-white/20 shadow-2xl flex-shrink-0">
            <img
              src={profilePhoto}
              alt="Muzamil Khan, Realtor"
              className="w-full h-full object-cover object-top scale-[1.5]"
              data-testid="img-profile-photo"
            />
          </div>
          <div className="flex items-center gap-1 mt-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="mt-2 text-xs font-bold bg-[#006AFF] text-white px-3 py-1 rounded-full tracking-wide">
            Zillow Premier Agent
          </span>
          <div className="flex items-center gap-5 mt-5">
            <a
              href="https://www.instagram.com/muzamilkhan.realtor?igsh=MzRlODBiNWFlZA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-testid="link-about-instagram"
            >
              <SiInstagram className="w-7 h-7 text-[#E1306C] hover:opacity-80 transition-opacity" />
            </a>
            <a
              href="https://www.zillow.com/profile/muzamil7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zillow"
              data-testid="link-about-zillow"
            >
              <SiZillow className="w-7 h-7 text-[#006AFF] hover:opacity-80 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Info panel */}
        <div className="order-1 lg:order-2 bg-[#071B2C] text-white flex flex-col justify-center px-8 md:px-14 py-10">
          <p className="text-xs tracking-widest uppercase text-white/50 mb-3 font-medium">El Cerrito · Albany · Berkeley · Oakland · Richmond & the East Bay</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2" data-testid="text-about-headline">
            Muzamil Khan
          </h1>
          <p className="text-lg text-white/60 font-medium mb-1">Realtor®</p>
          <p className="text-sm text-white/40 mb-6">DRE# 02400805</p>

          <div className="w-16 h-px bg-white/30 mb-8" />

          <div className="space-y-3 mb-8">
            <a
              href="tel:+15106866338"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
              data-testid="link-phone"
            >
              <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-base">(510) 686-6338</span>
            </a>
            <a
              href="mailto:Muzamil@risegroup.com"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
              data-testid="link-email"
            >
              <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-base">Muzamil@risegroup.com</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="tel:+15106866338">
              <Button
                size="lg"
                className="bg-white text-[#071B2C] hover:bg-white/90 font-semibold px-6"
                data-testid="button-call"
              >
                <Phone className="w-4 h-4 mr-2" />
                CALL ME
              </Button>
            </a>
            <a href="mailto:Muzamil@risegroup.com">
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
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-primary font-medium mb-3">About Me</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 leading-tight max-w-2xl">
            I moved here in 2014 and never left.
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                There's a spot on San Pablo I go to most Sunday mornings. I know which parks families with kids gravitate toward. I know the Nextdoor drama better than I probably should. I moved to El Cerrito for a construction job and just stayed. This part of the East Bay has something the rest doesn't: real neighborhoods where people actually know each other.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                Before getting my license, I spent 15 years working alongside builders, developers, and contractors on everything from single-family flips to larger commercial projects. That work taught me how to look at a house: whether the bones are sound, whether the price reflects what it's actually worth, and whether the inspection report is raising a real red flag or just covering the inspector's bases.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                I work with first-time buyers, people relocating to the East Bay, and sellers who want someone who gives it to them straight. I serve El Cerrito, Albany, Berkeley, Kensington, Oakland, Emeryville, Richmond, Hercules, Pinole, San Pablo, and El Sobrante.
              </p>
            </div>

            <div className="space-y-8">
              <div className="border-l-2 border-primary pl-6" data-testid="value-0">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">The inspection story</p>
                <p className="text-foreground leading-relaxed">
                  Last year a buyer in Kensington was under contract on a house they loved. The inspection flagged foundation cracks. The sellers called them cosmetic. I told my client: get a structural engineer in before we do anything. The engineer confirmed the cracks were active. We went back to the seller and got <strong>$22,000 off the price</strong>, with a repair plan already in place before closing. That's what 15 years reading construction problems gets you.
                </p>
              </div>

              <div className="border-l-2 border-primary pl-6" data-testid="value-1">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">The Albany offer</p>
                <p className="text-foreground leading-relaxed">
                  A couple relocating from LA was nervous about competing in the Albany market. They'd lost three houses already. I walked them through what the comparable sales actually told us, wrote an offer with a specific escalation structure, and explained exactly why. They beat four other buyers without going over their budget. They've been in the house two years now.
                </p>
              </div>

              <div className="border-l-2 border-primary pl-6" data-testid="value-2">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">What I tell sellers</p>
                <p className="text-foreground leading-relaxed">
                  A seller in Richmond came to me convinced her house was worth more than the comps supported. Instead of agreeing to win the listing, I showed her exactly what had sold and why, what improvements would actually move the needle, and what was just wishful thinking. We priced it right, got multiple offers in the first week, and she walked away with more than she'd expected.
                </p>
              </div>
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
                Whether you're buying, selling, or just exploring your options, I'm happy to answer questions and talk through your goals at whatever pace works for you.
              </p>
              <div className="space-y-3">
                <a href="tel:+15106866338" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>(510) 686-6338</span>
                </a>
                <a href="mailto:Muzamil@risegroup.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Muzamil@risegroup.com</span>
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
