"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Search, Plus, ArrowRight, Car, Home, Heart, Umbrella, Filter } from "lucide-react"
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
      type: "Auto Insurance",
      icon: Car,
      status: "Active",
      premium: "$120/month",
      nextPayment: "2023-05-15",
      coverage: "$50,000",
      startDate: "2022-05-15",
      endDate: "2023-05-15",
    },
    {
      id: "POL-5678",
      type: "Home Insurance",
      icon: Home,
      status: "Active",
      premium: "$85/month",
      nextPayment: "2023-05-20",
      coverage: "$250,000",
      startDate: "2022-06-20",
      endDate: "2023-06-20",
    },
    {
      id: "POL-9012",
      type: "Life Insurance",
      icon: Heart,
      status: "Pending",
      premium: "$45/month",
      nextPayment: "N/A",
      coverage: "$500,000",
      startDate: "Pending",
      endDate: "Pending",
    },
    {
      id: "POL-3456",
      type: "Umbrella Insurance",
      icon: Umbrella,
      status: "Expired",
      premium: "$30/month",
      nextPayment: "N/A",
      coverage: "$1,000,000",
      startDate: "2021-03-10",
      endDate: "2022-03-10",
    },
  ]

  // Filter policies based on search term and filters
  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || policy.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || policy.type.toLowerCase().includes(typeFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Policies</h1>
          <p className="text-muted-foreground">View and manage all your insurance policies</p>
        </div>
        <div>
          <Link href="/policies/new">
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
              <SelectItem value="umbrella">Umbrella</SelectItem>
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
              <DropdownMenuItem>Type</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Premium (Low to High)</DropdownMenuItem>
              <DropdownMenuItem>Premium (High to Low)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPolicies.map((policy) => (
          <Card key={policy.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <policy.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{policy.type}</CardTitle>
                </div>
                <Badge
                  variant={
                    policy.status === "Active" ? "default" : policy.status === "Pending" ? "outline" : "secondary"
                  }
                >
                  {policy.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Policy ID:</span>
                  <span className="font-medium">{policy.id}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Premium:</span>
                  <span>{policy.premium}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Coverage:</span>
                  <span>{policy.coverage}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Valid Until:</span>
                  <span>{policy.endDate}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href={`/policies/${policy.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPolicies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Shield className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No policies found</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            {searchTerm || statusFilter !== "all" || typeFilter !== "all"
              ? "Try adjusting your search or filters"
              : "You don't have any policies yet"}
          </p>
          <Link href="/policies/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Policy
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
