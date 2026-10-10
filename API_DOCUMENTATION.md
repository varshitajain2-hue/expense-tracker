# ExpenseFlow REST API Documentation

Base URL: `http://localhost:5000/api`

All requests and responses use the `application/json` format.

---

## 1. System Health

### `GET /api/health`
Checks the server and connection health status.

**Sample Response (`200 OK`):**
```json
{
  "status": "online",
  "timestamp": "2026-10-10T16:45:00.000Z",
  "service": "ExpenseFlow API",
  "uptime": 124.5
}
```

---

## 2. Transactions API

### `GET /api/transactions`
Retrieve all transactions with optional filtering, search, and sorting.

**Query Parameters:**
| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `type` | String | Filter by transaction type (`income` or `expense`) | `type=expense` |
| `category` | String | Filter by category name | `category=Food` |
| `search` | String | Case-insensitive search across description and notes | `search=salary` |
| `startDate` | Date (YYYY-MM-DD) | Start date filter (inclusive) | `startDate=2026-10-01` |
| `endDate` | Date (YYYY-MM-DD) | End date filter (inclusive) | `endDate=2026-10-31` |
| `month` | Number | Filter by month (1 to 12) | `month=10` |
| `year` | Number | Filter by year (e.g. 2026) | `year=2026` |
| `sort` | String | Sort by `date` (default) or `amount` | `sort=amount` |
| `order` | String | Sort direction: `desc` (default) or `asc` | `order=desc` |

**Sample Response (`200 OK`):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "67083049ab12cd34ef567890",
      "description": "Tech Solutions Monthly Salary",
      "amount": 5200,
      "type": "income",
      "category": "Salary",
      "date": "2026-10-01T00:00:00.000Z",
      "notes": "Direct deposit payroll",
      "createdAt": "2026-10-10T16:42:00.000Z",
      "updatedAt": "2026-10-10T16:42:00.000Z"
    },
    {
      "_id": "67083049ab12cd34ef567891",
      "description": "Supermarket Grocery Haul",
      "amount": 165.4,
      "type": "expense",
      "category": "Food",
      "date": "2026-10-02T00:00:00.000Z",
      "notes": "Weekly groceries",
      "createdAt": "2026-10-10T16:42:00.000Z",
      "updatedAt": "2026-10-10T16:42:00.000Z"
    }
  ]
}
```

---

### `GET /api/transactions/:id`
Retrieve a single transaction by its MongoDB 24-character hexadecimal `_id`.

**Sample Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "_id": "67083049ab12cd34ef567890",
    "description": "Tech Solutions Monthly Salary",
    "amount": 5200,
    "type": "income",
    "category": "Salary",
    "date": "2026-10-01T00:00:00.000Z",
    "notes": "Direct deposit payroll",
    "createdAt": "2026-10-10T16:42:00.000Z",
    "updatedAt": "2026-10-10T16:42:00.000Z"
  }
}
```

**Error Response (`404 Not Found`):**
```json
{
  "success": false,
  "message": "Transaction not found with id: 67083049ab12cd34ef567890"
}
```

**Error Response (`400 Bad Request`):**
```json
{
  "success": false,
  "message": "Invalid ID format: \"invalid-id\". Must be a 24-character hexadecimal string."
}
```

---

### `POST /api/transactions`
Create a new income or expense transaction record.

**Request Body:**
```json
{
  "description": "Electric & Power Bill",
  "amount": 88.50,
  "type": "expense",
  "category": "Bills",
  "date": "2026-10-04",
  "notes": "September electricity bill payment"
}
```

**Validation Requirements:**
- `description`: String, required, non-empty, max 150 characters.
- `amount`: Number, required, strictly positive (`> 0`).
- `type`: String, required, either `'income'` or `'expense'`.
- `category`: String, required, must be one of the recognized categories.
- `date`: Valid date string or ISO format (defaults to current timestamp if omitted).
- `notes`: Optional string, max 500 characters.

**Sample Response (`201 Created`):**
```json
{
  "success": true,
  "data": {
    "_id": "67083162ab12cd34ef567892",
    "description": "Electric & Power Bill",
    "amount": 88.5,
    "type": "expense",
    "category": "Bills",
    "date": "2026-10-04T00:00:00.000Z",
    "notes": "September electricity bill payment",
    "createdAt": "2026-10-10T16:44:00.000Z",
    "updatedAt": "2026-10-10T16:44:00.000Z"
  },
  "message": "Transaction recorded successfully"
}
```

---

### `PUT /api/transactions/:id`
Update an existing transaction record. Supports partial updates.

**Request Body:**
```json
{
  "description": "Updated Electric & Power Bill",
  "amount": 92.00
}
```

**Sample Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "_id": "67083162ab12cd34ef567892",
    "description": "Updated Electric & Power Bill",
    "amount": 92,
    "type": "expense",
    "category": "Bills",
    "date": "2026-10-04T00:00:00.000Z",
    "notes": "September electricity bill payment",
    "updatedAt": "2026-10-10T16:46:00.000Z"
  },
  "message": "Transaction updated successfully"
}
```

---

### `DELETE /api/transactions/:id`
Delete a transaction by ID.

**Sample Response (`200 OK`):**
```json
{
  "success": true,
  "data": {},
  "message": "Transaction deleted successfully"
}
```

---

## 3. Budgets API

### `GET /api/budgets`
Retrieve all budgets with optional month and year filters.

**Query Parameters:**
| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `month` | Number | Filter by month (1 to 12) | `month=10` |
| `year` | Number | Filter by year (e.g. 2026) | `year=2026` |

**Sample Response (`200 OK`):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "67083049ab12cd34ef567899",
      "month": 10,
      "year": 2026,
      "amount": 3500,
      "category": "General",
      "createdAt": "2026-10-10T16:42:00.000Z",
      "updatedAt": "2026-10-10T16:42:00.000Z"
    }
  ]
}
```

---

### `POST /api/budgets`
Set or update (upsert) the spending limit for a specific month and year.

**Request Body:**
```json
{
  "month": 10,
  "year": 2026,
  "amount": 3800
}
```

**Sample Response (`201 Created`):**
```json
{
  "success": true,
  "data": {
    "_id": "67083049ab12cd34ef567899",
    "month": 10,
    "year": 2026,
    "amount": 3800,
    "category": "General",
    "updatedAt": "2026-10-10T16:48:00.000Z"
  },
  "message": "Budget limit configured successfully"
}
```

---

### `PUT /api/budgets/:id`
Update an existing budget record by its ID.

**Request Body:**
```json
{
  "amount": 4200
}
```

**Sample Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "_id": "67083049ab12cd34ef567899",
    "month": 10,
    "year": 2026,
    "amount": 4200,
    "category": "General"
  },
  "message": "Budget updated successfully"
}
```

---

### `DELETE /api/budgets/:id`
Delete a budget by ID.

**Sample Response (`200 OK`):**
```json
{
  "success": true,
  "data": {},
  "message": "Budget removed successfully"
}
```
