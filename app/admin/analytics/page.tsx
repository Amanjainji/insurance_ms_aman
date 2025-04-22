"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">View and analyze insurance data and metrics</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="policies" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Policies
          </TabsTrigger>
          <TabsTrigger value="claims" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Claims
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,567</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+8.2%</span> from last month
                </p>
                <div className="mt-4 h-1 w-full bg-muted">
                  <div className="h-1 w-[70%] bg-primary"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500">+4.3%</span> from last month
                </p>
                <div className="mt-4 h-1 w-full bg-muted">
                  <div className="h-1 w-[45%] bg-primary"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$52,395</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+9.7%</span> from last month
                </p>
                <div className="mt-4 h-1 w-full bg-muted">
                  <div className="h-1 w-[85%] bg-primary"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+2.5%</span> from last month
                </p>
                <div className="mt-4 h-1 w-full bg-muted">
                  <div className="h-1 w-[92%] bg-primary"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue for the past 6 months</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="space-y-2 text-center">
                    <BarChart className="mx-auto h-20 w-20 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Revenue chart visualization would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Policy Distribution</CardTitle>
                <CardDescription>Breakdown by insurance type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="space-y-2 text-center">
                    <PieChart className="mx-auto h-20 w-20 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Policy distribution chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Policy Growth</CardTitle>
                <CardDescription>New policies over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="space-y-2 text-center">
                    <LineChart className="mx-auto h-20 w-20 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Policy growth chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Policy Renewals</CardTitle>
                <CardDescription>Renewal rate by policy type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="space-y-2 text-center">
                    <BarChart className="mx-auto h-20 w-20 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Renewal rate chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Policy Performance</CardTitle>
                <CardDescription>Key metrics by policy type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 font-medium">
                        <th className="py-3 px-4 text-left">Policy Type</th>
                        <th className="py-3 px-4 text-left">Total Count</th>
                        <th className="py-3 px-4 text-left">Active</th>
                        <th className="py-3 px-4 text-left">Renewal Rate</th>
                        <th className="py-3 px-4 text-left">Avg. Premium</th>
                        <th className="py-3 px-4 text-left">Claims Ratio</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Auto Insurance</td>
                        <td className="py-3 px-4">1,542</td>
                        <td className="py-3 px-4">1,350</td>
                        <td className="py-3 px-4">87%</td>
                        <td className="py-3 px-4">$125/month</td>
                        <td className="py-3 px-4">12%</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Home Insurance</td>
                        <td className="py-3 px-4">985</td>
                        <td className="py-3 px-4">920</td>
                        <td className="py-3 px-4">93%</td>
                        <td className="py-3 px-4">$95/month</td>
                        <td className="py-3 px-4">8%</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Life Insurance</td>
                        <td className="py-3 px-4">650</td>
                        <td className="py-3 px-4">630</td>
                        <td className="py-3 px-4">97%</td>
                        <td className="py-3 px-4">$45/month</td>
                        <td className="py-3 px-4">2%</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Health Insurance</td>
                        <td className="py-3 px-4">390</td>
                        <td className="py-3 px-4">350</td>
                        <td className="py-3 px-4">90%</td>
                        <td className="py-3 px-4">$210/month</td>
                        <td className="py-3 px-4">18%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Claims Trend</CardTitle>
                <CardDescription>Monthly claims for the past 6 months</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="space-y-2 text-center">
                    <LineChart className="mx-auto h-20 w-20 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Claims trend chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Claims by Type</CardTitle>
                <CardDescription>Distribution of claims by insurance type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex h-full items-center justify-center">
                  <div className="space-y-2 text-center">
                    <PieChart className="mx-auto h-20 w-20 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Claims distribution chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Claims Analysis</CardTitle>
                <CardDescription>Key metrics by claim type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 font-medium">
                        <th className="py-3 px-4 text-left">Policy Type</th>
                        <th className="py-3 px-4 text-left">Total Claims</th>
                        <th className="py-3 px-4 text-left">Approved</th>
                        <th className="py-3 px-4 text-left">Rejected</th>
                        <th className="py-3 px-4 text-left">Avg. Processing Time</th>
                        <th className="py-3 px-4 text-left">Avg. Payout</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Auto Insurance</td>
                        <td className="py-3 px-4">125</td>
                        <td className="py-3 px-4">105</td>
                        <td className="py-3 px-4">20</td>
                        <td className="py-3 px-4">7 days</td>
                        <td className="py-3 px-4">$2,800</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Home Insurance</td>
                        <td className="py-3 px-4">85</td>
                        <td className="py-3 px-4">75</td>
                        <td className="py-3 px-4">10</td>
                        <td className="py-3 px-4">12 days</td>
                        <td className="py-3 px-4">$4,500</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Life Insurance</td>
                        <td className="py-3 px-4">15</td>
                        <td className="py-3 px-4">12</td>
                        <td className="py-3 px-4">3</td>
                        <td className="py-3 px-4">21 days</td>
                        <td className="py-3 px-4">$25,000</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">Health Insurance</td>
                        <td className="py-3 px-4">20</td>
                        <td className="py-3 px-4">18</td>
                        <td className="py-3 px-4">2</td>
                        <td className="py-3 px-4">5 days</td>
                        <td className="py-3 px-4">$1,200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
