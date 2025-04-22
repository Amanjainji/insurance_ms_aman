"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Settings, Lock, Bell, Mail, Save, Globe, Database, Server } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage system settings and configurations</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span className="hidden md:inline">System</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="InsureHub Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Company Website</Label>
                  <Input id="company-website" defaultValue="https://insurehub.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Support Email</Label>
                  <Input id="company-email" defaultValue="support@insurehub.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Support Phone</Label>
                  <Input id="company-phone" defaultValue="(555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Company Address</Label>
                <Textarea
                  id="company-address"
                  defaultValue="123 Insurance Way, Financial District, New York, NY 10001"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Configure general system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="date-format">Date Format</Label>
                    <p className="text-sm text-muted-foreground">Choose your preferred date format</p>
                  </div>
                  <div className="w-[200px]">
                    <select
                      id="date-format"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="MM/DD/YYYY"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="timezone">Timezone</Label>
                    <p className="text-sm text-muted-foreground">Set your system timezone</p>
                  </div>
                  <div className="w-[200px]">
                    <select
                      id="timezone"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="America/New_York"
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="currency">Currency</Label>
                    <p className="text-sm text-muted-foreground">Set your default currency</p>
                  </div>
                  <div className="w-[200px]">
                    <select
                      id="currency"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="USD"
                    >
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="GBP">British Pound (GBP)</option>
                      <option value="CAD">Canadian Dollar (CAD)</option>
                      <option value="JPY">Japanese Yen (JPY)</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security options for the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Password Complexity</Label>
                    <p className="text-sm text-muted-foreground">Require strong passwords for all users</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                  </div>
                  <div className="w-[200px]">
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="30"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="240">4 hours</option>
                    </select>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Restrictions</Label>
                    <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Protection</CardTitle>
              <CardDescription>Configure data protection and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">Enable encryption for sensitive data</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">Schedule regular data backups</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Retention</Label>
                    <p className="text-sm text-muted-foreground">Set data retention period</p>
                  </div>
                  <div className="w-[200px]">
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="7"
                    >
                      <option value="1">1 year</option>
                      <option value="3">3 years</option>
                      <option value="5">5 years</option>
                      <option value="7">7 years</option>
                      <option value="10">10 years</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure system email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Policy Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send email when new policies are created</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Claim Status Updates</Label>
                    <p className="text-sm text-muted-foreground">Send email when claim status changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send email for payment events</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Send email for system events and errors</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Manage system email templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50 font-medium">
                      <th className="py-3 px-4 text-left">Template Name</th>
                      <th className="py-3 px-4 text-left">Description</th>
                      <th className="py-3 px-4 text-left">Last Updated</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Welcome Email</td>
                      <td className="py-3 px-4">Sent to new customers</td>
                      <td className="py-3 px-4">2023-04-15</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Policy Confirmation</td>
                      <td className="py-3 px-4">Sent when policy is created</td>
                      <td className="py-3 px-4">2023-03-20</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Claim Update</td>
                      <td className="py-3 px-4">Sent when claim status changes</td>
                      <td className="py-3 px-4">2023-04-05</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Payment Receipt</td>
                      <td className="py-3 px-4">Sent after successful payment</td>
                      <td className="py-3 px-4">2023-03-15</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Integrations</CardTitle>
              <CardDescription>Manage third-party API integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50 font-medium">
                      <th className="py-3 px-4 text-left">Integration</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Last Synced</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-blue-500" />
                          <div>
                            <div className="font-medium">Payment Gateway</div>
                            <div className="text-xs text-muted-foreground">Stripe API</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="success">Connected</Badge>
                      </td>
                      <td className="py-3 px-4">2023-04-20 09:15 AM</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          Configure
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Database className="h-5 w-5 text-green-500" />
                          <div>
                            <div className="font-medium">CRM Integration</div>
                            <div className="text-xs text-muted-foreground">Salesforce API</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="success">Connected</Badge>
                      </td>
                      <td className="py-3 px-4">2023-04-19 14:30 PM</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          Configure
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-red-500" />
                          <div>
                            <div className="font-medium">Email Service</div>
                            <div className="text-xs text-muted-foreground">SendGrid API</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="success">Connected</Badge>
                      </td>
                      <td className="py-3 px-4">2023-04-20 10:45 AM</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          Configure
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Server className="h-5 w-5 text-purple-500" />
                          <div>
                            <div className="font-medium">Document Storage</div>
                            <div className="text-xs text-muted-foreground">AWS S3</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">Disconnected</Badge>
                      </td>
                      <td className="py-3 px-4">Never</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          Connect
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <Globe className="mr-2 h-4 w-4" />
                Add New Integration
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>View system details and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>System Version</Label>
                    <div className="rounded-md bg-muted p-2 text-sm">v2.5.3</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Last Updated</Label>
                    <div className="rounded-md bg-muted p-2 text-sm">April 15, 2023</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Database Status</Label>
                    <div className="rounded-md bg-muted p-2 text-sm flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      Connected
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>API Status</Label>
                    <div className="rounded-md bg-muted p-2 text-sm flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      Operational
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>System Logs</Label>
                  <div className="h-40 rounded-md bg-muted p-2 text-xs font-mono overflow-auto">
                    <p>[2023-04-20 09:15:23] INFO: System startup completed</p>
                    <p>[2023-04-20 09:15:25] INFO: Database connection established</p>
                    <p>[2023-04-20 09:15:26] INFO: API services initialized</p>
                    <p>[2023-04-20 09:16:01] INFO: User admin@example.com logged in</p>
                    <p>[2023-04-20 09:20:15] INFO: Policy POL-1234 created</p>
                    <p>[2023-04-20 09:25:32] INFO: Payment PAY-5678 processed</p>
                    <p>[2023-04-20 09:30:45] INFO: Claim CLM-9012 status updated to "In Review"</p>
                    <p>[2023-04-20 09:35:10] INFO: Email notification sent to customer@example.com</p>
                    <p>[2023-04-20 09:40:22] INFO: System backup completed successfully</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Download Logs
              </Button>
              <Button>
                <Server className="mr-2 h-4 w-4" />
                Run System Diagnostics
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance</CardTitle>
              <CardDescription>System maintenance options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Updates</Label>
                    <p className="text-sm text-muted-foreground">Enable automatic system updates</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Put system in maintenance mode</p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Database Optimization</Label>
                    <p className="text-sm text-muted-foreground">Schedule database optimization</p>
                  </div>
                  <div className="w-[200px]">
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      defaultValue="weekly"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="manual">Manual Only</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
