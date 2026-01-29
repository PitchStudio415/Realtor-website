import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: January 2025
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p className="text-muted-foreground mb-4">
            When you use our website, we may collect the following information:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Contact information (name, email, phone) when you submit forms</li>
            <li>Information about your real estate needs (timeline, city preferences)</li>
            <li>Messages you send through our contact form</li>
            <li>Email address when you subscribe to our newsletter</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
            <li>Respond to your inquiries and provide real estate services</li>
            <li>Send you market updates and educational content (if subscribed)</li>
            <li>Improve our website and services</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Information Sharing</h2>
          <p className="text-muted-foreground mb-6">
            We do not sell, trade, or otherwise transfer your personal information to third 
            parties. We may share information with trusted service providers who assist us 
            in operating our website and conducting our business, as long as they agree to 
            keep this information confidential.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Your Choices</h2>
          <p className="text-muted-foreground mb-6">
            You may unsubscribe from our newsletter at any time by clicking the unsubscribe 
            link in any email. You may also contact us to request deletion of your personal 
            information.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this privacy policy, please contact us at 
            hello@bayareahomelab.com.
          </p>
        </div>
      </div>
    </Layout>
  );
}
