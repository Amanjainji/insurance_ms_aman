"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User, Paperclip, Mic } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hello! I'm your insurance assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Sample FAQ data for the chatbot to use
  const faqData = [
    {
      keywords: ["policy", "coverage", "covered"],
      response:
        'Your policy coverage details can be found in your policy documents. You can also view them by logging into your account and navigating to the "Policies" section.',
    },
    {
      keywords: ["claim", "file", "report"],
      response:
        "To file a claim, you can use our online portal, mobile app, or call our claims hotline at 1-800-123-4567. You'll need your policy number and details about the incident.",
    },
    {
      keywords: ["payment", "pay", "premium", "bill"],
      response:
        "You can make payments through your online account, our mobile app, by phone, or by mail. We accept credit/debit cards, bank transfers, and checks.",
    },
    {
      keywords: ["discount", "save", "cheaper", "reduce"],
      response:
        "We offer various discounts including multi-policy, safe driver, good student, and home security discounts. Contact your agent to see which discounts you qualify for.",
    },
    {
      keywords: ["cancel", "cancellation", "terminate"],
      response:
        "To cancel your policy, please contact your insurance agent or customer service. There may be cancellation fees depending on your policy terms.",
    },
  ]

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      // Generate bot response based on user input
      const botResponse = generateResponse(input)

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: botResponse,
          timestamp: new Date(),
        },
      ])

      setIsTyping(false)
    }, 1000)
  }

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase()

    // Check if input matches any FAQ keywords
    for (const faq of faqData) {
      if (faq.keywords.some((keyword) => input.includes(keyword))) {
        return faq.response
      }
    }

    // Default responses if no match found
    const defaultResponses = [
      "I'm not sure I understand. Could you please rephrase your question?",
      "That's a great question. To provide you with the most accurate information, I recommend speaking with one of our insurance agents. Would you like me to arrange a call?",
      "I don't have that specific information. You can find more details in your policy documents or by contacting customer service at 1-800-123-4567.",
      "I'm still learning about that topic. For immediate assistance, please use the 'Contact Support' option in your account dashboard.",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Insurance Chatbot</h1>
        <p className="text-muted-foreground">Get instant answers to your insurance questions</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src="/placeholder.png" />
              <AvatarFallback>
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Insurance Assistant</CardTitle>
              <CardDescription>AI-powered support</CardDescription>
            </div>
            <Badge variant="outline" className="ml-auto">
              Online
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8 mt-0.5 border">
                      {message.role === "bot" ? (
                        <AvatarFallback className="bg-primary/10">
                          <Bot className="h-4 w-4 text-primary" />
                        </AvatarFallback>
                      ) : (
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8 mt-0.5 border">
                      <AvatarFallback className="bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="rounded-lg p-3 bg-muted">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="pt-3">
          <form
            className="flex w-full gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
          >
            <Button type="button" size="icon" variant="outline">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              ref={inputRef}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button type="button" size="icon" variant="outline">
              <Mic className="h-4 w-4" />
            </Button>
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Questions</CardTitle>
          <CardDescription>Click on any of these to get quick answers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setInput("How do I file a claim?")
                setTimeout(handleSend, 100)
              }}
            >
              How do I file a claim?
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setInput("What discounts are available?")
                setTimeout(handleSend, 100)
              }}
            >
              What discounts are available?
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setInput("How can I pay my premium?")
                setTimeout(handleSend, 100)
              }}
            >
              How can I pay my premium?
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setInput("What's covered by my policy?")
                setTimeout(handleSend, 100)
              }}
            >
              What's covered by my policy?
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setInput("How do I cancel my policy?")
                setTimeout(handleSend, 100)
              }}
            >
              How do I cancel my policy?
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
