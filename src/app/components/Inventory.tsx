import { useState } from 'react';
import {
  Search,
  Filter,
  Package,
  Plus,
  Download,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
import { inventoryData } from '../lib/mockData';

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [warehouseFilter, setWarehouseFilter] = useState<string>('all');

  const filteredData = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesWarehouse = warehouseFilter === 'all' || item.warehouse === warehouseFilter;
    return matchesSearch && matchesCategory && matchesWarehouse;
  });

  const getFreshnessColor = (freshness: string) => {
    switch (freshness) {
      case 'Fresh':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Good':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Fair':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Expiring':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const isLowStock = (item: typeof inventoryData[0]) => item.quantity < item.reorderLevel;

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
          <p className="text-sm text-gray-500">
            Track and manage your vegetable stock levels
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search vegetables or suppliers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Leafy">Leafy</SelectItem>
                <SelectItem value="Root">Root</SelectItem>
                <SelectItem value="Fruit">Fruit</SelectItem>
                <SelectItem value="Bulk">Bulk</SelectItem>
              </SelectContent>
            </Select>
            <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Warehouses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Warehouses</SelectItem>
                <SelectItem value="Main Warehouse">Main Warehouse</SelectItem>
                <SelectItem value="Cold Storage">Cold Storage</SelectItem>
                <SelectItem value="Dry Storage">Dry Storage</SelectItem>
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
                <TableHead>Vegetable</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Freshness</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Price/kg</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.supplier}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">{item.warehouse}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.quantity} {item.unit}
                      </p>
                      <p className="text-xs text-gray-500">
                        Reorder: {item.reorderLevel} {item.unit}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getFreshnessColor(item.freshness)}>
                      {item.freshness}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    ₹{item.pricePerKg}
                  </TableCell>
                  <TableCell>
                    {isLowStock(item) ? (
                      <div className="flex items-center gap-1 text-orange-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Low Stock</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">In Stock</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {filteredData.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.supplier}</p>
                    </div>
                  </div>
                  {isLowStock(item) ? (
                    <Badge className="bg-orange-50 text-orange-700">Low Stock</Badge>
                  ) : (
                    <Badge className="bg-green-50 text-green-700">In Stock</Badge>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3">
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">{item.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Warehouse</p>
                    <p className="font-medium text-gray-900">{item.warehouse}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Quantity</p>
                    <p className="text-lg font-semibold text-green-600">
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Price/kg</p>
                    <p className="font-medium text-gray-900">₹{item.pricePerKg}</p>
                  </div>
                </div>

                {/* Freshness and Expiry */}
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className={getFreshnessColor(item.freshness)}>
                      {item.freshness}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Expires</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
