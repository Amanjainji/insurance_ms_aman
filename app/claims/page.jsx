"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Plus, ArrowRight, Filter, CheckCircle, Clock, XCircle } from "lucide-react"
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
      type: "Home Insurance",
      status: "Submitted",
      statusIcon: Clock,
      progress: 25,
      amount: "$3,500",
      date: "2023-04-25",
      description: "Roof damage from storm",
    },
  ]

  // Filter claims based on search term and filters
  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <p className="text-muted-foreground">View and manage your insurance claims</p>
        </div>
        <div>
          <Link href="/claims/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              File New Claim
            </Button>
          </Link>
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
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
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

      <div className="grid gap-6 md:grid-cols-2">
        {filteredClaims.map((claim) => (
          <Card key={claim.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{claim.type} Claim</CardTitle>
                </div>
                <Badge
                  variant={
                    claim.status === "Approved" ? "success" : claim.status === "Rejected" ? "destructive" : "outline"
                  }
                >
                  <claim.statusIcon className="h-3.5 w-3.5 mr-1" />
                  {claim.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="grid gap-3">
                <div>
                  <p className="text-sm font-medium">{claim.description}</p>
                  <div className="mt-2 mb-1 flex items-center justify-between text-xs">
                    <span>Claim Progress</span>
                    <span>{claim.progress}%</span>
                  </div>
                  <Progress value={claim.progress} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Claim ID</p>
                    <p className="font-medium">{claim.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Policy ID</p>
                    <p className="font-medium">{claim.policyId}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium">{claim.amount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date Filed</p>
                    <p className="font-medium">{claim.date}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href={`/claims/${claim.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredClaims.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No claims found</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            {searchTerm || statusFilter !== "all" || typeFilter !== "all"
              ? "Try adjusting your search or filters"
              : "You haven't filed any claims yet"}
          </p>
          <Link href="/claims/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              File New Claim
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
