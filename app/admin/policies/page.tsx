"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, MoreHorizontal, Download, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PoliciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock policy data
  const policies = [
    {
      id: "POL-1234",
      policyNumber: "INS-AUTO-1234",
      customer: "Sarah Johnson",
      type: "Auto Insurance",
      status: "Active",
      premium: "$120/month",
      startDate: "2023-01-15",
      endDate: "2024-01-15",
      coverage: "$50,000",
    },
    {
      id: "POL-5678",
      policyNumber: "INS-HOME-5678",
      customer: "Michael Chen",
      type: "Home Insurance",
      status: "Active",
      premium: "$85/month",
      startDate: "2023-02-20",
      endDate: "2024-02-20",
      coverage: "$250,000",
    },
    {
      id: "POL-9012",
      policyNumber: "INS-LIFE-9012",
      customer: "Emma Wilson",
      type: "Life Insurance",
      status: "Pending",
      premium: "$45/month",
      startDate: "Pending",
      endDate: "Pending",
      coverage: "$500,000",
    },
    {
      id: "POL-3456",
      policyNumber: "INS-AUTO-3456",
      customer: "David Rodriguez",
      type: "Auto Insurance",
      status: "Active",
      premium: "$135/month",
      startDate: "2022-11-05",
      endDate: "2023-11-05",
      coverage: "$75,000",
    },
    {
      id: "POL-7890",
      policyNumber: "INS-HOME-7890",
      customer: "Olivia Smith",
      type: "Home Insurance",
      status: "Expired",
      premium: "$95/month",
      startDate: "2022-05-10",
      endDate: "2023-05-10",
      coverage: "$200,000",
    },
  ]

  // Filter policies based on search term and filters
  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.customer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || policy.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || policy.type.toLowerCase().includes(typeFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Policies</h1>
          <p className="text-muted-foreground">Manage and view all insurance policies</p>
        </div>
        <div>
          <Link href="/admin/policies/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Policy
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search policies..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
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
              <DropdownMenuItem>Policy ID</DropdownMenuItem>
              <DropdownMenuItem>Customer Name</DropdownMenuItem>
              <DropdownMenuItem>Start Date</DropdownMenuItem>
              <DropdownMenuItem>Premium (Low to High)</DropdownMenuItem>
              <DropdownMenuItem>Premium (High to Low)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Policy List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 font-medium">
                  <th className="py-3 px-4 text-left">Policy Number</th>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Premium</th>
                  <th className="py-3 px-4 text-left">Coverage</th>
                  <th className="py-3 px-4 text-left">Expiry Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPolicies.map((policy) => (
                  <tr key={policy.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{policy.policyNumber}</td>
                    <td className="py-3 px-4">{policy.customer}</td>
                    <td className="py-3 px-4">{policy.type}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          policy.status === "Active" ? "default" : policy.status === "Pending" ? "outline" : "secondary"
                        }
                      >
                        {policy.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{policy.premium}</td>
                    <td className="py-3 px-4">{policy.coverage}</td>
                    <td className="py-3 px-4">{policy.endDate}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/policies/${policy.id}`}>
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Policy</DropdownMenuItem>
                            <DropdownMenuItem>Renew Policy</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Cancel Policy</DropdownMenuItem>
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
