import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Shield, FileText, CreditCard, User, MessageSquare, HelpCircle, Bot } from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const features = [
    {
      title: "Comprehensive Policy Management",
      description: "Easily manage all your insurance policies in one place with intuitive tools and real-time updates.",
      icon: Shield,
    },
    {
      title: "Streamlined Claims Processing",
      description: "Submit and track claims with our simplified process, reducing paperwork and speeding up approvals.",
      icon: FileText,
    },
    {
      title: "Flexible Payment Options",
      description: "Choose from multiple payment methods and schedules that fit your financial preferences.",
      icon: CreditCard,
    },
    {
      title: "Personalized Customer Profiles",
      description: "Get insurance recommendations tailored to your specific needs based on your profile information.",
      icon: User,
    },
    {
      title: "24/7 Customer Support",
      description:
        "Access help whenever you need it through our multiple support channels, including live chat and phone.",
      icon: MessageSquare,
    },
    {
      title: "Educational Resources",
      description: "Learn about insurance options with our comprehensive knowledge base and expert guidance.",
      icon: HelpCircle,
    },
  ]

  const benefits = [
    "Time-saving digital processes",
    "Reduced paperwork and administrative burden",
    "Transparent policy information",
    "Faster claims processing",
    "Secure data management",
    "Personalized insurance recommendations",
  ]

  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Features That Make Insurance Simple</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our platform is designed to make managing your insurance policies effortless, with powerful tools that save
          you time and give you peace of mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-xl p-8 mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Why Choose InsureHub?</h2>
            <p className="text-muted-foreground mb-6">
              Our platform offers a comprehensive solution for all your insurance needs, with features designed to make
              your experience seamless and stress-free.
            </p>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-background rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">AI-Powered Assistance</h3>
            <p className="text-muted-foreground mb-4">
              Our intelligent chatbot helps you find answers quickly, guides you through processes, and provides
              personalized recommendations.
            </p>
            <div className="flex items-center justify-center bg-primary/10 rounded-lg p-8 mb-4">
              <Bot className="h-16 w-16 text-primary" />
            </div>
            <Link href="/chatbot">
              <Button className="w-full">Try Our AI Assistant</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who have simplified their insurance management with InsureHub.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">Sign Up Now</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
