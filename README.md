# Zorvyan Dashboard

A clean, interactive React finance dashboard for internal financial management. Built with React 18, TypeScript, and modern dev tools.

## Features

### 📊 Dashboard Overview
- **4 Summary Cards**: Total Balance, Monthly Income, Monthly Expenses, Savings Rate %
- **Animated Counters**: Number counters that animate on mount
- **Trend Indicators**: Visual indicators showing month-over-month changes
- **Balance Trend Chart**: 6-month line chart showing income vs expense trends
- **Spending Breakdown**: Pie chart with spending by category
- **Recent Activity**: Last 5 transactions with badges and icons

### 💳 Transactions Management
- **Full Table View**: Sortable, filterable transaction table
- **Advanced Filters**:
  - Search by description, category, or tags
  - Filter by transaction type (income/expense)
  - Filter by category
  - Date range filtering
  - Sort by date or amount (ascending/descending)
- **Pagination**: 10 transactions per page
- **CRUD Operations**:
  - Add new transactions with form validation
  - Edit existing transactions
  - Delete transactions with confirmation modal
- **Export**: CSV and JSON export options (role-gated)

### 📈 Insights & Analytics
- **Smart Insights**: AI-like observations on spending patterns
  - Expense alerts (e.g., "Food spending up 23% vs last month")
  - Savings rate highlights (e.g., "Great savings rate: 35%")
  - Category analysis (e.g., "Housing is 40% of expenses")
- **Month Comparison**: Bar chart comparing monthly income vs expenses
- **Top Categories**: Horizontal bar chart of top spending categories
- **Key Metrics Summary**: At-a-glance financial health indicators

### 🔐 Role-Based Access Control
Three role levels with specific permissions:

| Role    | Can Add | Can Edit | Can Delete | Can Export |
|---------|---------|----------|------------|------------|
| Admin   | ✅      | ✅       | ✅         | ✅         |
| Manager | ✅      | ✅       | ❌         | ✅         |
| Viewer  | ❌      | ❌       | ❌         | ❌         |

Use the Settings page to switch roles for testing.

### 🎨 Design & UX
- **Zorvyan Brand Colors**: Custom color palette with navy, blue, teal, green, red, and gold
- **Dark Mode**: Full dark mode support with smooth transitions
- **Responsive Design**: Fully mobile-responsive with adaptive sidebar/bottom nav
- **Smooth Animations**: 300ms transitions on drawer open/close, 200ms on theme switch
- **Skeleton Loaders**: Loading states with shimmer animation
- **Accessible Components**: Semantic HTML, proper ARIA labels
- **Global Search**: Cmd+K shortcut for quick navigation and transaction lookup

### 📱 Mobile Experience
- Adaptive layout that switches to bottom navigation on screens < 768px
- Touch-friendly button sizes and spacing
- Optimized table view for smaller screens
- Full drawer width on mobile

### 🔎 Quick Search
- Press **Cmd+K** or **Ctrl+K** to open the search overlay
- Search across navigation items and recent transactions

## Project Structure

```
src/
├── types/                 # TypeScript interfaces
│   ├── transaction.types.ts
│   ├── user.types.ts
│   └── dashboard.types.ts
├── store/                 # Zustand state management
│   ├── useTransactionStore.ts
│   ├── useAuthStore.ts
│   └── useUIStore.ts
├── data/                  # Mock data
│   ├── mockTransactions.ts
│   └── mockUsers.ts
├── hooks/                 # Custom React hooks
│   ├── useFilteredTransactions.ts
│   ├── useDashboardMetrics.ts
│   └── useExport.ts
├── components/
│   ├── layout/            # Main layout components
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── MobileNav.tsx
│   ├── dashboard/         # Dashboard page components
│   │   ├── Overview.tsx
│   │   ├── SummaryCard.tsx
│   │   ├── BalanceTrendChart.tsx
│   │   ├── SpendingBreakdownChart.tsx
│   │   └── RecentActivity.tsx
│   ├── transactions/      # Transaction management
│   │   ├── TransactionsPage.tsx
│   │   ├── TransactionFilters.tsx
│   │   ├── TransactionTable.tsx
│   │   ├── TransactionRow.tsx
│   │   ├── AddTransactionDrawer.tsx
│   │   ├── EditTransactionDrawer.tsx
│   │   └── DeleteConfirmModal.tsx
│   ├── insights/          # Analytics & insights
│   │   ├── InsightsPanel.tsx
│   │   ├── InsightCard.tsx
│   │   ├── MonthComparisonChart.tsx
│   │   └── TopCategoriesChart.tsx
│   ├── auth/              # Authentication & permissions
│   │   ├── PermissionGate.tsx
│   │   └── RoleSwitcher.tsx
│   ├── shared/            # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Drawer.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Tooltip.tsx
│   │   └── Avatar.tsx
│   └── pages/
│       └── Settings.tsx
├── utils/                 # Utility functions
│   ├── formatCurrency.ts
│   ├── deriveMetrics.ts
│   └── exportToCSV.ts
├── constants/             # Application constants
│   ├── categories.ts
│   ├── roles.ts
│   └── routes.ts
├── App.tsx                # Main app component with routing
├── main.tsx               # Entry point
└── index.css              # Global styles with CSS variables
```

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing
- **Zustand** - State management
- **Recharts** - Data visualization
- **date-fns** - Date formatting
- **CSS Modules** - Component-scoped styling
- **CSS Variables** - Theme management
- **Vite** - Build tool

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd Finance
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Dashboard Overview
The dashboard provides an at-a-glance view of your financial health:
- View key metrics with animated counters
- See 6-month spending and income trends
- Analyze category breakdown with pie chart
- Review recent transactions

