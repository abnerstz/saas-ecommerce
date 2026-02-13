/**
 * Mock Data for E-commerce Admin Dashboard
 * 
 * This file contains all mock data structures and sample data used throughout
 * the admin application. It serves as a reference for backend implementation
 * and provides realistic test data for development.
 * 
 * Data Categories:
 * - Core Entities: Products, Customers, Orders
 * - Analytics: Dashboard metrics, sales data, conversion funnel
 * - System Status: Inventory, delivery performance, system health
 */

// =============================================================================
// CORE ENTITY INTERFACES
// =============================================================================

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  cost: number
  stock: number
  sales30d: number
  status: 'active' | 'inactive'
  images?: string[]
  description?: string
  totalValue: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  totalSpent: number
  lastOrder: Date
  purchaseFrequency: number
  status: 'new' | 'recurring' | 'vip' | 'inactive'
  address?: string
  registrationDate: Date
  ltv: number
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage?: string
  quantity: number
  unitPrice: number
  totalPrice: number
  sku?: string
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerId: string
  date: Date
  amount: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  itemCount: number
  items: OrderItem[]
  paymentMethod: string
  shippingAddress?: string
  processingTime?: number
}

// =============================================================================
// ANALYTICS & METRICS INTERFACES
// =============================================================================

export interface DashboardMetrics {
  totalRevenue: number
  previousRevenue: number
  totalOrders: number
  previousOrders: number
  activeProducts: number
  totalCustomers: number
  averageOrderValue: number
  previousAverageOrderValue: number
  conversionRate: number
  previousConversionRate: number
  clv: number
  previousClv: number
  cac: number
  previousCac: number
  grossMargin: number
  previousGrossMargin: number
  retentionRate: number
  previousRetentionRate: number
  npsScore: number
  previousNpsScore: number
}

export interface SalesChannel {
  name: string
  value: number
  percentage: number
  color: string
}

export interface ConversionFunnelStep {
  stage: string
  value: number
  conversionRate: number
}

// =============================================================================
// OPERATIONAL INTERFACES
// =============================================================================

export interface InventoryStatus {
  outOfStock: number
  lowStock: number
  wellStocked: number
}

export interface DeliveryPerformance {
  onTime: number
  averageTime: number
}

export interface CustomerSatisfaction {
  averageRating: number
  totalReviews: number
}

export interface FinancialSummary {
  grossRevenue: number
  costs: number
  netProfit: number
}

export interface RecentActivity {
  id: string
  action: string
  details: string
  timestamp: Date
  type: 'sales' | 'inventory' | 'customer' | 'system'
  color: string
}

export interface CustomerAnalysis {
  activeLast30d: number
  newCustomers: number
  returningCustomers: number
  segments: {
    vip: { count: number; percentage: number }
    premium: { count: number; percentage: number }
    regular: { count: number; percentage: number }
  }
}

export interface MonthlyGoal {
  progress: number
  remaining: number
  target: number
}

export interface PendingTask {
  id: string
  description: string
}

export interface SystemStatus {
  payments: 'online' | 'unstable' | 'offline'
  shipping: 'online' | 'unstable' | 'offline'
  integration: 'online' | 'unstable' | 'offline'
}

// =============================================================================
// CORE ENTITY DATA
// =============================================================================

/**
 * Product catalog with realistic tech products
 * Includes pricing, inventory, and sales performance data
 */
