# ExpenseFlow — Personal Expense Tracker (MERN Stack)

A modern, full-stack financial dashboard web application built with the **MERN stack** (MongoDB, Express.js, React.js with Vite, Node.js). Designed like a modern financial SaaS product with clean typography, emerald-green accents, real-time analytics, and dynamic financial statistics.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-10b981?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21-black?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-47a248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## ✨ Key Features

### 1. Executive Financial Dashboard
- **Dynamically Calculated Totals**: Real-time aggregation of Total Balance, Total Income, Total Expenses, and Remaining Monthly Budget (no hardcoded numbers).
- **Interactive Cash Flow Chart**: Income vs. Expenses comparison using **Recharts** bar chart with custom emerald and rose palettes.
- **Category Expense Distribution**: Donut/Pie visualization showing percentage and dollar distribution per category.
- **Monthly Spending Summary**: Daily average expenditure, savings rate percentage, and top expense driver.
- **Recent Activity**: Quick review of the latest transactions with visual type badges and click-to-edit support.

### 2. Transaction Management (Full CRUD)
- **Create**: Add income or expense transactions with positive amount validation, category assignment, date, and optional notes.
- **Read**: Responsive data table with desktop and mobile card view.
- **Update**: Edit existing transactions via intuitive modal dialog.
- **Delete**: Safe deletion backed by a confirmation dialog.
- **Multi-parameter Filtering**: Filter by transaction type (`All`, `Income`, `Expense`), category, and custom start/end date range.
- **Search & Sort**: Real-time keyword search across descriptions and notes, plus sorting by date (newest/oldest) or amount (high/low).
- **Data Export**: One-click **Export to CSV** for spreadsheets and reporting.

### 3. Monthly Budget & Alerts
- Set customizable monthly spending limits for any target month and year.
- Dynamic progress bar with 3 visual health states:
  - 🟢 **Safe (< 75%)**: On track.
  - 🟡 **Caution (75% – 99%)**: Approaching monthly limit.
  - 🔴 **Exceeded (≥ 100%)**: Over-budget warning banner displaying exact overrun amount.
- Automatic recalculation whenever transactions are added, edited, or deleted.
- Category spending breakdown showing which categories consume the budget.

### 4. Seamless Dual Mode (Live MongoDB + Demo Mode)
- **Live Database**: Connects directly to local MongoDB or cloud MongoDB Atlas.
- **Demo Data Toggle**: Test all UI workflows instantly with rich sample transactions without database configuration.
- **Automatic Fallback**: If backend connection is lost, gracefully informs the user without app crashes.

---

## 🏗️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19 + Vite 8 | Ultra-fast build tool and reactive component tree |
| **Styling** | CSS3 Design System | Responsive layout, emerald theme, CSS variables |
| **Data Viz** | Recharts 3 | Interactive bar, pie, and donut charts |
| **Icons** | Lucide React | Modern, minimalist SVG icons |
| **HTTP Client**| Axios 1.20 | REST API communication with interceptors |
| **Backend** | Node.js + Express.js | Modular RESTful API architecture |
| **Database** | MongoDB + Mongoose 8 | Document database with schema validation & indexing |

---

## 📁 Project Structure

