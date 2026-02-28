import { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { financeData } from '../lib/mockData';

export function Finance() {
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate totals
  const receivables = financeData.filter(r => r.type === 'Receivable');
  const payables = financeData.filter(r => r.type === 'Payable');

  const totalReceivable = receivables.reduce((sum, r) => sum + r.amount, 0);
  const totalPayable = payables.reduce((sum, r) => sum + r.amount, 0);
  
  const receivablePaid = receivables
    .filter(r => r.status === 'Paid')
    .reduce((sum, r) => sum + r.amount, 0);
  const receivablePending = receivables
    .filter(r => r.status === 'Pending')
    .reduce((sum, r) => sum + r.amount, 0);
  const receivableOverdue = receivables
    .filter(r => r.status === 'Overdue')
    .reduce((sum, r) => sum + r.amount, 0);

  const payablePaid = payables
    .filter(r => r.status === 'Paid')
    .reduce((sum, r) => sum + r.amount, 0);
  const payablePending = payables
    .filter(r => r.status === 'Pending')
    .reduce((sum, r) => sum + r.amount, 0);

  const receivableChartData = [
    { name: 'Collected', value: receivablePaid, color: '#16A34A' },
    { name: 'Pending', value: receivablePending, color: '#F59E0B' },
    { name: 'Overdue', value: receivableOverdue, color: '#EF4444' },
  ];

  const payableChartData = [
    { name: 'Paid', value: payablePaid, color: '#16A34A' },
    { name: 'Pending', value: payablePending, color: '#F59E0B' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-50 text-green-700';
      case 'Pending':
        return 'bg-yellow-50 text-yellow-700';
      case 'Overdue':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Finance Overview</h1>
          <p className="text-sm text-gray-500">
            Track receivables, payables, and cash flow
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Receivable</p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                  ₹{totalReceivable.toLocaleString()}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+8.2% from last month</span>
                </div>
              </div>
              <div className="rounded-lg bg-green-50 p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Payable</p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                  ₹{totalPayable.toLocaleString()}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                  <ArrowDownRight className="h-4 w-4" />
                  <span>-3.1% from last month</span>
                </div>
              </div>
              <div className="rounded-lg bg-red-50 p-3">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Collected</p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                  ₹{receivablePaid.toLocaleString()}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {((receivablePaid / totalReceivable) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <h3 className="mt-2 text-2xl font-semibold text-red-600">
                  ₹{receivableOverdue.toLocaleString()}
                </h3>
                <p className="mt-1 text-sm text-gray-500">Requires attention</p>
              </div>
              <div className="rounded-lg bg-orange-50 p-3">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Accounts Receivable Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={receivableChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {receivableChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accounts Payable Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={payableChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {payableChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b px-6 pt-6">
              <TabsList>
                <TabsTrigger value="overview">All Transactions</TabsTrigger>
                <TabsTrigger value="receivable">Receivables</TabsTrigger>
                <TabsTrigger value="payable">Payables</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice/Bill</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Party</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financeData.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium text-gray-900">
                          {record.invoiceNumber}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              record.type === 'Receivable'
                                ? 'border-green-200 text-green-700'
                                : 'border-blue-200 text-blue-700'
                            }
                          >
                            {record.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">{record.party}</TableCell>
                        <TableCell className="font-medium text-gray-900">
                          ₹{record.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {new Date(record.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="receivable" className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receivables.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium text-gray-900">
                          {record.invoiceNumber}
                        </TableCell>
                        <TableCell className="text-gray-700">{record.party}</TableCell>
                        <TableCell className="font-medium text-gray-900">
                          ₹{record.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {new Date(record.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="payable" className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bill</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payables.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium text-gray-900">
                          {record.invoiceNumber}
                        </TableCell>
                        <TableCell className="text-gray-700">{record.party}</TableCell>
                        <TableCell className="font-medium text-gray-900">
                          ₹{record.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {new Date(record.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
