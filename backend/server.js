import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import transactionRoutes from './routes/transactionRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Root API Welcome Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'ExpenseFlow Backend API',
    status: 'online',
    frontendUrl: 'http://localhost:3000',
    documentation: '/api/health',
    message: 'Backend API is active. Open http://localhost:3000 in your browser to view the application dashboard.',
  });
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'ExpenseFlow API',
    uptime: process.uptime(),
  });
});

// API Endpoints
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

// 404 Route Not Found Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
======================================================
  🚀 ExpenseFlow Backend Server Running
  📡 Local: http://localhost:${PORT}
  🔍 Health: http://localhost:${PORT}/api/health
  📂 Env: ${process.env.NODE_ENV || 'development'}
======================================================
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  // In production: server.close(() => process.exit(1));
});

export default app;