```text
expense_tracker/
├── frontend/                     # React + Vite frontend application
│   ├── public/                   # Static assets & favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Navbar, Sidebar, StatCard, Modal, Toast, Badge, Loader
│   │   │   ├── dashboard/        # OverviewCards, IncomeExpenseChart, CategoryPieChart
│   │   │   ├── transactions/     # TransactionModal, TransactionFilters, TransactionTable
│   │   │   └── budget/           # BudgetCard, BudgetModal, CategoryBudgetBreakdown
│   │   ├── context/              # ExpenseContext (central state & calculation engine)
│   │   ├── data/                 # Realistic demo data seed
│   │   ├── pages/                # DashboardPage, TransactionsPage, BudgetPage, AnalyticsPage
│   │   ├── services/             # Axios API services (transactions, budgets)
│   │   ├── styles/               # Global CSS design system (index.css)
│   │   ├── utils/                # Formatters, constants, category definitions
│   │   ├── App.jsx               # Application root with routing & layout
│   │   └── main.jsx              # React DOM entry point
│   ├── package.json
│   └── vite.config.js            # Vite configuration with API proxy
│
├── backend/                      # Node.js + Express REST API
│   ├── config/
│   │   ├── db.js                 # MongoDB Mongoose connection
│   │   └── seed.js               # Database seeder with realistic test data
│   ├── controllers/
│   │   ├── transactionController.js # CRUD handlers with filters & search
│   │   └── budgetController.js      # Budget handlers with upsert
│   ├── middleware/
│   │   ├── errorHandler.js       # Centralized error handler & status codes
│   │   └── validateObjectId.js   # MongoDB 24-character ObjectId validator
│   ├── models/
│   │   ├── Transaction.js        # Mongoose Transaction schema
│   │   └── Budget.js             # Mongoose Budget schema
│   ├── routes/
│   │   ├── transactionRoutes.js  # /api/transactions router
│   │   └── budgetRoutes.js       # /api/budgets router
│   ├── tests/
│   │   └── api.test.js           # Automated integration test suite
│   ├── .env.example              # Sample environment variables
│   ├── package.json
│   └── server.js                 # Express server entry point
│
├── .gitignore
├── API_DOCUMENTATION.md          # Comprehensive REST API reference
├── package.json                  # Root workspace helper scripts
└── README.md
```

---

## 🚀 Quick Start Guide (Local Setup)

### Prerequisites
- **Node.js** (v18 or higher installed — tested on v24)
- **MongoDB** (Local MongoDB community service or MongoDB Atlas account)

### 1. Clone or Open the Repository
```bash
cd expense_tracker
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create your `.env` file (copied from `.env.example`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/expense_tracker
CLIENT_URL=http://localhost:3000
```

Seed initial sample transactions into MongoDB:
```bash
npm run seed
```

Start the backend development server:
```bash
npm run dev
```
> The API will be running at `http://localhost:5000` with health check at `http://localhost:5000/api/health`.

### 3. Setup the Frontend
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
> The Vite frontend will open at `http://localhost:3000` (or `http://localhost:5173`).

---

## 🌐 Connecting to MongoDB Atlas (Cloud)

To use a hosted MongoDB Atlas cloud database instead of local MongoDB:

1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a free **M0 Shared Cluster**.
3. Under **Security → Database Access**, create a database user with username and password (e.g. `expense_user` / `YourSecurePassword123`).
4. Under **Security → Network Access**, add IP Access:
   - Click **Add IP Address** → Choose **Allow Access from Anywhere (`0.0.0.0/0`)** for development, or add your current IP.
5. In your cluster dashboard, click **Connect** → **Drivers** (Node.js).
6. Copy the connection string and paste it into `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://expense_user:YourSecurePassword123@cluster0.abcde.mongodb.net/expense_tracker?retryWrites=true&w=majority
   ```
7. Run the seeder to test your Atlas connection:
   ```bash
   cd backend
   npm run seed
   ```

---

## 🧪 Running Automated API Tests

The project includes an integration test suite validating CRUD operations, status codes, input validations, and error handling.

To run the tests:
1. Make sure the backend server is running (`npm start` or `npm run dev` in `backend`).
2. Run the test command:
```bash
cd backend
npm test
```

Expected Output:
```text
🧪 Starting ExpenseFlow Backend API Test Suite...

• GET /api/health returns status 200 and online status... ✅ PASS
• POST /api/transactions rejects negative or zero amount with 400... ✅ PASS
• POST /api/transactions rejects empty description with 400... ✅ PASS
• POST /api/transactions creates new transaction with 201... ✅ PASS
• GET /api/transactions/:id returns the created transaction... ✅ PASS
• PUT /api/transactions/:id updates transaction amount and description... ✅ PASS
• GET /api/transactions?type=expense&search=Updated filters properly... ✅ PASS
• DELETE /api/transactions/:id deletes the created transaction... ✅ PASS
• GET /api/transactions/invalid-id-123 rejects invalid ObjectId with 400... ✅ PASS
• POST /api/budgets sets a monthly budget... ✅ PASS
• GET /api/budgets retrieves budgets list... ✅ PASS

======================================================
Test Results: 11 passed, 0 failed (11 total)
======================================================
```

---

## 📄 License

This project is licensed under the MIT License — feel free to use and customize for personal or commercial projects.
