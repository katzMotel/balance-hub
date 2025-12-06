# BalanceHub 💰

A modern, full-featured personal finance dashboard built with Next.js, TypeScript, and Redux Toolkit. Track your accounts, transactions, budgets, and investments all in one place with real-time stock prices and beautiful data visualizations.

![BalanceHub Dashboard](./public/DashboardScreenshot.png) 

## ✨ Features

### 📊 Dashboard
- Real-time income vs expenses chart (last 7 days)
- Summary cards showing total balance, income, expenses, and savings rate
- Recent transactions overview

### 💳 Account Management
- Create, edit, and delete accounts
- Track multiple account types (checking, savings, credit, investment)
- Real-time total balance calculation

### 💸 Transaction Tracking
- Full CRUD operations for transactions
- Advanced filtering by category, type, and date
- Search functionality across descriptions and categories
- Sort by date or amount
- Automatic budget integration

### 🎯 Budget Planning
- Set budgets by category (weekly, monthly, yearly)
- Automatic spending calculation from transactions
- Visual progress bars with color-coded warnings
- Track spending across multiple categories

### 📈 Investment Portfolio
- Track stock holdings with real-time prices via Alpha Vantage API
- Auto-refresh prices every 5 minutes with countdown timer
- Portfolio summary showing total value and gains/losses
- Performance metrics for individual investments

### ⚙️ Settings & Data Management
- Export all data to JSON or CSV format
- Clear all data with confirmation
- Dark mode toggle
- Data persistence via localStorage

### 🌓 Dark Mode
- Complete dark mode implementation
- Persists across sessions
- Available on landing page and entire dashboard

### 📱 Responsive Design
- Mobile-first approach
- Optimized layouts for tablet and desktop
- Touch-friendly interface

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Alpha Vantage API key (free tier available)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/balance-hub.git
cd balance-hub
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory
```env
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

Get your free API key at [Alpha Vantage](https://www.alphavantage.co/support/#api-key)

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Redux Toolkit** - State management
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **date-fns** - Date formatting

### APIs & Services
- **Alpha Vantage API** - Real-time stock prices
- **localStorage** - Client-side data persistence

## 📁 Project Structure
```
balance-hub/
├── app/
│   ├── dashboard/
│   │   ├── accounts/
│   │   ├── transactions/
│   │   ├── budgets/
│   │   ├── investments/
│   │   └── settings/
│   ├── layout.tsx
│   └── page.tsx (landing page)
├── components/
│   ├── features/
│   │   ├── accounts/
│   │   ├── transactions/
│   │   ├── budgets/
│   │   ├── investments/
│   │   └── settings/
│   ├── layout/
│   ├── charts/
│   └── ui/
├── store/
│   ├── slices/
│   └── store.ts
├── types/
├── lib/
│   ├── api/
│   └── utils/
└── public/
```

## 🔑 Key Features Explained

### Data Persistence
All data is stored in localStorage, allowing users to maintain their financial data across sessions without requiring a backend. Data automatically saves on every action and restores on page load.

### Real-Time Stock Prices
Integration with Alpha Vantage API provides current market prices for investment holdings. Auto-refresh feature updates prices every 5 minutes with visual countdown timer. Rate limiting is implemented to respect API quotas (5 calls/minute on free tier).

### Budget Integration
Budgets automatically calculate spending from transactions by matching categories. Progress bars dynamically update and change color based on spending levels (green < 70%, yellow 70-90%, red > 90%).

### State Management
Redux Toolkit manages all application state with:
- Async thunks for API calls
- Computed selectors for derived data
- Type-safe actions and reducers
- Normalized state structure

## 🎨 Color System

The app uses a custom Tailwind theme with semantic color tokens:
- Primary (Blue) - Main brand color
- Success (Green) - Income, positive changes, progress
- Warning (Yellow/Orange) - Warnings, medium priority
- Danger (Red) - Expenses, negative changes, errors
- Neutral (Gray) - Text, borders, backgrounds

All colors support dark mode with appropriate contrast ratios.

## 🚧 Future Enhancements

- [ ] Backend integration (REST API or GraphQL)
- [ ] User authentication
- [ ] Multi-user support
- [ ] Recurring transactions
- [ ] Bill reminders
- [ ] Financial goal tracking
- [ ] More chart types (pie charts, spending by category)
- [ ] PDF report generation
- [ ] Mobile app (React Native)
- [ ] Bank account integration (Plaid API)

## 📝 License

MIT License - feel free to use this project for your portfolio or learning purposes.

## 👨‍💻 Author

**Dylan Giddens**
- GitHub: [@katzMotel](https://github.com/katzMotel)

## 🙏 Acknowledgments

- Stock price data provided by [Alpha Vantage](https://www.alphavantage.co/)
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)

---

Built using Next.js and TypeScript