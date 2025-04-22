import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, X } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      description: "Essential coverage for individuals",
      price: "INR 1099",
      period: "per month",
      features: [
        "Single policy management",
        "Basic claims processing",
        "Email support",
        "Mobile app access",
        "Annual policy review",
      ],
      notIncluded: [
        "Multi-policy discounts",
        "Priority claims handling",
        "24/7 phone support",
        "Personalized risk assessment",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
      popular: false,
    },
    {
      name: "Premium",
      description: "Comprehensive coverage for families",
      price: "INR 2499",
      period: "per month",
      features: [
        "Multiple policy management",
        "Priority claims processing",
        "24/7 email and chat support",
        "Mobile app access",
        "Quarterly policy review",
        "Multi-policy discounts",
        "Document storage",
        "Basic risk assessment",
      ],
      notIncluded: ["24/7 phone support", "Advanced risk assessment"],
      buttonText: "Subscribe Now",
      buttonVariant: "default",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Custom solutions for businesses",
      price: "INR 5099",
      period: "per month",
      features: [
        "Unlimited policy management",
        "Priority claims processing",
        "24/7 dedicated support",
        "Mobile app access",
        "Monthly policy review",
        "Multi-policy discounts",
        "Unlimited document storage",
        "Advanced risk assessment",
        "Custom reporting",
        "API access",
      ],
      notIncluded: [],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "Is there a free trial available?",
      answer: "We offer a 14-day free trial for all our plans, allowing you to explore the features before committing.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "You can cancel your subscription at any time. If you cancel, you'll continue to have access until the end of your current billing period.",
    },
  ]

  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose the plan that works best for you. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <Card key={index} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg relative" : ""}`}>
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground"> {plan.period}</span>
              </div>
              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-muted-foreground">
                    <X className="h-5 w-5 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/register" className="w-full">
                <Button variant={plan.buttonVariant === "default" ? "default" : "outline"} className="w-full">
                  {plan.buttonText}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-xl p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our pricing and plans.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-background rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center bg-primary/5 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          We offer tailored insurance management solutions for businesses with specific requirements. Contact our sales
          team to discuss your needs.
        </p>
        <Link href="/contact">
          <Button size="lg">Contact Sales</Button>
        </Link>
      </div>
    </div>
  )
}
