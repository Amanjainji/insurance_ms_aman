"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Filter, MoreHorizontal, CheckCircle, Clock, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock claims data
  const claims = [
    {
      id: "CLM-1234",
      policyId: "POL-1234",
      customer: "Sarah Johnson",
      type: "Auto Insurance",
      status: "In Progress",
      statusIcon: Clock,
      progress: 50,
      amount: "$2,500",
      date: "2023-04-10",
      description: "Car accident damage repair",
    },
    {
      id: "CLM-5678",
      policyId: "POL-5678",
      customer: "Michael Chen",
      type: "Home Insurance",
      status: "Approved",
      statusIcon: CheckCircle,
      progress: 100,
      amount: "$5,000",
      date: "2023-03-15",
      description: "Water damage from burst pipe",
    },
    {
      id: "CLM-9012",
      policyId: "POL-1234",
      customer: "Emma Wilson",
      type: "Auto Insurance",
      status: "Rejected",
      statusIcon: XCircle,
      progress: 100,
      amount: "$1,200",
      date: "2023-02-20",
      description: "Windshield replacement",
    },
    {
      id: "CLM-3456",
      policyId: "POL-5678",
      customer: "David Rodriguez",
      type: "Home Insurance",
      status: "Submitted",
      statusIcon: Clock,
      progress: 25,
      amount: "$3,500",
      date: "2023-04-25",
      description: "Roof damage from storm",
    },
    {
      id: "CLM-7890",
      policyId: "POL-9012",
      customer: "Olivia Smith",
      type: "Life Insurance",
      status: "Under Review",
      statusIcon: Clock,
      progress: 75,
      amount: "$10,000",
      date: "2023-04-15",
      description: "Beneficiary claim",
    },
  ]

  // Filter claims based on search term and filters
  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || claim.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || claim.type.toLowerCase().includes(typeFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Claims</h1>
          <p className="text-muted-foreground">Manage and process insurance claims</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search claims..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="under review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
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
              <DropdownMenuItem>Claim ID</DropdownMenuItem>
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
          <CardTitle>Claims List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 font-medium">
                  <th className="py-3 px-4 text-left">Claim ID</th>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Policy Type</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Date Filed</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map((claim) => (
                  <tr key={claim.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{claim.id}</td>
                    <td className="py-3 px-4">{claim.customer}</td>
                    <td className="py-3 px-4">{claim.type}</td>
                    <td className="py-3 px-4">{claim.description}</td>
                    <td className="py-3 px-4">{claim.amount}</td>
                    <td className="py-3 px-4">{claim.date}</td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <Badge
                          variant={
                            claim.status === "Approved"
                              ? "success"
                              : claim.status === "Rejected"
                                ? "destructive"
                                : "outline"
                          }
                          className="flex w-fit items-center gap-1"
                        >
                          <claim.statusIcon className="h-3 w-3" />
                          {claim.status}
                        </Badge>
                        <Progress value={claim.progress} className="h-1.5 w-24" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/claims/${claim.id}`}>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Assign Agent</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-green-600">Approve Claim</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Reject Claim</DropdownMenuItem>
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
