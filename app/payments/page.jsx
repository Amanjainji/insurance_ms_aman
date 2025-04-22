"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Search, Filter, ArrowRight, Download, CheckCircle, Clock, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock payments data
  const payments = [
    {
      id: "PAY-1234",
      policyId: "POL-1234",
      policyType: "Auto Insurance",
      amount: "$120",
      status: "Paid",
      statusIcon: CheckCircle,
      date: "2023-04-15",
      method: "Credit Card",
      cardLast4: "4242",
    },
    {
      id: "PAY-5678",
      policyId: "POL-5678",
      policyType: "Home Insurance",
      amount: "$85",
      status: "Paid",
      statusIcon: CheckCircle,
      date: "2023-04-20",
      method: "Bank Transfer",
      accountLast4: "6789",
    },
    {
      id: "PAY-9012",
      policyId: "POL-1234",
      policyType: "Auto Insurance",
      amount: "$120",
      status: "Due",
      statusIcon: Clock,
      date: "2023-05-15",
      method: "Pending",
      cardLast4: null,
    },
    {
      id: "PAY-3456",
      policyId: "POL-9012",
      policyType: "Life Insurance",
      amount: "$45",
      status: "Failed",
      statusIcon: XCircle,
      date: "2023-04-05",
      method: "Credit Card",
      cardLast4: "1234",
    },
  ]

  // Filter payments based on search term and filters
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.policyId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || payment.policyType.toLowerCase().includes(typeFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">View and manage your premium payments</p>
        </div>
        <div>
          <Link href="/payments/make">
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              Make Payment
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="due">Due</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Policy Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="life">Life</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Payment ID</DropdownMenuItem>
              <DropdownMenuItem>Date (Newest First)</DropdownMenuItem>
              <DropdownMenuItem>Date (Oldest First)</DropdownMenuItem>
              <DropdownMenuItem>Amount (Low to High)</DropdownMenuItem>
              <DropdownMenuItem>Amount (High to Low)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPayments.map((payment) => (
          <Card key={payment.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{payment.policyType} Payment</CardTitle>
                </div>
                <Badge
                  variant={
                    payment.status === "Paid" ? "success" : payment.status === "Failed" ? "destructive" : "outline"
                  }
                >
                  <payment.statusIcon className="h-3.5 w-3.5 mr-1" />
                  {payment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Payment ID</p>
                  <p className="font-medium">{payment.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Policy ID</p>
                  <p className="font-medium">{payment.policyId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium">{payment.amount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{payment.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Method</p>
                  <p className="font-medium">
                    {payment.method}
                    {payment.cardLast4 && ` (****${payment.cardLast4})`}
                    {payment.accountLast4 && ` (****${payment.accountLast4})`}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex gap-2">
              <Link href={`/payments/${payment.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              {payment.status === "Paid" && (
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No payments found</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            {searchTerm || statusFilter !== "all" || typeFilter !== "all"
              ? "Try adjusting your search or filters"
              : "You don't have any payment records yet"}
          </p>
          <Link href="/payments/make">
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              Make Payment
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
