import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, FileText, CreditCard, User, MessageSquare, HelpCircle, Bot } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const features = [
    {
      title: "Policy Management",
      description: "View, update, and manage all your insurance policies in one place.",
      icon: Shield,
      href: "/policies",
    },
    {
      title: "Claims Submission",
      description: "Submit and track insurance claims with ease.",
      icon: FileText,
      href: "/claims",
    },
    {
      title: "Premium Payment",
      description: "Pay your premiums securely and view payment history.",
      icon: CreditCard,
      href: "/payments",
    },
    {
      title: "Profile Management",
      description: "Update your personal information and preferences.",
      icon: User,
      href: "/profile",
    },
    {
      title: "Feedback System",
      description: "Share your thoughts and help us improve our services.",
      icon: MessageSquare,
      href: "/feedback",
    },
    {
      title: "FAQs & Support",
      description: "Find answers to common questions and get support.",
      icon: HelpCircle,
      href: "/faqs",
    },
  ]

  return (
    <div className="container mx-auto">
      <section className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Insurance Management System</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your insurance policies, claims, and payments all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={feature.href} className="w-full">
                  <Button variant="outline" className="w-full group">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center p-4 bg-muted rounded-lg">
            <Bot className="h-6 w-6 mr-2 text-primary" />
            <span>
              Need help? Try our{" "}
              <Link href="/chatbot" className="font-medium text-primary hover:underline">
                AI Chatbot
              </Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