### Managing Transactions
1. **View All**: Go to Transactions page to see complete transaction history
2. **Filter**: Use the filter panel to narrow down by search, type, category, or date
3. **Add**: Click "Add Transaction" to create a new entry
4. **Edit**: Click the edit icon on any transaction to modify it
5. **Delete**: Click the delete icon with confirmation
6. **Export**: Export all filtered transactions as CSV or JSON

### Analyzing Insights
- View smart insights about your spending patterns
- See monthly comparisons with bar charts
- Identify top spending categories
- Monitor key financial metrics

### Role Switching (Demo)
1. Go to Settings page
2. In the "Demo Controls" section, click a role button to switch
3. Notice how UI elements enable/disable based on permissions

### Theme Toggle
- Click the moon/sun icon in the top bar
- Theme preference is persisted in localStorage

## Data

### Mock Transactions
- 50+ transactions spanning 6 months
- Mix of income (salary, freelance) and expense transactions
- Realistic amounts: Salaries $5000+, food $40-60, housing $1200, etc.
- Multiple categories: Food, Transport, Housing, Entertainment, Health, etc.

### Mock Users
- **Admin**: Full access (admin@zorvyan.com)
- **Manager**: Can't delete (manager@zorvyan.com)
- **Viewer 1 & 2**: Read-only access

## Styling System

### CSS Variables (in index.css)
```css
--zorvyan-navy: #0D1B2A
--zorvyan-blue: #1A56DB
--zorvyan-teal: #0EA5E9
--zorvyan-green: #10B981
--zorvyan-red: #EF4444
--zorvyan-gold: #F59E0B
```

### Theme Switching
Controlled via `data-theme` attribute on `<html>`:
```javascript
document.documentElement.setAttribute('data-theme', 'dark') // or 'light'
```

### Transitions
- Fast: 150ms ease
- Normal: 200ms ease
- Slow: 300ms ease (theme switch, drawer open/close)

## State Management

### useTransactionStore
Manages all transaction CRUD operations with localStorage persistence.

### useAuthStore
Manages current user and provides role-switching capability.

### useUIStore
Manages UI state:
- Dark mode toggle
- Sidebar collapse state

All stores persist to localStorage automatically.

## Custom Hooks

### useFilteredTransactions(transactions, filter)
Filters, sorts, and paginates transactions based on query params.

### useDashboardMetrics(transactions)
Derives dashboard metrics, trend data, category breakdown, insights.

### useExport()
Provides export functions for CSV and JSON formats.

## API / Data Flow

All data comes from mock data and is stored in Zustand. No API calls are made. To integrate with a backend:

1. Replace the mock transactions with API calls
2. Update store methods to sync with backend
3. Add error handling and loading states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- ✅ Code splitting via React Router
- ✅ Image optimization (SVG icons)
- ✅ CSS-in-JS via modules (no runtime overhead)
- ✅ Memoization on custom hooks
- ✅ Skeleton loaders to hide loading delays

## Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ High contrast colors
- ✅ Focus indicators

## Contributing

1. Follow the existing code structure
2. Use TypeScript for all new code
3. Add CSS modules for styling
4. Update types if needed
5. Test on mobile (< 768px width)

## License

Internal use only - Zorvyan Financial Management Platform

---

**Built with ❤️ for efficient financial management**
