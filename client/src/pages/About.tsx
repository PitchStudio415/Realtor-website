import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, MapPin, Award, MessageSquare, BarChart3, Languages } from "lucide-react";
import profilePhoto from "@assets/ProfilePhoto_1769661549653.jpeg";

export default function About() {
  return (
    <Layout>
      <section className="bg-gradient-to-b from-muted/50 to-background pt-8 md:pt-10 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-about-headline">
                About Me
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-4">
                I'm a data-driven real estate agent helping first-time buyers and sellers navigate the 
                East Bay market with confidence.
              </p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Based in El Cerrito, serving Alameda and Contra Costa counties</span>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={profilePhoto} 
                  alt="Profile photo" 
                  className="w-full h-full object-cover object-top"
                  data-testid="img-profile-photo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">My Approach</h2>
            <div className="space-y-4">
              <p className="text-base md:text-lg text-muted-foreground">
                Real estate is one of the most significant financial decisions people make, and I believe it should be approached with clear information and proper guidance at every step. With over 14 years of experience in sales across multiple industries, I have learned that the best outcomes and effective problem solving come from truly understanding my clients' needs and communicating honestly.
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                I bring that same approach to real estate by providing clear data, explaining all available options, and advocating strongly for my clients' interests. I live in El Cerrito and know the East Bay deeply, from the hills of Berkeley and the neighborhoods of Oakland to Walnut Creek and Fremont, using that local knowledge to help buyers find the right fit and sellers understand who is buying in their area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Let's Talk</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Whether you're buying, selling, or just exploring your options, I'm happy to 
            answer questions and discuss your goals.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" data-testid="button-about-cta">
              Book a consult
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
