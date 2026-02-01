import { Layout } from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: January 2025
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Acceptance of Terms</h2>
          <p className="text-muted-foreground mb-6">
            By accessing and using this website, you accept and agree to be bound by these 
            Terms of Service. If you do not agree to these terms, please do not use this website.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Educational Content</h2>
          <p className="text-muted-foreground mb-6">
            The content on this website is provided for general informational and educational 
            purposes only. It is not intended as, and should not be construed as, legal, 
            financial, or tax advice. Always consult with qualified professionals for specific 
            guidance regarding your situation.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Real Estate Services</h2>
          <p className="text-muted-foreground mb-6">
            Real estate services are subject to separate agreements. The information on this 
            website does not constitute an offer to provide real estate services in any 
            jurisdiction where such offer would be prohibited.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Accuracy of Information</h2>
          <p className="text-muted-foreground mb-6">
            While we strive to provide accurate and up-to-date information, we make no 
            representations or warranties about the completeness, accuracy, or reliability 
            of any information on this website. Market conditions, laws, and regulations 
            change frequently, and information may become outdated.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-muted-foreground mb-6">
            We shall not be liable for any direct, indirect, incidental, consequential, or 
            punitive damages arising from your use of this website or reliance on any 
            information provided herein.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Changes to Terms</h2>
          <p className="text-muted-foreground mb-6">
            We reserve the right to modify these terms at any time. Your continued use of 
            the website following any changes constitutes acceptance of those changes.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Contact</h2>
          <p className="text-muted-foreground">
            For questions about these terms, please contact us at hello@muzamilkhanrealtor.com.
          </p>
        </div>
      </div>
    </Layout>
  );
}
