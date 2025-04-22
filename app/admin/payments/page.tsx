"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Search, Filter, MoreHorizontal, Download, CheckCircle, Clock, XCircle } from "lucide-react"
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
      customer: "Sarah Johnson",
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
      customer: "Michael Chen",
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
      customer: "Sarah Johnson",
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
      customer: "Emma Wilson",
      policyType: "Life Insurance",
      amount: "$45",
      status: "Failed",
      statusIcon: XCircle,
      date: "2023-04-05",
      method: "Credit Card",
      cardLast4: "1234",
    },
    {
      id: "PAY-7890",
      policyId: "POL-3456",
      customer: "David Rodriguez",
      policyType: "Auto Insurance",
      amount: "$135",
      status: "Paid",
      statusIcon: CheckCircle,
      date: "2023-04-10",
      method: "PayPal",
      email: "david@example.com",
    },
  ]

  // Filter payments based on search term and filters
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <p className="text-muted-foreground">Manage and track premium payments</p>
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

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Payment List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 font-medium">
                  <th className="py-3 px-4 text-left">Payment ID</th>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Policy ID</th>
                  <th className="py-3 px-4 text-left">Policy Type</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Method</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{payment.id}</td>
                    <td className="py-3 px-4">{payment.customer}</td>
                    <td className="py-3 px-4">{payment.policyId}</td>
                    <td className="py-3 px-4">{payment.policyType}</td>
                    <td className="py-3 px-4">{payment.amount}</td>
                    <td className="py-3 px-4">{payment.date}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          payment.status === "Paid"
                            ? "success"
                            : payment.status === "Failed"
                              ? "destructive"
                              : "outline"
                        }
                        className="flex w-fit items-center gap-1"
                      >
                        <payment.statusIcon className="h-3 w-3" />
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {payment.method}
                      {payment.cardLast4 && ` (****${payment.cardLast4})`}
                      {payment.accountLast4 && ` (****${payment.accountLast4})`}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/payments/${payment.id}`}>
                          <Button variant="ghost" size="icon">
                            <CreditCard className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </Link>
                        {payment.status === "Paid" && (
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Send Receipt</DropdownMenuItem>
                            <DropdownMenuItem>Process Refund</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
