import { useState } from 'react';
import {
  Download,
  Calendar,
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  FileText,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export function Reports() {
  const [timePeriod, setTimePeriod] = useState('week');

  const salesReportData = [
    { period: 'Week 1', sales: 45000, orders: 25, profit: 8500 },
    { period: 'Week 2', sales: 52000, orders: 30, profit: 10200 },
    { period: 'Week 3', sales: 48000, orders: 28, profit: 9100 },
    { period: 'Week 4', sales: 61000, orders: 35, profit: 12500 },
  ];

  const categoryPerformance = [
    { category: 'Leafy', sales: 35000, orders: 85 },
    { category: 'Root', sales: 48000, orders: 95 },
    { category: 'Fruit', sales: 52000, orders: 110 },
    { category: 'Bulk', sales: 65000, orders: 120 },
  ];

  const topCustomers = [
    { name: 'Fresh Express Supermarket', orders: 45, amount: 125000 },
    { name: 'Green Grocery Mart', orders: 38, amount: 98000 },
    { name: 'Farm to Table Co-op', orders: 32, amount: 87500 },
    { name: 'Healthy Eats Restaurant', orders: 28, amount: 65000 },
    { name: 'Corner Store 24/7', orders: 22, amount: 48000 },
  ];

  const reportTypes = [
    {
      title: 'Sales Report',
      description: 'Detailed sales analysis by period',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Inventory Report',
      description: 'Stock levels and movements',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Order Report',
      description: 'Sales and purchase orders summary',
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Financial Report',
      description: 'Revenue, expenses, and profit analysis',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Customer Report',
      description: 'Customer analysis and insights',
      icon: Users,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Tax Report',
      description: 'GST and tax calculations',
      icon: FileText,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-500">
            Generate insights and export business reports
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Report Type Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.title} className="cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg p-3 ${report.bgColor}`}>
                    <Icon className={`h-6 w-6 ${report.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                    <Button variant="ghost" size="sm" className="mt-3 gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales & Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesReportData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#16A34A"
                    strokeWidth={2}
                    name="Sales (₹)"
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Profit (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="category" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="#16A34A" radius={[4, 4, 0, 0]} name="Sales (₹)" />
                  <Bar dataKey="orders" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Customers (This Month)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div
                key={customer.name}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 font-semibold text-green-600">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-sm text-gray-500">{customer.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₹{customer.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Total Sales</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