export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    sku: 'IP15PM-001',
    category: 'Smartphones',
    price: 8999.99,
    cost: 6500.00,
    stock: 15,
    sales30d: 45,
    status: 'active',
    images: [
      'https://via.placeholder.com/300x300/000000/FFFFFF?text=iPhone+15+Pro+Max',
      'https://via.placeholder.com/300x300/1a1a1a/FFFFFF?text=iPhone+Side',
      'https://via.placeholder.com/300x300/2a2a2a/FFFFFF?text=iPhone+Back'
    ],
    description: 'iPhone 15 Pro Max with 48MP main camera, A17 Pro chip and 6.7-inch Super Retina XDR display.',
    totalValue: 134999.85
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    sku: 'SGS24U-001',
    category: 'Smartphones',
    price: 7899.99,
    cost: 5800.00,
    stock: 23,
    sales30d: 38,
    status: 'active',
    images: [
      'https://via.placeholder.com/300x300/1f2937/FFFFFF?text=Galaxy+S24+Ultra'
    ],
    description: 'Samsung Galaxy S24 Ultra with integrated S Pen, 200MP camera and Dynamic AMOLED 2X display.',
    totalValue: 181699.77
  },
  {
    id: '3',
    name: 'MacBook Pro M3',
    sku: 'MBP-M3-001',
    category: 'Laptops',
    price: 12999.99,
    cost: 9500.00,
    stock: 8,
    sales30d: 22,
    status: 'active',
    totalValue: 103999.92
  },
  {
    id: '4',
    name: 'AirPods Pro 2',
    sku: 'APP2-001',
    category: 'Accessories',
    price: 1899.99,
    cost: 1200.00,
    stock: 0,
    sales30d: 0,
    status: 'inactive',
    totalValue: 0
  },
  {
    id: '5',
    name: 'Apple Watch Series 9',
    sku: 'AWS9-001',
    category: 'Wearables',
    price: 3999.99,
    cost: 2800.00,
    stock: 12,
    sales30d: 31,
    status: 'active',
    totalValue: 47999.88
  },
  {
    id: '6',
    name: 'iPad Pro 12.9"',
    sku: 'IPP129-001',
    category: 'Tablets',
    price: 8499.99,
    cost: 6000.00,
    stock: 6,
    sales30d: 18,
    status: 'active',
    totalValue: 50999.94
  },
  {
    id: '7',
    name: 'Sony WH-1000XM5',
    sku: 'SWH1000-001',
    category: 'Accessories',
    price: 2299.99,
    cost: 1500.00,
    stock: 18,
    sales30d: 42,
    status: 'active',
    totalValue: 41399.82
  },
  {
    id: '8',
    name: 'Dell XPS 13',
    sku: 'DXP13-001',
    category: 'Laptops',
    price: 7999.99,
    cost: 5500.00,
    stock: 5,
    sales30d: 15,
    status: 'active',
    totalValue: 39999.95
  }
]

/**
 * Customer database with diverse customer profiles
 * Includes spending patterns, loyalty status, and engagement metrics
 */
export const customers: Customer[] = [
  {
    id: '1',
    name: 'John Silva Santos',
    email: 'john.silva@email.com',
    phone: '+1 (555) 123-4567',
    totalSpent: 25780.95,
    lastOrder: new Date('2024-08-29'),
    purchaseFrequency: 3.2,
    status: 'vip',
    registrationDate: new Date('2023-05-15'),
    ltv: 45000.00
  },
  {
    id: '2',
    name: 'Maria Oliveira Costa',
    email: 'maria.oliveira@email.com',
    phone: '+1 (555) 234-5678',
    totalSpent: 8945.50,
    lastOrder: new Date('2024-08-28'),
    purchaseFrequency: 2.1,
    status: 'recurring',
    registrationDate: new Date('2023-08-22'),
    ltv: 18000.00
  },
  {
    id: '3',
    name: 'Peter Lima',
    email: 'peter.lima@email.com',
    phone: '+1 (555) 345-6789',
    totalSpent: 1299.99,
    lastOrder: new Date('2024-08-30'),
    purchaseFrequency: 1.0,
    status: 'new',
    registrationDate: new Date('2024-08-25'),
    ltv: 3500.00
  },
  {
    id: '4',
    name: 'Ana Carolina Sousa',
    email: 'ana.sousa@email.com',
    phone: '+1 (555) 456-7890',
    totalSpent: 15670.30,
    lastOrder: new Date('2024-08-27'),
    purchaseFrequency: 2.8,
    status: 'recurring',
    registrationDate: new Date('2023-11-10'),
    ltv: 28000.00
  },
  {
    id: '5',
    name: 'Carlos Eduardo Ferreira',
    email: 'carlos.ferreira@email.com',
    phone: '+1 (555) 567-8901',
    totalSpent: 890.50,
    lastOrder: new Date('2024-07-15'),
    purchaseFrequency: 0.8,
    status: 'inactive',
    registrationDate: new Date('2023-12-05'),
    ltv: 2500.00
  }
]

/**
 * Order management data with various order statuses
 * Tracks order lifecycle from pending to completion
 */
