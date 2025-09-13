"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import useAdmin from "@/Hooks/useAdmin"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Building2,
  CreditCard,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
} from "lucide-react"

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "active", joinDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", joinDate: "2024-01-20" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "inactive", joinDate: "2024-02-01" },
]

const mockBusinesses = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    owner: "John Doe",
    status: "approved",
    type: "Technology",
    appliedDate: "2024-01-16",
  },
  {
    id: 2,
    name: "Coffee Corner",
    owner: "Jane Smith",
    status: "pending",
    type: "Food & Beverage",
    appliedDate: "2024-01-25",
  },
  {
    id: 3,
    name: "Digital Marketing Pro",
    owner: "Bob Johnson",
    status: "pending",
    type: "Marketing",
    appliedDate: "2024-02-02",
  },
]

const mockTransactions = [
  {
    id: "tx_001",
    business: "Tech Solutions Inc",
    amount: 1500,
    currency: "USDC",
    status: "completed",
    date: "2024-02-15",
  },
  { id: "tx_002", business: "Coffee Corner", amount: 250, currency: "USDT", status: "failed", date: "2024-02-14" },
  {
    id: "tx_003",
    business: "Digital Marketing Pro",
    amount: 800,
    currency: "USDC",
    status: "pending",
    date: "2024-02-13",
  },
]

export function AdminDashboard() {
  const {res} = useAdmin()
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">StableFlow Admin</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar border-r border-sidebar-border">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "users" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
            <Button
              variant={activeTab === "businesses" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("businesses")}
            >
              <Building2 className="mr-2 h-4 w-4" />
              Businesses
            </Button>
            <Button
              variant={activeTab === "transactions" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("transactions")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Transactions
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Dashboard Overview</h2>
                <p className="text-muted-foreground">Monitor your StableFlow platform performance</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockUsers.length}</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Businesses</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {res?.data?.filter((b) => b.is_active === true).length}
                    </div>
                    <p className="text-xs text-muted-foreground">1 pending approval</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockTransactions.length}</div>
                    <p className="text-xs text-muted-foreground">+1 from yesterday</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${mockTransactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">USDC + USDT combined</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Users Management</h2>
                  <p className="text-muted-foreground">Manage registered users on the platform</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Registered Users</CardTitle>
                  <CardDescription>List of all users registered on StableFlow</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">Joined: {user.joinDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusBadge(user.status)}>
                            {getStatusIcon(user.status)}
                            <span className="ml-1">{user.status}</span>
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "businesses" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Business Management</h2>
                  <p className="text-muted-foreground">Review and approve business applications</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Business Applications</CardTitle>
                  <CardDescription>Manage business registrations and approvals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {res?.data?.map((business) => (
                      <div
                        key={business.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{business.name}</p>
                            <p className="text-sm text-muted-foreground">Owner: {business.owner_id}</p>
                            <p className="text-xs text-muted-foreground">
                              Type: {business.category_name} • Applied: {new Date(business.created_on).toISOString().split('T')[0]}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusBadge(business.onboarding_step)}>
                            {getStatusIcon(business.onboarding_step)}
                            <span className="ml-1">{business.onboarding_step}</span>
                          </Badge>
                          {business.onboarding_step === "pending" && (
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Approve
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground">Transaction Management</h2>
                  <p className="text-muted-foreground">Monitor and manage stablecoin transactions</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>USDC and USDT payment transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{transaction.id}</p>
                            <p className="text-sm text-muted-foreground">Business: {transaction.business}</p>
                            <p className="text-xs text-muted-foreground">Date: {transaction.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-foreground">
                              ${transaction.amount.toLocaleString()} {transaction.currency}
                            </p>
                          </div>
                          <Badge className={getStatusBadge(transaction.status)}>
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1">{transaction.status}</span>
                          </Badge>
                          {transaction.status === "failed" && (
                            <Button size="sm" variant="outline">
                              Retry
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
