// Mock data for the Vegetable Supplier ERP System

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Leafy' | 'Root' | 'Fruit' | 'Bulk';
  warehouse: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  freshness: 'Fresh' | 'Good' | 'Fair' | 'Expiring';
  expiryDate: string;
  pricePerKg: number;
  supplier: string;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  deliveryDate: string;
  status: 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  items: {
    vegetable: string;
    quantity: number;
    pricePerKg: number;
    total: number;
  }[];
  totalAmount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  deliveryAddress: string;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: string;
  vegetableType: string;
  quantity: number;
  pricePerKg: number;
  totalAmount: number;
  expectedDelivery: string;
  status: 'Pending' | 'Received' | 'Cancelled';
  orderedDate: string;
}

export interface FinanceRecord {
  id: string;
  type: 'Receivable' | 'Payable';
  party: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  invoiceNumber: string;
}

export const inventoryData: InventoryItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    category: 'Fruit',
    warehouse: 'Main Warehouse',
    quantity: 450,
    unit: 'kg',
    reorderLevel: 200,
    freshness: 'Fresh',
    expiryDate: '2026-03-05',
    pricePerKg: 35,
    supplier: 'Fresh Farms Co.',
  },
  {
    id: '2',
    name: 'Spinach',
    category: 'Leafy',
    warehouse: 'Cold Storage',
    quantity: 85,
    unit: 'kg',
    reorderLevel: 100,
    freshness: 'Good',
    expiryDate: '2026-02-28',
    pricePerKg: 45,
    supplier: 'Green Leaf Suppliers',
  },
  {
    id: '3',
    name: 'Carrots',
    category: 'Root',
    warehouse: 'Main Warehouse',
    quantity: 620,
    unit: 'kg',
    reorderLevel: 300,
    freshness: 'Fresh',
    expiryDate: '2026-03-15',
    pricePerKg: 30,
    supplier: 'Root Harvest Ltd.',
  },
  {
    id: '4',
    name: 'Potatoes',
    category: 'Bulk',
    warehouse: 'Main Warehouse',
    quantity: 1850,
    unit: 'kg',
    reorderLevel: 500,
    freshness: 'Fresh',
    expiryDate: '2026-04-20',
    pricePerKg: 22,
    supplier: 'Bulk Veggie Mart',
  },
  {
    id: '5',
    name: 'Lettuce',
    category: 'Leafy',
    warehouse: 'Cold Storage',
    quantity: 45,
    unit: 'kg',
    reorderLevel: 80,
    freshness: 'Expiring',
    expiryDate: '2026-02-26',
    pricePerKg: 55,
    supplier: 'Green Leaf Suppliers',
  },
  {
    id: '6',
    name: 'Bell Peppers',
    category: 'Fruit',
    warehouse: 'Main Warehouse',
    quantity: 280,
    unit: 'kg',
    reorderLevel: 150,
    freshness: 'Good',
    expiryDate: '2026-03-08',
    pricePerKg: 65,
    supplier: 'Fresh Farms Co.',
  },
  {
    id: '7',
    name: 'Onions',
    category: 'Bulk',
    warehouse: 'Dry Storage',
    quantity: 1200,
    unit: 'kg',
    reorderLevel: 400,
    freshness: 'Fresh',
    expiryDate: '2026-05-01',
    pricePerKg: 28,
    supplier: 'Bulk Veggie Mart',
  },
  {
    id: '8',
    name: 'Cabbage',
    category: 'Leafy',
    warehouse: 'Cold Storage',
    quantity: 180,
    unit: 'kg',
    reorderLevel: 100,
    freshness: 'Fresh',
    expiryDate: '2026-03-10',
    pricePerKg: 32,
    supplier: 'Green Leaf Suppliers',
  },
  {
    id: '9',
    name: 'Cucumbers',
    category: 'Fruit',
    warehouse: 'Cold Storage',
    quantity: 65,
    unit: 'kg',
    reorderLevel: 120,
    freshness: 'Fair',
    expiryDate: '2026-02-27',
    pricePerKg: 40,
    supplier: 'Fresh Farms Co.',
  },
  {
    id: '10',
    name: 'Beetroot',
    category: 'Root',
    warehouse: 'Main Warehouse',
    quantity: 340,
    unit: 'kg',
    reorderLevel: 200,
    freshness: 'Good',
    expiryDate: '2026-03-12',
    pricePerKg: 38,
    supplier: 'Root Harvest Ltd.',
  },
];

