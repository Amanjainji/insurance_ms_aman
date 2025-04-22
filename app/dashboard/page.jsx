"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, CreditCard, ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()
  const [policies, setPolicies] = useState([])
  const [claims, setClaims] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // This is just mock data
    const mockPolicies = [
      { id: "POL-1234", type: "Auto Insurance", status: "Active", premium: "$120/month", nextPayment: "2023-05-15" },
      { id: "POL-5678", type: "Home Insurance", status: "Active", premium: "$85/month", nextPayment: "2023-05-20" },
      { id: "POL-9012", type: "Life Insurance", status: "Pending", premium: "$45/month", nextPayment: "N/A" },
    ]

    const mockClaims = [
      { id: "CLM-1234", type: "Auto Insurance", status: "In Progress", amount: "$2,500", date: "2023-04-10" },
      { id: "CLM-5678", type: "Home Insurance", status: "Approved", amount: "$5,000", date: "2023-03-15" },
    ]

    const mockPayments = [
      { id: "PAY-1234", policyId: "POL-1234", amount: "$120", status: "Paid", date: "2023-04-15" },
      { id: "PAY-5678", policyId: "POL-5678", amount: "$85", status: "Paid", date: "2023-04-20" },
      { id: "PAY-9012", policyId: "POL-1234", amount: "$120", status: "Due", date: "2023-05-15" },
    ]

    setPolicies(mockPolicies)
    setClaims(mockClaims)
    setPayments(mockPayments)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}! Here's an overview of your insurance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/policies/new">
            <Button>
              <Shield className="mr-2 h-4 w-4" />
              New Policy
            </Button>
          </Link>
          <Link href="/claims/new">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              File Claim
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Claims</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">-2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Premium</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$205</div>
            <p className="text-xs text-muted-foreground">+$45 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">May 15</div>
            <p className="text-xs text-muted-foreground">5 days from now</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="policies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
        <TabsContent value="policies" className="space-y-4">
          <div className="grid gap-4">
            {policies.map((policy) => (
              <Card key={policy.id}>
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">{policy.type}</CardTitle>
                    <Badge variant={policy.status === "Active" ? "default" : "outline"}>{policy.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Policy ID:</span>
                      <span>{policy.id}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Premium:</span>
                      <span>{policy.premium}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Next Payment:</span>
                      <span>{policy.nextPayment}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-4">
                  <Link href={`/policies/${policy.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/policies">
              <Button variant="link">View All Policies</Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="claims" className="space-y-4">
          <div className="grid gap-4">
            {claims.map((claim) => (
              <Card key={claim.id}>
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">{claim.type} Claim</CardTitle>
                    <Badge
                      variant={
                        claim.status === "Approved"
                          ? "success"
                          : claim.status === "Rejected"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {claim.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Claim ID:</span>
                      <span>{claim.id}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Amount:</span>
                      <span>{claim.amount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Date Filed:</span>
                      <span>{claim.date}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-4">
                  <Link href={`/claims/${claim.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/claims">
              <Button variant="link">View All Claims</Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">Payment for {payment.policyId}</CardTitle>
                    <Badge
                      variant={
                        payment.status === "Paid" ? "success" : payment.status === "Failed" ? "destructive" : "outline"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Payment ID:</span>
                      <span>{payment.id}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Amount:</span>
                      <span>{payment.amount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{payment.date}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-4">
                  <Link href={`/payments/${payment.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Receipt
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/payments">
              <Button variant="link">View All Payments</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
