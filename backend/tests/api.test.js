import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import http from 'node:http';

const BASE_URL = 'http://127.0.0.1:5000/api';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runTests() {
  console.log('\n🧪 Starting ExpenseFlow Backend API Test Suite...\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`• ${name}... `);
      await fn();
      console.log('✅ PASS');
      passed++;
    } catch (err) {
      console.log('❌ FAIL');
      console.error('  Error:', err.message);
      failed++;
    }
  }

  // 1. Health check
  await test('GET /api/health returns status 200 and online status', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.status, 'online');
  });

  // 2. Validation check: negative or zero amount
  await test('POST /api/transactions rejects negative or zero amount with 400', async () => {
    const res = await fetch(`${BASE_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: 'Test Invalid',
        amount: -50,
        type: 'expense',
        category: 'Food',
      }),
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
  });

  // 3. Validation check: empty description
  await test('POST /api/transactions rejects empty description with 400', async () => {
    const res = await fetch(`${BASE_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: '',
        amount: 100,
        type: 'income',
        category: 'Salary',
      }),
    });
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
  });

  // 4. Create valid transaction
  let createdId = null;
  await test('POST /api/transactions creates new transaction with 201', async () => {
    const res = await fetch(`${BASE_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: 'Test Groceries Suite',
        amount: 88.5,
        type: 'expense',
        category: 'Food',
        date: new Date().toISOString(),
        notes: 'Integration test automated entry',
      }),
    });
    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.data.description, 'Test Groceries Suite');
    assert.equal(data.data.amount, 88.5);
    createdId = data.data._id;
    assert.ok(createdId);
  });

  // 5. Get single transaction by ID
  await test('GET /api/transactions/:id returns the created transaction', async () => {
    assert.ok(createdId, 'Requires createdId');
    const res = await fetch(`${BASE_URL}/transactions/${createdId}`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.data._id, createdId);
  });

  // 6. Update transaction
  await test('PUT /api/transactions/:id updates transaction amount and description', async () => {
    assert.ok(createdId, 'Requires createdId');
    const res = await fetch(`${BASE_URL}/transactions/${createdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: 'Test Groceries Updated',
        amount: 99.99,
      }),
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.data.amount, 99.99);
    assert.equal(data.data.description, 'Test Groceries Updated');
  });

  // 7. Filter & Search transactions
  await test('GET /api/transactions?type=expense&search=Updated filters properly', async () => {
    const res = await fetch(`${BASE_URL}/transactions?type=expense&search=Updated`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.data.length >= 1);
  });

  // 8. Delete transaction
  await test('DELETE /api/transactions/:id deletes the created transaction', async () => {
    assert.ok(createdId, 'Requires createdId');
    const res = await fetch(`${BASE_URL}/transactions/${createdId}`, {
      method: 'DELETE',
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);

    // Verify it is gone
    const verifyRes = await fetch(`${BASE_URL}/transactions/${createdId}`);
    assert.equal(verifyRes.status, 404);
  });

  // 9. ObjectId validation
  await test('GET /api/transactions/invalid-id-123 rejects invalid ObjectId with 400', async () => {
    const res = await fetch(`${BASE_URL}/transactions/invalid-id-123`);
    assert.equal(res.status, 400);
    const data = await res.json();
    assert.equal(data.success, false);
  });

  // 10. Budget CRUD
  await test('POST /api/budgets sets a monthly budget', async () => {
    const res = await fetch(`${BASE_URL}/budgets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        month: 11,
        year: 2026,
        amount: 4000,
      }),
    });
    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.data.amount, 4000);
  });

  await test('GET /api/budgets retrieves budgets list', async () => {
    const res = await fetch(`${BASE_URL}/budgets`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.data.length >= 1);
  });

  console.log(`\n======================================================`);
  console.log(`Test Results: ${passed} passed, ${failed} failed (${passed + failed} total)`);
  console.log(`======================================================\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

// Check if server is running before executing tests
fetch(`${BASE_URL}/health`)
  .then(() => runTests())
  .catch((err) => {
    console.error(`Cannot connect to server at ${BASE_URL}/health. Please make sure the server is running (npm run dev or npm start) before testing.`);
    process.exit(1);
  });