export const salesOrdersData: SalesOrder[] = [
  {
    id: 'SO001',
    orderNumber: 'SO-2026-001',
    customerName: 'Green Grocery Mart',
    deliveryDate: '2026-02-26',
    status: 'Out for Delivery',
    items: [
      { vegetable: 'Tomatoes', quantity: 50, pricePerKg: 40, total: 2000 },
      { vegetable: 'Potatoes', quantity: 100, pricePerKg: 25, total: 2500 },
      { vegetable: 'Onions', quantity: 75, pricePerKg: 30, total: 2250 },
    ],
    totalAmount: 6750,
    paymentStatus: 'Pending',
    deliveryAddress: '123 Market Street, City Center',
  },
  {
    id: 'SO002',
    orderNumber: 'SO-2026-002',
    customerName: 'Fresh Express Supermarket',
    deliveryDate: '2026-02-27',
    status: 'Preparing',
    items: [
      { vegetable: 'Spinach', quantity: 30, pricePerKg: 50, total: 1500 },
      { vegetable: 'Lettuce', quantity: 20, pricePerKg: 60, total: 1200 },
      { vegetable: 'Bell Peppers', quantity: 40, pricePerKg: 70, total: 2800 },
    ],
    totalAmount: 5500,
    paymentStatus: 'Paid',
    deliveryAddress: '456 Shopping Boulevard, North District',
  },
  {
    id: 'SO003',
    orderNumber: 'SO-2026-003',
    customerName: 'Healthy Eats Restaurant',
    deliveryDate: '2026-02-25',
    status: 'Delivered',
    items: [
      { vegetable: 'Carrots', quantity: 25, pricePerKg: 35, total: 875 },
      { vegetable: 'Cucumbers', quantity: 15, pricePerKg: 45, total: 675 },
    ],
    totalAmount: 1550,
    paymentStatus: 'Paid',
    deliveryAddress: '789 Food Street, Downtown',
  },
  {
    id: 'SO004',
    orderNumber: 'SO-2026-004',
    customerName: 'Corner Store 24/7',
    deliveryDate: '2026-02-28',
    status: 'Preparing',
    items: [
      { vegetable: 'Cabbage', quantity: 35, pricePerKg: 35, total: 1225 },
      { vegetable: 'Beetroot', quantity: 20, pricePerKg: 42, total: 840 },
    ],
    totalAmount: 2065,
    paymentStatus: 'Pending',
    deliveryAddress: '321 Neighborhood Ave, West End',
  },
  {
    id: 'SO005',
    orderNumber: 'SO-2026-005',
    customerName: 'Farm to Table Co-op',
    deliveryDate: '2026-02-24',
    status: 'Delivered',
    items: [
      { vegetable: 'Tomatoes', quantity: 80, pricePerKg: 40, total: 3200 },
      { vegetable: 'Onions', quantity: 60, pricePerKg: 30, total: 1800 },
      { vegetable: 'Potatoes', quantity: 120, pricePerKg: 25, total: 3000 },
    ],
    totalAmount: 8000,
    paymentStatus: 'Overdue',
    deliveryAddress: '555 Co-op Lane, Eastside',
  },
];

