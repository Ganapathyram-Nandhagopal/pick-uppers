import { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  AlertCircle,
  Loader2,
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
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function Finance() {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/finance')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center text-red-500 flex flex-col items-center gap-2">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <p>Error loading finance data: {error}</p>
        </div>
      </div>
    );
  }

  const {
    records,
    receivables,
    payables,
    totals: { totalReceivable, totalPayable, receivablePaid, receivableOverdue },
    receivableChartData,
    payableChartData,
  } = data;

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
    <div className="space-y-6 p-4 lg:p-6 w-full overflow-x-hidden">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Finance Overview</h1>
          <p className="text-sm text-gray-500">
            Track receivables, payables, and cash flow
          </p>
        </div>
        <Button variant="outline" className="gap-2 self-start sm:self-auto">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 truncate">Total Receivable</p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                  ₹{totalReceivable.toLocaleString()}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="truncate">+8.2% from last month</span>
                </div>
              </div>
              <div className="rounded-lg bg-green-50 p-3 shrink-0">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 truncate">Total Payable</p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                  ₹{totalPayable.toLocaleString()}
                </h3>
                <div className="mt-1 flex items-center gap-1 text-sm text-red-600">
                  <ArrowDownRight className="h-4 w-4" />
                  <span className="truncate">-3.1% from last month</span>
                </div>
              </div>
              <div className="rounded-lg bg-red-50 p-3 shrink-0">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 truncate">Collected</p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                  ₹{receivablePaid.toLocaleString()}
                </h3>
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {((receivablePaid / totalReceivable) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 shrink-0">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 truncate">Overdue</p>
                <h3 className="mt-2 text-2xl font-semibold text-red-600">
                  ₹{receivableOverdue.toLocaleString()}
                </h3>
                <p className="mt-1 text-sm text-gray-500 truncate">Requires attention</p>
              </div>
              <div className="rounded-lg bg-orange-50 p-3 shrink-0">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="truncate">Accounts Receivable Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-64 sm:h-72 lg:h-80 min-h-[16rem]">
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
                    {receivableChartData.map((entry: any, index: number) => (
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

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="truncate">Accounts Payable Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-64 sm:h-72 lg:h-80 min-h-[16rem]">
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
                    {payableChartData.map((entry: any, index: number) => (
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
        <CardContent className="p-0 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b px-4 sm:px-6 pt-4 sm:pt-6 overflow-x-auto no-scrollbar">
              <TabsList className="w-full justify-start md:w-auto h-auto bg-transparent p-0 flex gap-2 sm:gap-4 mb-2">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-4 py-2"
                >
                  All Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="receivable"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-4 py-2"
                >
                  Receivables
                </TabsTrigger>
                <TabsTrigger
                  value="payable"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-4 py-2"
                >
                  Payables
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-0 m-0">
              <div className="w-full overflow-x-auto">
                <Table className="min-w-[600px]">
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
                    {records.map((record: any) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                          {record.invoiceNumber}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              record.type === 'Receivable'
                                ? 'border-green-200 text-green-700 whitespace-nowrap'
                                : 'border-blue-200 text-blue-700 whitespace-nowrap'
                            }
                          >
                            {record.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700 whitespace-nowrap">{record.party}</TableCell>
                        <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                          ₹{record.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-700 whitespace-nowrap">
                          {new Date(record.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status) + ' whitespace-nowrap'}>
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="receivable" className="p-0 m-0">
              <div className="w-full overflow-x-auto">
                <Table className="min-w-[500px]">
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
                    {receivables.map((record: any) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                          {record.invoiceNumber}
                        </TableCell>
                        <TableCell className="text-gray-700 whitespace-nowrap">{record.party}</TableCell>
                        <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                          ₹{record.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-700 whitespace-nowrap">
                          {new Date(record.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status) + ' whitespace-nowrap'}>
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="payable" className="p-0 m-0">
              <div className="w-full overflow-x-auto">
                <Table className="min-w-[500px]">
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
                    {payables.map((record: any) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                          {record.invoiceNumber}
                        </TableCell>
                        <TableCell className="text-gray-700 whitespace-nowrap">{record.party}</TableCell>
                        <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                          ₹{record.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-700 whitespace-nowrap">
                          {new Date(record.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(record.status) + ' whitespace-nowrap'}>
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