export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customerName: 'John Silva Santos',
    customerId: '1',
    date: new Date('2024-08-30'),
    amount: 8999.99,
    status: 'pending',
    itemCount: 1,
    items: [
      {
        id: '1-1',
        productId: '1',
        productName: 'iPhone 15 Pro Max',
        productImage: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=iPhone+15+Pro+Max',
        quantity: 1,
        unitPrice: 8999.99,
        totalPrice: 8999.99,
        sku: 'IP15PM-001'
      }
    ],
    paymentMethod: 'Credit Card',
    processingTime: 0
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customerName: 'Maria Oliveira Costa',
    customerId: '2',
    date: new Date('2024-08-29'),
    amount: 1899.99,
    status: 'confirmed',
    itemCount: 1,
    items: [
      {
        id: '2-1',
        productId: '7',
        productName: 'Apple Watch Series 9',
        productImage: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=Apple+Watch+S9',
        quantity: 1,
        unitPrice: 1899.99,
        totalPrice: 1899.99,
        sku: 'AW9-001'
      }
    ],
    paymentMethod: 'PIX',
    processingTime: 2
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customerName: 'Peter Lima',
    customerId: '3',
    date: new Date('2024-08-29'),
    amount: 12999.99,
    status: 'processing',
    itemCount: 1,
    items: [
      {
        id: '3-1',
        productId: '3',
        productName: 'MacBook Pro 14"',
        productImage: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=MacBook+Pro+14',
        quantity: 1,
        unitPrice: 12999.99,
        totalPrice: 12999.99,
        sku: 'MBP14-001'
      }
    ],
    paymentMethod: 'Credit Card',
    processingTime: 24
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customerName: 'Ana Carolina Sousa',
    customerId: '4',
    date: new Date('2024-08-28'),
    amount: 3999.99,
    status: 'shipped',
    itemCount: 1,
    items: [
      {
        id: '4-1',
        productId: '4',
        productName: 'iPad Air',
        productImage: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=iPad+Air',
        quantity: 1,
        unitPrice: 3999.99,
        totalPrice: 3999.99,
        sku: 'IPADAIR-001'
      }
    ],
    paymentMethod: 'Bank Transfer',
    processingTime: 48
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customerName: 'John Silva Santos',
    customerId: '1',
    date: new Date('2024-08-27'),
    amount: 7899.99,
    status: 'delivered',
    itemCount: 1,
    items: [
      {
        id: '5-1',
        productId: '2',
        productName: 'Samsung Galaxy S24 Ultra',
        productImage: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=Galaxy+S24+Ultra',
        quantity: 1,
        unitPrice: 7899.99,
        totalPrice: 7899.99,
        sku: 'SGS24U-001'
      }
    ],
    paymentMethod: 'PIX',
    processingTime: 72
  },
  {
    id: '6',
    orderNumber: 'ORD-2024-006',
    customerName: 'Carlos Eduardo Ferreira',
    customerId: '5',
    date: new Date('2024-08-26'),
    amount: 2689.98,
    status: 'cancelled',
    itemCount: 3,
    items: [
      {
        id: '6-1',
        productId: '8',
        productName: 'AirPods Pro',
        productImage: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=AirPods+Pro',
        quantity: 2,
        unitPrice: 899.99,
        totalPrice: 1799.98,
        sku: 'AIRPODS-PRO'
      },
      {
        id: '6-2',
        productId: '9',
        productName: 'Magic Keyboard',
        productImage: 'https://via.placeholder.com/300x300/000000/FFFFFF?text=Magic+Keyboard',
        quantity: 1,
        unitPrice: 890.00,
        totalPrice: 890.00,
        sku: 'MK-001'
      }
    ],
    paymentMethod: 'Debit Card',
    processingTime: 0
  }
]

// =============================================================================
// ANALYTICS & DASHBOARD DATA
// =============================================================================

/**
 * Main dashboard metrics with current and previous period comparison
 * Used for KPI tracking and performance analysis
 */
export const dashboardMetrics: DashboardMetrics = {
  totalRevenue: 156780.95,
  previousRevenue: 130456.78,
  totalOrders: 2847,
  previousOrders: 2365,
  activeProducts: 1523,
  totalCustomers: 8429,
  averageOrderValue: 456.89,
  previousAverageOrderValue: 423.56,
  conversionRate: 3.2,
  previousConversionRate: 2.8,
  clv: 2450.00,
  previousClv: 2280.00,
  cac: 89.50,
  previousCac: 95.30,
  grossMargin: 35.8,
  previousGrossMargin: 33.2,
  retentionRate: 68.5,
  previousRetentionRate: 64.2,
  npsScore: 72,
  previousNpsScore: 68
}

/**
 * Sales trend data for charts and analytics
 * 12-month historical data for revenue and order tracking
 */
export const salesData = [
  { month: 'Sep 2023', sales: 45230, orders: 1234 },
  { month: 'Oct 2023', sales: 52180, orders: 1456 },
  { month: 'Nov 2023', sales: 48900, orders: 1378 },
  { month: 'Dec 2023', sales: 67800, orders: 1890 },
  { month: 'Jan 2024', sales: 41200, orders: 1123 },
  { month: 'Feb 2024', sales: 55600, orders: 1567 },
  { month: 'Mar 2024', sales: 62300, orders: 1723 },
  { month: 'Apr 2024', sales: 58900, orders: 1634 },
  { month: 'May 2024', sales: 71200, orders: 1945 },
  { month: 'Jun 2024', sales: 68900, orders: 1876 },
  { month: 'Jul 2024', sales: 73500, orders: 2012 },
  { month: 'Aug 2024', sales: 79200, orders: 2156 }
]

