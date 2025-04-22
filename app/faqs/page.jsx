"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Search, MessageSquare, Bot } from "lucide-react"
import Link from "next/link"

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // FAQ categories and questions
  const faqCategories = [
    {
      id: "general",
      name: "General",
      faqs: [
        {
          question: "What types of insurance do you offer?",
          answer:
            "We offer a wide range of insurance products including auto, home, life, health, and umbrella insurance. Each policy can be customized to meet your specific needs and budget.",
        },
        {
          question: "How do I get a quote for insurance?",
          answer:
            "You can get a quote by filling out our online form, calling our customer service line, or visiting one of our local offices. The process is quick and easy, and you'll receive a personalized quote based on your information.",
        },
        {
          question: "How do I know which insurance policy is right for me?",
          answer:
            "Our insurance agents can help you determine which policy best fits your needs based on factors like your budget, assets, lifestyle, and risk tolerance. We recommend scheduling a consultation to discuss your specific situation.",
        },
        {
          question: "Can I bundle multiple insurance policies?",
          answer:
            "Yes, we offer multi-policy discounts when you bundle different types of insurance. Common bundles include home and auto insurance, which can save you up to 15% on your premiums.",
        },
      ],
    },
    {
      id: "policies",
      name: "Policies",
      faqs: [
        {
          question: "How do I view my policy details?",
          answer:
            'You can view your policy details by logging into your account and navigating to the "Policies" section. There, you\'ll find all your active policies with detailed information about coverage, premiums, and renewal dates.',
        },
        {
          question: "How can I make changes to my policy?",
          answer:
            "You can make changes to your policy by contacting your insurance agent or through your online account. Depending on the change, there may be adjustments to your premium or coverage.",
        },
        {
          question: "What happens when my policy expires?",
          answer:
            "Most policies automatically renew at the end of the policy term. You'll receive a renewal notice before the expiration date with any changes to your premium or coverage. If you don't want to renew, you'll need to notify us before the renewal date.",
        },
        {
          question: "Can I cancel my policy at any time?",
          answer:
            "Yes, you can cancel your policy at any time, but there may be cancellation fees depending on your policy terms. We recommend reviewing your policy documents or speaking with an agent before cancelling.",
        },
      ],
    },
    {
      id: "claims",
      name: "Claims",
      faqs: [
        {
          question: "How do I file a claim?",
          answer:
            "You can file a claim through your online account, by calling our claims hotline, or by contacting your insurance agent. Be prepared to provide details about the incident, including date, time, location, and any supporting documentation.",
        },
        {
          question: "How long does it take to process a claim?",
          answer:
            "Claim processing times vary depending on the complexity of the claim. Simple claims may be resolved within a few days, while more complex claims could take several weeks. You can check the status of your claim through your online account.",
        },
        {
          question: "What information do I need to provide when filing a claim?",
          answer:
            "When filing a claim, you'll need to provide your policy number, details about the incident (date, time, location), a description of damages or injuries, and any supporting documentation like photos, police reports, or medical records.",
        },
        {
          question: "Will filing a claim increase my premium?",
          answer:
            "Filing a claim may affect your premium at renewal, depending on the type of claim, your claims history, and your policy terms. Not all claims result in premium increases, especially if you have accident forgiveness or other protective features in your policy.",
        },
      ],
    },
    {
      id: "payments",
      name: "Payments",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept various payment methods including credit/debit cards, bank transfers, checks, and automatic payments from your bank account. You can set up your preferred payment method through your online account.",
        },
        {
          question: "How do I set up automatic payments?",
          answer:
            'You can set up automatic payments through your online account by navigating to the "Payments" section and selecting "Set Up Automatic Payments." You\'ll need to provide your bank account or credit card information.',
        },
        {
          question: "What happens if I miss a payment?",
          answer:
            "If you miss a payment, there's typically a grace period before any action is taken. After the grace period, your policy may be at risk of cancellation. We recommend contacting customer service immediately if you anticipate missing a payment.",
        },
        {
          question: "Can I change my payment schedule?",
          answer:
            "Yes, you can change your payment schedule (monthly, quarterly, semi-annually, or annually) by contacting customer service or through your online account. Different payment schedules may have different total costs, so be sure to review all options.",
        },
      ],
    },
  ]

  // Filter FAQs based on search term
  const filteredFAQs = searchTerm
    ? faqCategories
        .map((category) => ({
          ...category,
          faqs: category.faqs.filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        }))
        .filter((category) => category.faqs.length > 0)
    : faqCategories

  return (
    <div className="container mx-auto py-16 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about our insurance services
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto mb-12">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for answers..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredFAQs.length > 0 ? (
        <Tabs defaultValue={filteredFAQs[0].id} className="space-y-8 max-w-4xl mx-auto">
          <TabsList className="flex flex-wrap justify-center">
            {filteredFAQs.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {filteredFAQs.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{category.name} FAQs</CardTitle>
                  <CardDescription>
                    Frequently asked questions about {category.name.toLowerCase()} topics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card className="text-center py-8 max-w-4xl mx-auto">
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <HelpCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No results found</h3>
              <p className="text-muted-foreground mt-2 mb-6">We couldn't find any FAQs matching your search</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/chatbot">
                  <Button>
                    <Bot className="mr-2 h-4 w-4" />
                    Ask Our Chatbot
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-16">
        <Card className="bg-muted/50 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Still have questions?
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
            <p className="text-muted-foreground flex-1">
              If you can't find the answer you're looking for, our AI chatbot can help you with immediate responses to
              your questions.
            </p>
            <Link href="/chatbot">
              <Button>
                Try Our Chatbot
                <Bot className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
