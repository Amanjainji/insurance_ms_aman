"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Plus, Filter, MoreHorizontal, Mail, Phone, Shield, FileText } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCustomers, setSelectedCustomers] = useState([])

  // Mock customers data
  const customers = [
    {
      id: "USR-1234",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "(555) 123-4567",
      status: "Active",
      policies: 2,
      joinDate: "2023-01-15",
      lastActive: "2023-05-01",
      totalPremium: "$205/month",
    },
    {
      id: "USR-2345",
      name: "Michael Chen",
      email: "michael@example.com",
      phone: "(555) 234-5678",
      status: "Active",
      policies: 1,
      joinDate: "2023-02-20",
      lastActive: "2023-04-28",
      totalPremium: "$120/month",
    },
    {
      id: "USR-3456",
      name: "Emma Wilson",
      email: "emma@example.com",
      phone: "(555) 345-6789",
      status: "Active",
      policies: 3,
      joinDate: "2022-11-05",
      lastActive: "2023-04-25",
      totalPremium: "$350/month",
    },
    {
      id: "USR-4567",
      name: "David Rodriguez",
      email: "david@example.com",
      phone: "(555) 456-7890",
      status: "Inactive",
      policies: 1,
      joinDate: "2022-08-12",
      lastActive: "2023-03-15",
      totalPremium: "$0/month",
    },
    {
      id: "USR-5678",
      name: "Olivia Smith",
      email: "olivia@example.com",
      phone: "(555) 567-8901",
      status: "Active",
      policies: 2,
      joinDate: "2023-03-30",
      lastActive: "2023-04-20",
      totalPremium: "$185/month",
    },
    {
      id: "USR-6789",
      name: "James Wilson",
      email: "james@example.com",
      phone: "(555) 678-9012",
      status: "Pending",
      policies: 0,
      joinDate: "2023-04-28",
      lastActive: "2023-04-28",
      totalPremium: "$0/month",
    },
    {
      id: "USR-7890",
      name: "Sophia Lee",
      email: "sophia@example.com",
      phone: "(555) 789-0123",
      status: "Active",
      policies: 1,
      joinDate: "2022-12-10",
      lastActive: "2023-04-15",
      totalPremium: "$95/month",
    },
  ]

  // Filter customers based on search term and filters
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || customer.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(filteredCustomers.map((customer) => customer.id))
    }
  }

  const toggleSelectCustomer = (customerId) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId))
    } else {
      setSelectedCustomers([...selectedCustomers, customerId])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage and view all customer accounts</p>
        </div>
        <div>
          <Link href="/admin/customers/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
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
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
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
              <DropdownMenuItem>Customer ID</DropdownMenuItem>
              <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
              <DropdownMenuItem>Join Date (Newest)</DropdownMenuItem>
              <DropdownMenuItem>Join Date (Oldest)</DropdownMenuItem>
              <DropdownMenuItem>Number of Policies</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <CardTitle>Customer List</CardTitle>
            {selectedCustomers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{selectedCustomers.length} selected</span>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Policies
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <div className="grid grid-cols-7 p-4 font-medium border-b">
              <div className="flex items-center">
                <Checkbox
                  checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                  onCheckedChange={toggleSelectAll}
                  className="mr-2"
                />
                Customer
              </div>
              <div>Status</div>
              <div>Contact</div>
              <div>Policies</div>
              <div>Join Date</div>
              <div>Premium</div>
              <div className="text-right">Actions</div>
            </div>
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="grid grid-cols-7 p-4 border-b last:border-0 hover:bg-muted/50 items-center"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => toggleSelectCustomer(customer.id)}
                  />
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-xs text-muted-foreground">{customer.id}</div>
                  </div>
                </div>
                <div>
                  <Badge
                    variant={
                      customer.status === "Active"
                        ? "default"
                        : customer.status === "Inactive"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {customer.status}
                  </Badge>
                </div>
                <div className="text-sm">
                  <div className="flex items-center">
                    <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    {customer.email}
                  </div>
                  <div className="flex items-center mt-1">
                    <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    {customer.phone}
                  </div>
                </div>
                <div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-primary" />
                    {customer.policies}
                  </div>
                </div>
                <div className="text-sm">
                  <div>{customer.joinDate}</div>
                  <div className="text-xs text-muted-foreground">Last active: {customer.lastActive}</div>
                </div>
                <div>{customer.totalPremium}</div>
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/customers/${customer.id}`}>
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
                      <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                      <DropdownMenuItem>View Policies</DropdownMenuItem>
                      <DropdownMenuItem>View Claims</DropdownMenuItem>
                      <DropdownMenuItem>View Payments</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Deactivate Account</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredCustomers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No customers found</h3>
          <p className="text-muted-foreground mt-2 mb-6">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "There are no customers in the system yet"}
          </p>
          <Link href="/admin/customers/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Customer
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