/**
 * E-commerce conversion funnel data
 * Tracks user journey from visitor to customer
 */
export const conversionFunnel: ConversionFunnelStep[] = [
  { stage: 'Visitors', value: 50000, conversionRate: 100 },
  { stage: 'Added to Cart', value: 8500, conversionRate: 17 },
  { stage: 'Started Checkout', value: 4250, conversionRate: 8.5 },
  { stage: 'Completed Purchase', value: 1600, conversionRate: 3.2 },
  { stage: 'Cancellations', value: 96, conversionRate: 0.19 }
]

// =============================================================================
// REFERENCE DATA & CONSTANTS
// =============================================================================

/**
 * Product categories for classification and filtering
 */
export const categories = [
  'Smartphones',
  'Laptops',
  'Tablets',
  'Accessories',
  'Wearables',
  'Audio',
  'Gaming',
  'Smart Home'
]

/**
 * Available order statuses for order management
 */
export const orderStatuses = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
]

/**
 * Supported payment methods
 */
export const paymentMethods = [
  'PIX',
  'Credit Card',
  'Debit Card',
  'Bank Transfer',
  'Cryptocurrency'
]

// =============================================================================
// OPERATIONAL DATA
// =============================================================================

/**
 * Sales channel performance data
 * Shows revenue distribution across different sales channels
 */
export const salesChannels: SalesChannel[] = [
  { name: 'E-commerce', value: 134680.45, percentage: 85.8, color: '#3b82f6' },
  { name: 'Physical Store', value: 22100.50, percentage: 14.2, color: '#f59e0b' }
]

/**
 * Current inventory status across all products
 */
export const inventoryStatus: InventoryStatus = {
  outOfStock: 12,
  lowStock: 34,
  wellStocked: 1477
}

/**
 * Delivery performance metrics
 */
export const deliveryPerformance: DeliveryPerformance = {
  onTime: 87.5,
  averageTime: 3.2
}

/**
 * Customer satisfaction metrics
 */
export const customerSatisfaction: CustomerSatisfaction = {
  averageRating: 4.3,
  totalReviews: 2847
}

/**
 * Financial summary for profit/loss analysis
 */
export const financialSummary: FinancialSummary = {
  grossRevenue: 156780.95,
  costs: 89234.50,
  netProfit: 67546.45
}

/**
 * Recent system activity feed
 * Shows real-time updates across different business areas
 */
export const recentActivity: RecentActivity[] = [
  {
    id: '1',
    action: 'New sale completed',
    details: 'iPhone 15 Pro Max - $8,999.99',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: 'sales',
    color: 'text-green-600'
  },
  {
    id: '2',
    action: 'Product out of stock',
    details: 'AirPods Pro 2 - Stock depleted',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    type: 'inventory',
    color: 'text-red-600'
  },
  {
    id: '3',
    action: 'New customer registered',
    details: 'Maria Silva Santos',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    type: 'customer',
    color: 'text-blue-600'
  },
  {
    id: '4',
    action: 'System backup completed',
    details: 'Automated backup finished successfully',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    type: 'system',
    color: 'text-gray-600'
  },
  {
    id: '5',
    action: 'Order cancelled',
    details: 'ORD-2024-007 - $1,299.99',
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    type: 'sales',
    color: 'text-yellow-600'
  }
]

/**
 * Customer base analysis and segmentation
 */
export const customerAnalysis: CustomerAnalysis = {
  activeLast30d: 1247,
  newCustomers: 189,
  returningCustomers: 856,
  segments: {
    vip: { count: 425, percentage: 15.8 },
    premium: { count: 892, percentage: 33.2 },
    regular: { count: 1372, percentage: 51.0 }
  }
}

/**
 * Monthly sales goal tracking
 */
export const monthlyGoal: MonthlyGoal = {
  progress: 78.5,
  remaining: 43219.05,
  target: 200000.00
}

/**
 * Pending tasks requiring attention
 */
export const pendingTasks: PendingTask[] = [
  { id: '1', description: 'Review pending orders (15)' },
  { id: '2', description: 'Update Smartphones category pricing' },
  { id: '3', description: 'Respond to negative reviews (3)' }
]

/**
 * System health monitoring
 */
export const systemStatus: SystemStatus = {
  payments: 'online',
  shipping: 'online',
  integration: 'unstable'
}
