import {
  TrendingUp,
  Package,
  Truck,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getKPIs, salesTrendData, stockByCategory, inventoryData, salesOrdersData } from '../lib/mockData';
import { Link } from 'react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function Dashboard() {
  const kpis = getKPIs();

  useEffect(() => {
    // Welcome toast on first load
    const hasSeenWelcome = sessionStorage.getItem('welcomeShown');
    if (!hasSeenWelcome) {
      toast.success('Welcome to FreshVeg ERP!', {
        description: 'Your vegetable supplier management system is ready.',
      });
      sessionStorage.setItem('welcomeShown', 'true');
    }
  }, []);

  const kpiCards = [
    {
      title: "Today's Sales",
      value: `₹${kpis.todaysSales.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Pending Deliveries',
      value: kpis.pendingDeliveries,
      subtitle: 'orders',
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Low Stock Items',
      value: kpis.lowStockItems,
      subtitle: 'items',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      alert: kpis.lowStockItems > 0,
    },
    {
      title: 'Outstanding Payments',
      value: `₹${kpis.outstandingPayments.toLocaleString()}`,
      change: '-5.2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const lowStockItems = inventoryData.filter(item => item.quantity < item.reorderLevel);
  const recentOrders = salesOrdersData.slice(0, 5);

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back! Here's your business overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            New Sales Order
          </Button>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4" />
            New Purchase Order
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{kpi.title}</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <h3 className="text-2xl font-semibold text-gray-900">{kpi.value}</h3>
                      {kpi.subtitle && (
                        <span className="text-sm text-gray-500">{kpi.subtitle}</span>
                      )}
                    </div>
                    {kpi.change && (
                      <div className="mt-1 flex items-center gap-1 text-sm">
                        {kpi.trend === 'up' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-green-600" />
                        )}
                        <span className="text-green-600">{kpi.change}</span>
                        <span className="text-gray-500">vs last week</span>
                      </div>
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${kpi.bgColor}`}>
                    <Icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Sales Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#16A34A"
                    strokeWidth={2}
                    dot={{ fill: '#16A34A', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stock by Category Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Stock Status by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockByCategory}>
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
                  <Bar dataKey="inStock" fill="#16A34A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="lowStock" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-600"></div>
                <span className="text-gray-600">In Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                <span className="text-gray-600">Low Stock</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Low Stock Alert</CardTitle>
            <Link to="/inventory">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                      <Package className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-orange-600">
                      {item.quantity} {item.unit}
                    </p>
                    <p className="text-xs text-gray-500">
                      Reorder: {item.reorderLevel} {item.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link to="/sales-orders">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-500">{order.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        order.status === 'Delivered'
                          ? 'bg-green-50 text-green-700'
                          : order.status === 'Out for Delivery'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      {order.status}
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      ₹{order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}