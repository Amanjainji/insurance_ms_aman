"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, FileCheck, CreditCard, BarChart, ArrowUp, ArrowDown } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    customers: 0,
    policies: 0,
    claims: 0,
    revenue: 0,
  })
  const [recentCustomers, setRecentCustomers] = useState([])
  const [pendingClaims, setPendingClaims] = useState([])
  const [revenueData, setRevenueData] = useState([])

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // This is just mock data
    const mockStats = {
      customers: 1248,
      policies: 3567,
      claims: 245,
      revenue: 528950,
    }

    const mockRecentCustomers = [
      { id: "USR-1234", name: "Sarah Johnson", email: "sarah@example.com", date: "2023-05-01", policies: 2 },
      { id: "USR-2345", name: "Michael Chen", email: "michael@example.com", date: "2023-04-28", policies: 1 },
      { id: "USR-3456", name: "Emma Wilson", email: "emma@example.com", date: "2023-04-25", policies: 3 },
      { id: "USR-4567", name: "David Rodriguez", email: "david@example.com", date: "2023-04-22", policies: 1 },
      { id: "USR-5678", name: "Olivia Smith", email: "olivia@example.com", date: "2023-04-20", policies: 2 },
    ]

    const mockPendingClaims = [
      {
        id: "CLM-1234",
        customer: "Sarah Johnson",
        type: "Auto Insurance",
        amount: "$2,500",
        date: "2023-04-10",
        status: "In Review",
      },
      {
        id: "CLM-5678",
        customer: "Michael Chen",
        type: "Home Insurance",
        amount: "$5,000",
        date: "2023-04-15",
        status: "Pending Documents",
      },
      {
        id: "CLM-9012",
        customer: "Emma Wilson",
        type: "Auto Insurance",
        amount: "$1,800",
        date: "2023-04-18",
        status: "In Review",
      },
      {
        id: "CLM-3456",
        customer: "David Rodriguez",
        type: "Life Insurance",
        amount: "$10,000",
        date: "2023-04-20",
        status: "Verification",
      },
      {
        id: "CLM-7890",
        customer: "Olivia Smith",
        type: "Health Insurance",
        amount: "$3,200",
        date: "2023-04-22",
        status: "Pending Documents",
      },
    ]

    const mockRevenueData = [
      { month: "Jan", amount: 42500, growth: 5.2 },
      { month: "Feb", amount: 38900, growth: -8.5 },
      { month: "Mar", amount: 45200, growth: 16.2 },
      { month: "Apr", amount: 47800, growth: 5.8 },
      { month: "May", amount: 52300, growth: 9.4 },
    ]

    setStats(mockStats)
    setRecentCustomers(mockRecentCustomers)
    setPendingClaims(mockPendingClaims)
    setRevenueData(mockRevenueData)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}! Here's an overview of the system.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/policies/new">
            <Button>
              <Shield className="mr-2 h-4 w-4" />
              New Policy
            </Button>
          </Link>
          <Link href="/admin/customers/new">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" /> 12.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.policies.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" /> 8.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Claims</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.claims.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 font-medium flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" /> 4.3%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium flex items-center">
                <ArrowUp className="h-3 w-3 mr-1" /> 9.7%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Recent Customers</TabsTrigger>
          <TabsTrigger value="claims">Pending Claims</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Policy Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Auto Insurance</span>
                    </div>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Home Insurance</span>
                    </div>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Life Insurance</span>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Health Insurance</span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                      <span className="text-sm">Other</span>
                    </div>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-4 overflow-hidden">
                  <div className="flex h-full">
                    <div className="h-full bg-blue-500 w-[42%]"></div>
                    <div className="h-full bg-green-500 w-[28%]"></div>
                    <div className="h-full bg-yellow-500 w-[15%]"></div>
                    <div className="h-full bg-purple-500 w-[10%]"></div>
                    <div className="h-full bg-gray-500 w-[5%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Claims Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm">Pending</span>
                    </div>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">In Review</span>
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Approved</span>
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm">Rejected</span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-4 overflow-hidden">
                  <div className="flex h-full">
                    <div className="h-full bg-yellow-500 w-[35%]"></div>
                    <div className="h-full bg-blue-500 w-[25%]"></div>
                    <div className="h-full bg-green-500 w-[30%]"></div>
                    <div className="h-full bg-red-500 w-[10%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Customer Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">New customers this month</p>
                    <p className="text-2xl font-bold">111</p>
                  </div>
                  <div className="bg-green-100 text-green-800 py-1 px-2 rounded-lg flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span className="text-xs font-medium">0.93%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Jan</span>
                    <div className="w-full mx-2">
                      <div className="h-2 bg-blue-100 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full w-[65%]"></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">65</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Feb</span>
                    <div className="w-full mx-2">
                      <div className="h-2 bg-blue-100 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full w-[82%]"></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">82</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mar</span>
                    <div className="w-full mx-2">
                      <div className="h-2 bg-blue-100 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full w-[91%]"></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">91</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Apr</span>
                    <div className="w-full mx-2">
                      <div className="h-2 bg-blue-100 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full w-[110%]"></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">110</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">May</span>
                    <div className="w-full mx-2">
                      <div className="h-2 bg-blue-100 rounded-full">
                        <div className="h-full bg-blue-500 rounded-full w-[111%]"></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">111</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center">
            <Link href="/admin/analytics">
              <Button variant="outline">
                View Detailed Analytics
                <BarChart className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="customers" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-5 p-4 font-medium border-b">
              <div>Customer ID</div>
              <div>Name</div>
              <div>Email</div>
              <div>Join Date</div>
              <div>Policies</div>
            </div>
            {recentCustomers.map((customer) => (
              <div key={customer.id} className="grid grid-cols-5 p-4 border-b last:border-0 hover:bg-muted/50">
                <div className="font-medium">{customer.id}</div>
                <div>{customer.name}</div>
                <div className="text-muted-foreground">{customer.email}</div>
                <div>{customer.date}</div>
                <div>
                  <Badge>{customer.policies}</Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/admin/customers">
              <Button variant="link">View All Customers</Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="claims" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-6 p-4 font-medium border-b">
              <div>Claim ID</div>
              <div>Customer</div>
              <div>Type</div>
              <div>Amount</div>
              <div>Date</div>
              <div>Status</div>
            </div>
            {pendingClaims.map((claim) => (
              <div key={claim.id} className="grid grid-cols-6 p-4 border-b last:border-0 hover:bg-muted/50">
                <div className="font-medium">{claim.id}</div>
                <div>{claim.customer}</div>
                <div>{claim.type}</div>
                <div>{claim.amount}</div>
                <div>{claim.date}</div>
                <div>
                  <Badge variant="outline">{claim.status}</Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/admin/claims">
              <Button variant="link">View All Claims</Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="revenue" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-3 p-4 font-medium border-b">
              <div>Month</div>
              <div>Revenue</div>
              <div>Growth</div>
            </div>
            {revenueData.map((item) => (
              <div key={item.month} className="grid grid-cols-3 p-4 border-b last:border-0 hover:bg-muted/50">
                <div className="font-medium">{item.month}</div>
                <div>${item.amount.toLocaleString()}</div>
                <div className={item.growth > 0 ? "text-green-500" : "text-red-500"}>
                  <div className="flex items-center">
                    {item.growth > 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    {Math.abs(item.growth)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/admin/analytics">
              <Button variant="link">View Financial Reports</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
