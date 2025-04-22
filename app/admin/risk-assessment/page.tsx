"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RiskAssessmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock risk assessment data
  const riskAssessments = [
    {
      id: "RISK-1234",
      policyId: "POL-1234",
      customer: "Sarah Johnson",
      type: "Auto Insurance",
      riskScore: 85,
      riskLevel: "High",
      trend: "up",
      trendIcon: ArrowUpRight,
      factors: ["Accident History", "Urban Area", "High-Value Vehicle"],
      lastUpdated: "2023-04-15",
    },
    {
      id: "RISK-5678",
      policyId: "POL-5678",
      customer: "Michael Chen",
      type: "Home Insurance",
      riskScore: 45,
      riskLevel: "Medium",
      trend: "down",
      trendIcon: ArrowDownRight,
      factors: ["Security System", "Flood Zone", "Building Age"],
      lastUpdated: "2023-04-10",
    },
    {
      id: "RISK-9012",
      policyId: "POL-9012",
      customer: "Emma Wilson",
      type: "Life Insurance",
      riskScore: 20,
      riskLevel: "Low",
      trend: "stable",
      trendIcon: Minus,
      factors: ["Age", "Health Status", "Family History"],
      lastUpdated: "2023-04-05",
    },
    {
      id: "RISK-3456",
      policyId: "POL-3456",
      customer: "David Rodriguez",
      type: "Auto Insurance",
      riskScore: 65,
      riskLevel: "Medium",
      trend: "up",
      trendIcon: ArrowUpRight,
      factors: ["New Driver", "Sports Car", "Previous Claims"],
      lastUpdated: "2023-04-20",
    },
    {
      id: "RISK-7890",
      policyId: "POL-7890",
      customer: "Olivia Smith",
      type: "Home Insurance",
      riskScore: 90,
      riskLevel: "High",
      trend: "up",
      trendIcon: ArrowUpRight,
      factors: ["Coastal Area", "Hurricane Zone", "No Security System"],
      lastUpdated: "2023-04-18",
    },
  ]

  // Filter risk assessments based on search term and filters
  const filteredRisks = riskAssessments.filter((risk) => {
    const matchesSearch =
      risk.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.policyId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRisk = riskFilter === "all" || risk.riskLevel.toLowerCase() === riskFilter.toLowerCase()
    const matchesType = typeFilter === "all" || risk.type.toLowerCase().includes(typeFilter.toLowerCase())

    return matchesSearch && matchesRisk && matchesType
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Risk Assessment</h1>
        <p className="text-muted-foreground">Evaluate and manage insurance risks</p>
      </div>

      <Tabs defaultValue="assessments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assessments">Risk Assessments</TabsTrigger>
          <TabsTrigger value="models">Risk Models</TabsTrigger>
          <TabsTrigger value="factors">Risk Factors</TabsTrigger>
        </TabsList>

        <TabsContent value="assessments" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search risk assessments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
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
                  <DropdownMenuItem>Risk ID</DropdownMenuItem>
                  <DropdownMenuItem>Risk Score (High to Low)</DropdownMenuItem>
                  <DropdownMenuItem>Risk Score (Low to High)</DropdownMenuItem>
                  <DropdownMenuItem>Last Updated</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Risk Assessment List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50 font-medium">
                      <th className="py-3 px-4 text-left">Risk ID</th>
                      <th className="py-3 px-4 text-left">Customer</th>
                      <th className="py-3 px-4 text-left">Policy Type</th>
                      <th className="py-3 px-4 text-left">Risk Score</th>
                      <th className="py-3 px-4 text-left">Risk Level</th>
                      <th className="py-3 px-4 text-left">Trend</th>
                      <th className="py-3 px-4 text-left">Risk Factors</th>
                      <th className="py-3 px-4 text-left">Last Updated</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRisks.map((risk) => (
                      <tr key={risk.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{risk.id}</td>
                        <td className="py-3 px-4">{risk.customer}</td>
                        <td className="py-3 px-4">{risk.type}</td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>{risk.riskScore}/100</span>
                            </div>
                            <Progress
                              value={risk.riskScore}
                              className={`h-1.5 w-24 ${
                                risk.riskScore >= 70
                                  ? "bg-red-100"
                                  : risk.riskScore >= 40
                                    ? "bg-yellow-100"
                                    : "bg-green-100"
                              }`}
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="default"
                          >
                            {risk.riskLevel}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <risk.trendIcon
                              className={`h-4 w-4 mr-1 ${
                                risk.trend === "up"
                                  ? "text-red-500"
                                  : risk.trend === "down"
                                    ? "text-green-500"
                                    : "text-gray-500"
                              }`}
                            />
                            {risk.trend === "up" ? "Increasing" : risk.trend === "down" ? "Decreasing" : "Stable"}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {risk.factors.map((factor, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">{risk.lastUpdated}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <AlertTriangle className="h-4 w-4" />
                              <span className="sr-only">View</span>
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
                                <DropdownMenuItem>Update Assessment</DropdownMenuItem>
                                <DropdownMenuItem>Run Simulation</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Generate Report</DropdownMenuItem>
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
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50 font-medium">
                      <th className="py-3 px-4 text-left">Model ID</th>
                      <th className="py-3 px-4 text-left">Model Name</th>
                      <th className="py-3 px-4 text-left">Insurance Type</th>
                      <th className="py-3 px-4 text-left">Version</th>
                      <th className="py-3 px-4 text-left">Accuracy</th>
                      <th className="py-3 px-4 text-left">Last Updated</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">MDL-001</td>
                      <td className="py-3 px-4">Auto Risk Predictor</td>
                      <td className="py-3 px-4">Auto Insurance</td>
                      <td className="py-3 px-4">v2.3</td>
                      <td className="py-3 px-4">92%</td>
                      <td className="py-3 px-4">2023-03-15</td>
                      <td className="py-3 px-4">
                        <Badge variant="default">Active</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">MDL-002</td>
                      <td className="py-3 px-4">Home Risk Analyzer</td>
                      <td className="py-3 px-4">Home Insurance</td>
                      <td className="py-3 px-4">v1.8</td>
                      <td className="py-3 px-4">88%</td>
                      <td className="py-3 px-4">2023-02-20</td>
                      <td className="py-3 px-4">
                        <Badge variant="default">Active</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">MDL-003</td>
                      <td className="py-3 px-4">Life Expectancy Model</td>
                      <td className="py-3 px-4">Life Insurance</td>
                      <td className="py-3 px-4">v3.1</td>
                      <td className="py-3 px-4">95%</td>
                      <td className="py-3 px-4">2023-04-05</td>
                      <td className="py-3 px-4">
                        <Badge variant="default">Active</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">MDL-004</td>
                      <td className="py-3 px-4">Health Risk Predictor</td>
                      <td className="py-3 px-4">Health Insurance</td>
                      <td className="py-3 px-4">v1.2</td>
                      <td className="py-3 px-4">85%</td>
                      <td className="py-3 px-4">2023-01-10</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">In Development</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="factors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Factors by Insurance Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-medium">Auto Insurance Risk Factors</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Driver Age</p>
                        <p className="text-sm text-muted-foreground">Younger and elderly drivers pose higher risks</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Driving History</p>
                        <p className="text-sm text-muted-foreground">Previous accidents and traffic violations</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Vehicle Type</p>
                        <p className="text-sm text-muted-foreground">
                          Sports cars and luxury vehicles have higher risk
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">Urban areas and high crime neighborhoods</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Home Insurance Risk Factors</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Natural Disaster Zone</p>
                        <p className="text-sm text-muted-foreground">Flood, hurricane, or earthquake prone areas</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Building Age</p>
                        <p className="text-sm text-muted-foreground">Older homes have higher risk of system failures</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Security Systems</p>
                        <p className="text-sm text-muted-foreground">Lack of security systems increases theft risk</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Construction Materials</p>
                        <p className="text-sm text-muted-foreground">Fire-resistant materials reduce risk</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
