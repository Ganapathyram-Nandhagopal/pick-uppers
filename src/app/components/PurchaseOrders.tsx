import { useState } from 'react';
import {
  Search,
  Plus,
  Download,
  Eye,
  Package,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { purchaseOrdersData } from '../lib/mockData';

export function PurchaseOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredData = purchaseOrdersData.filter((order) => {
    const matchesSearch =
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vegetableType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Received':
        return {
          color: 'bg-green-50 text-green-700 border-green-200',
          icon: CheckCircle,
        };
      case 'Pending':
        return {
          color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
          icon: Clock,
        };
      case 'Cancelled':
        return {
          color: 'bg-red-50 text-red-700 border-red-200',
          icon: XCircle,
        };
      default:
        return {
          color: 'bg-gray-50 text-gray-700 border-gray-200',
          icon: Clock,
        };
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Purchase Orders</h1>
          <p className="text-sm text-gray-500">Manage supplier orders and inventory restocking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4" />
            New Purchase Order
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by supplier, order number, or vegetable..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Received">Received</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Table View */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Details</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Vegetable</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((order) => {
                const statusConfig = getStatusConfig(order.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{order.orderNumber}</p>
                        <p className="text-sm text-gray-500">
                          Ordered: {new Date(order.orderedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {order.supplier}
                    </TableCell>
                    <TableCell className="text-gray-700">{order.vegetableType}</TableCell>
                    <TableCell>
                      <p className="font-medium text-gray-900">{order.quantity} kg</p>
                      <p className="text-sm text-gray-500">@ ₹{order.pricePerKg}/kg</p>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      ₹{order.totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {new Date(order.expectedDelivery).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${statusConfig.color.split(' ')[1]}`} />
                        <Badge className={statusConfig.color}>{order.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {filteredData.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;
          return (
            <Card key={order.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{order.orderNumber}</h3>
                        <p className="text-sm text-gray-500">{order.supplier}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <StatusIcon className={`h-4 w-4 ${statusConfig.color.split(' ')[1]}`} />
                      <Badge className={statusConfig.color}>{order.status}</Badge>
                    </div>
                  </div>

                  {/* Vegetable & Quantity */}
                  <div className="rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Vegetable</p>
                        <p className="font-medium text-gray-900">{order.vegetableType}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {order.quantity} kg
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Price per kg</p>
                      <p className="font-medium text-gray-900">₹{order.pricePerKg}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Amount</p>
                      <p className="font-medium text-green-600">
                        ₹{order.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ordered Date</p>
                      <p className="text-sm text-gray-900">
                        {new Date(order.orderedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Expected Delivery</p>
                      <p className="text-sm text-gray-900">
                        {new Date(order.expectedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button variant="outline" className="w-full gap-2">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
