# Mock Data Documentation

This document provides a comprehensive overview of the mock data structure used in the e-commerce admin dashboard. It serves as a reference for backend implementation and explains the relationships between different data entities.

## 📋 Table of Contents

- [Overview](#overview)
- [Core Entities](#core-entities)
- [Analytics & Metrics](#analytics--metrics)
- [Operational Data](#operational-data)
- [Reference Data](#reference-data)
- [Data Relationships](#data-relationships)
- [Backend Implementation Guide](#backend-implementation-guide)

## 🎯 Overview

The mock data is organized into four main categories:

1. **Core Entities**: Products, Customers, Orders
2. **Analytics & Metrics**: Dashboard KPIs, sales data, conversion metrics
3. **Operational Data**: Inventory status, delivery performance, system health
4. **Reference Data**: Categories, statuses, payment methods

## 🏗️ Core Entities

### Product Interface

```typescript
interface Product {
  id: string              // Unique identifier
  name: string           // Product display name
  sku: string            // Stock keeping unit
  category: string       // Product category
  price: number          // Selling price
  cost: number           // Cost price
  stock: number          // Current inventory level
  sales30d: number       // Sales in last 30 days
  status: 'active' | 'inactive'
  images?: string[]      // Product image URLs
  description?: string   // Product description
  totalValue: number     // Total inventory value (stock × price)
}
```

**Key Features:**
- Tracks inventory levels and sales performance
- Supports multiple product images
- Calculates total inventory value automatically
- Status management for active/inactive products

### Customer Interface

```typescript
interface Customer {
  id: string                    // Unique identifier
  name: string                 // Full customer name
  email: string                // Email address
  phone?: string               // Phone number (optional)
  totalSpent: number           // Lifetime spending
  lastOrder: Date              // Date of last order
  purchaseFrequency: number    // Average orders per month
  status: 'new' | 'recurring' | 'vip' | 'inactive'
  address?: string             // Shipping address
  registrationDate: Date       // Account creation date
  ltv: number                  // Customer lifetime value
}
```

**Key Features:**
- Customer segmentation (new, recurring, VIP, inactive)
- Lifetime value tracking
- Purchase behavior analytics
- Registration and engagement tracking

### Order Interface

```typescript
interface Order {
  id: string                   // Unique identifier
  orderNumber: string          // Human-readable order number
  customerName: string         // Customer display name
  customerId: string          // Reference to customer
  date: Date                  // Order date
  amount: number              // Order total
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  itemCount: number           // Number of items
  paymentMethod: string       // Payment method used
  shippingAddress?: string    // Delivery address
  processingTime?: number     // Hours to process
}
```

**Key Features:**
- Complete order lifecycle tracking
- Customer relationship mapping
- Payment method tracking
- Processing time analytics

## 📊 Analytics & Metrics

### Dashboard Metrics

The `DashboardMetrics` interface provides comprehensive KPI tracking with period-over-period comparison:

- **Revenue Metrics**: Total revenue, previous period comparison
- **Order Metrics**: Order count, growth tracking
- **Customer Metrics**: CLV, CAC, retention rates
- **Performance Metrics**: Conversion rates, NPS scores, gross margins

### Sales Data

Time-series data for revenue and order tracking over 12 months, supporting:
- Trend analysis
- Seasonal pattern identification
- Growth rate calculations
- Performance forecasting

### Conversion Funnel

E-commerce funnel tracking from visitor to customer:
1. **Visitors**: Total site traffic
2. **Added to Cart**: Shopping intent
3. **Started Checkout**: Purchase intent
4. **Completed Purchase**: Conversion
5. **Cancellations**: Refund tracking

## 🔧 Operational Data

### Inventory Management

- **Stock Levels**: Out of stock, low stock, well-stocked counts
- **Automated Alerts**: Low inventory notifications
- **Value Tracking**: Total inventory value calculations

### Performance Monitoring

- **Delivery Performance**: On-time delivery rates, average delivery time
- **Customer Satisfaction**: Rating averages, review counts
- **Financial Summary**: Revenue, costs, profit margins

### System Health

Real-time monitoring of critical systems:
- **Payment Processing**: Online/unstable/offline status
- **Shipping Integration**: Carrier API status
- **Third-party Integration**: External service health

## 📚 Reference Data

### Categories
Standard product categories for classification and filtering.

### Order Statuses
Complete order lifecycle states for status management.

### Payment Methods
Supported payment options for transaction processing.

## 🔗 Data Relationships

### Customer ↔ Order Relationship
```
Customer (1) ←→ (Many) Orders
- customerId in Order references Customer.id
- Customer.totalSpent aggregates Order.amount
- Customer.lastOrder tracks most recent Order.date
```

### Product ↔ Category Relationship
```
Category (1) ←→ (Many) Products
- Product.category references category name
- Categories used for filtering and organization
```

### Order ↔ Payment Method Relationship
```
PaymentMethod (1) ←→ (Many) Orders
- Order.paymentMethod references payment method name
- Used for payment analytics and processing
```

## 🚀 Backend Implementation Guide

### Database Schema Recommendations

1. **Primary Tables**:
   - `products` - Core product information
   - `customers` - Customer profiles and preferences
   - `orders` - Order transactions and status
   - `categories` - Product categorization

2. **Analytics Tables**:
   - `sales_metrics` - Daily/monthly aggregated data
   - `customer_analytics` - Customer behavior tracking
   - `inventory_snapshots` - Historical inventory levels

3. **System Tables**:
   - `system_status` - Health monitoring
   - `activity_log` - Audit trail and recent activity

### API Endpoints Structure

```
GET /api/products          - Product catalog
GET /api/customers         - Customer database
GET /api/orders           - Order management
GET /api/analytics        - Dashboard metrics
GET /api/inventory        - Stock levels
GET /api/system/health    - System status
```

### Key Calculations

1. **Customer Lifetime Value (CLV)**:
   ```
   CLV = (Average Order Value × Purchase Frequency × Customer Lifespan)
   ```

2. **Customer Acquisition Cost (CAC)**:
   ```
   CAC = Total Marketing Spend / Number of New Customers
   ```

3. **Conversion Rate**:
   ```
   Conversion Rate = (Completed Purchases / Total Visitors) × 100
   ```

4. **Inventory Turnover**:
   ```
   Turnover = Cost of Goods Sold / Average Inventory Value
   ```

## 📈 Performance Considerations

1. **Indexing Strategy**:
   - Customer email, phone for quick lookups
   - Order date, status for filtering
   - Product SKU, category for search

2. **Caching Strategy**:
   - Dashboard metrics (5-15 minute cache)
   - Product catalog (1-hour cache)
   - System status (real-time)

3. **Data Archival**:
   - Archive old orders (>2 years)
   - Maintain customer history
   - Compress historical analytics

## 🔄 Migration Notes

When implementing the backend:

1. **Data Validation**: Ensure all required fields are present
2. **Relationship Integrity**: Maintain foreign key constraints
3. **Status Management**: Implement proper status transitions
4. **Audit Trail**: Track all data modifications
5. **Performance Monitoring**: Log query performance and optimize

---

*This documentation should be updated as the backend implementation evolves and new requirements emerge.*
