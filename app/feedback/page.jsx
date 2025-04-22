"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MessageSquare, Star, ThumbsUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function FeedbackPage() {
  const { toast } = useToast()
  const [rating, setRating] = useState("5")
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would make an API call here
    setTimeout(() => {
      setIsSubmitting(false)
      setFeedback("")
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! We appreciate your input.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
        <p className="text-muted-foreground">We value your feedback to improve our services</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Share Your Experience</CardTitle>
            <CardDescription>Let us know how we're doing and how we can improve</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>How would you rate your experience?</Label>
                <RadioGroup defaultValue="5" value={rating} onValueChange={setRating} className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex flex-col items-center">
                      <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="sr-only" />
                      <Label
                        htmlFor={`rating-${value}`}
                        className={`
                          p-2 cursor-pointer rounded-full hover:bg-muted
                          ${Number.parseInt(rating) >= value ? "text-yellow-500" : "text-muted-foreground"}
                        `}
                      >
                        <Star className="h-8 w-8 fill-current" />
                      </Label>
                      <span className="text-xs">{value}</span>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us about your experience..."
                  rows={5}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
                <p className="text-xs text-muted-foreground">
                  If you'd like us to follow up with you, please provide your email.
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={isSubmitting || !feedback.trim()}>
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-primary" />
                <CardTitle>Why Your Feedback Matters</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Your feedback helps us understand what we're doing well and where we need to improve. We use this
                information to enhance our services and provide you with the best insurance experience possible.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Helps us improve our customer service</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Identifies areas where we can enhance our products</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full mt-0.5">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm">Allows us to address any issues you've experienced</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <CardTitle>Contact Customer Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Need immediate assistance? Our customer support team is here to help.</p>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="w-full">
                    Live Chat
                  </Button>
                  <Button variant="outline" className="w-full">
                    Call Us
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">Available Monday-Friday, 9am-5pm EST</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
