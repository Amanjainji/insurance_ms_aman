"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, MoreHorizontal, User, Mail, Phone, Shield } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  // Mock agents data
  const agents = [
    {
      id: "AGT-1234",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      role: "Senior Agent",
      status: "Active",
      customers: 45,
      policies: 78,
      joinDate: "2020-05-15",
      performance: "Excellent",
    },
    {
      id: "AGT-5678",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "(555) 234-5678",
      role: "Agent",
      status: "Active",
      customers: 32,
      policies: 51,
      joinDate: "2021-03-10",
      performance: "Good",
    },
    {
      id: "AGT-9012",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "(555) 345-6789",
      role: "Junior Agent",
      status: "Active",
      customers: 18,
      policies: 25,
      joinDate: "2022-01-20",
      performance: "Average",
    },
    {
      id: "AGT-3456",
      name: "Jessica Williams",
      email: "jessica.williams@example.com",
      phone: "(555) 456-7890",
      role: "Senior Agent",
      status: "On Leave",
      customers: 38,
      policies: 62,
      joinDate: "2019-11-05",
      performance: "Excellent",
    },
    {
      id: "AGT-7890",
      name: "David Miller",
      email: "david.miller@example.com",
      phone: "(555) 567-8901",
      role: "Agent",
      status: "Inactive",
      customers: 0,
      policies: 0,
      joinDate: "2021-07-15",
      performance: "N/A",
    },
  ]

  // Filter agents based on search term and filters
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || agent.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesRole = roleFilter === "all" || agent.role.toLowerCase().includes(roleFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesRole
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
          <p className="text-muted-foreground">Manage and view all insurance agents</p>
        </div>
        <div>
          <Link href="/admin/agents/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Agent
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
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
              <SelectItem value="on leave">On Leave</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="senior">Senior Agent</SelectItem>
              <SelectItem value="agent">Agent</SelectItem>
              <SelectItem value="junior">Junior Agent</SelectItem>
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
              <DropdownMenuItem>Agent ID</DropdownMenuItem>
              <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
              <DropdownMenuItem>Join Date (Newest)</DropdownMenuItem>
              <DropdownMenuItem>Join Date (Oldest)</DropdownMenuItem>
              <DropdownMenuItem>Performance</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Agent List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 font-medium">
                  <th className="py-3 px-4 text-left">Agent</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Contact</th>
                  <th className="py-3 px-4 text-left">Customers</th>
                  <th className="py-3 px-4 text-left">Policies</th>
                  <th className="py-3 px-4 text-left">Performance</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-xs text-muted-foreground">{agent.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{agent.role}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          agent.status === "Active" ? "default" : agent.status === "On Leave" ? "outline" : "secondary"
                        }
                      >
                        {agent.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {agent.email}
                        </div>
                        <div className="flex items-center mt-1">
                          <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {agent.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-primary" />
                        {agent.customers}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-1 text-primary" />
                        {agent.policies}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          agent.performance === "Excellent"
                            ? "success"
                            : agent.performance === "Good"
                              ? "default"
                              : agent.performance === "Average"
                                ? "outline"
                                : "secondary"
                        }
                      >
                        {agent.performance}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/agents/${agent.id}`}>
                          <Button variant="ghost" size="icon">
                            <User className="h-4 w-4" />
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
                            <DropdownMenuItem>Edit Agent</DropdownMenuItem>
                            <DropdownMenuItem>Assign Customers</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Deactivate Agent</DropdownMenuItem>
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