export const purchaseOrdersData: PurchaseOrder[] = [
  {
    id: 'PO001',
    orderNumber: 'PO-2026-001',
    supplier: 'Fresh Farms Co.',
    vegetableType: 'Tomatoes',
    quantity: 500,
    pricePerKg: 32,
    totalAmount: 16000,
    expectedDelivery: '2026-03-01',
    status: 'Pending',
    orderedDate: '2026-02-20',
  },
  {
    id: 'PO002',
    orderNumber: 'PO-2026-002',
    supplier: 'Green Leaf Suppliers',
    vegetableType: 'Spinach',
    quantity: 200,
    pricePerKg: 42,
    totalAmount: 8400,
    expectedDelivery: '2026-02-28',
    status: 'Pending',
    orderedDate: '2026-02-22',
  },
  {
    id: 'PO003',
    orderNumber: 'PO-2026-003',
    supplier: 'Bulk Veggie Mart',
    vegetableType: 'Potatoes',
    quantity: 1000,
    pricePerKg: 20,
    totalAmount: 20000,
    expectedDelivery: '2026-02-27',
    status: 'Received',
    orderedDate: '2026-02-18',
  },
  {
    id: 'PO004',
    orderNumber: 'PO-2026-004',
    supplier: 'Root Harvest Ltd.',
    vegetableType: 'Carrots',
    quantity: 400,
    pricePerKg: 28,
    totalAmount: 11200,
    expectedDelivery: '2026-03-03',
    status: 'Pending',
    orderedDate: '2026-02-23',
  },
];

export const financeData: FinanceRecord[] = [
  {
    id: 'FIN001',
    type: 'Receivable',
    party: 'Green Grocery Mart',
    amount: 6750,
    dueDate: '2026-03-01',
    status: 'Pending',
    invoiceNumber: 'INV-001',
  },
  {
    id: 'FIN002',
    type: 'Receivable',
    party: 'Farm to Table Co-op',
    amount: 8000,
    dueDate: '2026-02-24',
    status: 'Overdue',
    invoiceNumber: 'INV-002',
  },
  {
    id: 'FIN003',
    type: 'Receivable',
    party: 'Fresh Express Supermarket',
    amount: 5500,
    dueDate: '2026-02-28',
    status: 'Paid',
    invoiceNumber: 'INV-003',
  },
  {
    id: 'FIN004',
    type: 'Payable',
    party: 'Fresh Farms Co.',
    amount: 16000,
    dueDate: '2026-03-08',
    status: 'Pending',
    invoiceNumber: 'BILL-001',
  },
  {
    id: 'FIN005',
    type: 'Payable',
    party: 'Green Leaf Suppliers',
    amount: 8400,
    dueDate: '2026-03-05',
    status: 'Pending',
    invoiceNumber: 'BILL-002',
  },
  {
    id: 'FIN006',
    type: 'Payable',
    party: 'Bulk Veggie Mart',
    amount: 20000,
    dueDate: '2026-03-01',
    status: 'Paid',
    invoiceNumber: 'BILL-003',
  },
  {
    id: 'FIN007',
    type: 'Receivable',
    party: 'Corner Store 24/7',
    amount: 2065,
    dueDate: '2026-03-05',
    status: 'Pending',
    invoiceNumber: 'INV-004',
  },
];

// KPI calculations
export const getKPIs = () => {
  const todaysSales = salesOrdersData
    .filter(order => order.deliveryDate === '2026-02-25' && order.status === 'Delivered')
    .reduce((sum, order) => sum + order.totalAmount, 0);
  
  const pendingDeliveries = salesOrdersData.filter(
    order => order.status === 'Out for Delivery' || order.status === 'Preparing'
  ).length;
  
  const lowStockItems = inventoryData.filter(
    item => item.quantity < item.reorderLevel
  ).length;
  
  const outstandingPayments = financeData
    .filter(record => record.type === 'Receivable' && record.status !== 'Paid')
    .reduce((sum, record) => sum + record.amount, 0);

  return {
    todaysSales,
    pendingDeliveries,
    lowStockItems,
    outstandingPayments,
  };
};

// Sales trend data for chart
export const salesTrendData = [
  { day: 'Mon', sales: 12500 },
  { day: 'Tue', sales: 15800 },
  { day: 'Wed', sales: 18200 },
  { day: 'Thu', sales: 14600 },
  { day: 'Fri', sales: 21400 },
  { day: 'Sat', sales: 19800 },
  { day: 'Sun', sales: 16900 },
];

// Stock status by category
export const stockByCategory = [
  { category: 'Leafy', inStock: 310, lowStock: 45 },
  { category: 'Root', inStock: 960, lowStock: 0 },
  { category: 'Fruit', inStock: 730, lowStock: 65 },
  { category: 'Bulk', inStock: 3050, lowStock: 0 },
];
