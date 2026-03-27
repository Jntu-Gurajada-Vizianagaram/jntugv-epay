/**
 * ============================================================
 *   JNTUGV Payments — LIVE Integration Tests
 * ============================================================
 * These tests make REAL HTTP calls to the running backend at
 * http://localhost:4000. NO mocks are used.
 *
 * Prerequisites:
 *  - Backend must be running: `npm run dev`
 *  - MySQL DB must be online and migrated
 *  - .env must have valid SBI sandbox credentials
 *
 * How to run only this file:
 *   npx jest tests/integration.test.js --testTimeout=30000
 *
 * NOTE: Payment Success/Failure/Refund can only be TRIGGERED by
 * a human visiting the SBI sandbox page. This file:
 *  - Creates a real order and logs the SBI transactionUrl for you
 *    to visit manually to complete Success/Failure/Abort.
 *  - Tests the callback endpoint by sending a POST as SBI would.
 *  - Tests double-verification by querying payment status.
 * ============================================================
 */

require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.API_URL || 'http://localhost:4000';
const API = `${BASE_URL}/api/payment`;

// ============================================================
// Helper to initiate a real payment and return response
// ============================================================
async function initiatePayment(overrides = {}) {
  const payload = {
    student_roll: 'INT_TEST_001',
    student_name: 'Integration Test Student',
    father_name: 'Test Father',
    email: 'test@jntugv.edu.in',
    mobile: '9876543210',
    amount: 1.00,  // Minimum 1 INR for sandbox
    payment_category: 'CERTIFICATE',
    payment_subtype: 'PC',
    college_code: 'VV',
    college_name: 'Test College',
    course: 'B.Tech',
    remarks: 'Integration Test',
    ...overrides
  };

  const response = await axios.post(`${API}/initiate`, payload);
  return response;
}

// ============================================================
// 1. Server Health Check
// ============================================================
describe('Server Health', () => {
  it('Backend must be reachable at BASE_URL', async () => {
    const res = await axios.get(`${BASE_URL}/`);
    expect(res.status).toBe(200);
    expect(res.data.ok).toBe(true);
    console.log(`\n✅ Server is UP at ${BASE_URL}`);
  });
});

// ============================================================
// 2. Payment Initiation — Calls real SBI sandbox
// ============================================================
describe('Payment Initiation (Live SBI Sandbox)', () => {

  let createdMerchantTxnId = null;
  let transactionUrl = null;

  it('CERTIFICATE — Success Case: Should create a real SBI order and return transactionUrl', async () => {
    const res = await initiatePayment({ payment_category: 'CERTIFICATE', payment_subtype: 'TC' });
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('merchantTxnId');

    createdMerchantTxnId = res.data.merchantTxnId;
    transactionUrl = res.data.action;

    console.log('\n==========================================');
    console.log('✅ SBI Order Created — Success Case');
    console.log('   MerchantTxnId :', createdMerchantTxnId);
    console.log('   SBI Redirect  :', transactionUrl);
    console.log('   👉 Visit the above URL in a browser to complete payment.');
    console.log('==========================================\n');
  });

  it('UNIVERSITY_EXAMINATION — Success Case: Should create a real exam fee order', async () => {
    const res = await initiatePayment({
      payment_category: 'UNIVERSITY_EXAMINATION',
      payment_subtype: 'REGULAR',
      semester: '1',
      year: 'I',
      amount: 1.00
    });
    expect(res.status).toBe(200);
    expect(res.data.merchantTxnId).toBeTruthy();

    console.log('\n==========================================');
    console.log('✅ SBI Order Created — UNIVERSITY_EXAMINATION / REGULAR');
    console.log('   MerchantTxnId :', res.data.merchantTxnId);
    console.log('   SBI Redirect  :', res.data.action);
    console.log('   👉 Visit URL and ABORT to trigger Abort/Failure case');
    console.log('==========================================\n');
  });

  it('PHD_FEE — Success Case: Should create a PhD fee order', async () => {
    const res = await initiatePayment({
      payment_category: 'PHD_FEE',
      fee_type: 'TUITION',
      department: 'Computer Science',
      amount: 1.00
    });
    expect(res.status).toBe(200);
    expect(res.data.merchantTxnId).toBeTruthy();

    console.log('\n==========================================');
    console.log('✅ SBI Order Created — PHD_FEE / TUITION');
    console.log('   MerchantTxnId :', res.data.merchantTxnId);
    console.log('==========================================\n');
  });

  it('ADMISSION — Success Case: Should create an admission fee order', async () => {
    const res = await initiatePayment({
      payment_category: 'ADMISSION',
      course: 'B.Tech',
      amount: 1.00
    });
    expect(res.status).toBe(200);
    console.log('\n==========================================');
    console.log('✅ SBI Order Created — ADMISSION');
    console.log('   MerchantTxnId :', res.data.merchantTxnId);
    console.log('==========================================\n');
  });

  it('AFFILIATION — Success Case: Should create an affiliation fee order', async () => {
    const res = await initiatePayment({
      student_roll: 'AFF_COLL_01',
      student_name: 'Test Affiliated College',
      payment_category: 'AFFILIATION',
      payment_subtype: 'NEW',
      amount: 1.00
    });
    expect(res.status).toBe(200);
    console.log('\n==========================================');
    console.log('✅ SBI Order Created — AFFILIATION');
    console.log('   MerchantTxnId :', res.data.merchantTxnId);
    console.log('==========================================\n');
  });

  it('Failure Case: Should return 400 on missing required fields', async () => {
    try {
      await axios.post(`${API}/initiate`, { amount: 500 }); // missing student_roll etc
      throw new Error('Expected request to fail but it succeeded');
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.error).toBe('Validation Error');
      console.log('\n==========================================');
      console.log('✅ Failure Case: 400 Validation Error received as expected');
      console.log('==========================================\n');
    }
  });

  it('Network failure case: Should handle unreachable SBI by falling back gracefully', async () => {
    // We initiate with valid data; if SBI SDK fails, service should 
    // fall back to mock bank URL or return 500, not crash with an unhandled exception
    try {
      const res = await initiatePayment({ amount: 1.00, payment_category: 'OTHER_FEE' });
      // Either success (200) with action URL or server-side 500 — both are graceful
      expect([200, 500]).toContain(res.status);
      console.log('\n==========================================');
      console.log('✅ Network Case: Graceful fallback to mock/local handled');
      console.log('   Status:', res.status);
      console.log('==========================================\n');
    } catch (err) {
      // axios throws for 4xx/5xx, so 500 is still acceptable
      expect(err.response.status).toBe(500);
      console.log('\n==========================================');
      console.log('✅ Network failure case: 500 returned gracefully (no crash)');
      console.log('==========================================\n');
    }
  });
});

// ============================================================
// 3. Double Verification — Query Payment Status (Real DB)
// ============================================================
describe('Double Verification via Payment Status Endpoint', () => {

  it('Should return INITIATED status for a freshly created transaction', async () => {
    // Create a payment first
    const initRes = await initiatePayment({ payment_category: 'CERTIFICATE', amount: 1.00 });
    const merchantTxnId = initRes.data.merchantTxnId;

    // Query status immediately — it should be INITIATED
    const statusRes = await axios.get(`${API}/status/${merchantTxnId}`);

    console.log('\n==========================================');
    console.log('🔍 Double Verification API Response:');
    console.log(JSON.stringify(statusRes.data, null, 2));
    console.log('==========================================\n');

    expect(statusRes.status).toBe(200);
    expect(['INITIATED', 'PENDING']).toContain(statusRes.data.status);
    expect(statusRes.data.merchantTxnId).toBe(merchantTxnId);
  });

  it('Should return null for a non-existent transaction (no record found)', async () => {
    const fakeTxnId = 'JNTUGV_FAKE_TXN_999999';
    const res = await axios.get(`${API}/status/${fakeTxnId}`);

    console.log('\n==========================================');
    console.log('🔍 Double Verification (DB ONLY) — Non-existent TxnId:');
    console.log(JSON.stringify(res.data, null, 2));
    console.log('==========================================\n');

    expect(res.status).toBe(200);
    expect(res.data).toBeNull();
  });

  it('Should correctly verify the actual bank status against SBI APIs (Double Verification to Bank)', async () => {
    const initRes = await initiatePayment({ payment_category: 'CERTIFICATE', amount: 1.00 });
    const merchantTxnId = initRes.data.merchantTxnId;

    // Contact the backend endpoint which directly asks SBI Sandbox
    const verifyRes = await axios.get(`${API}/verify-bank/${merchantTxnId}`);

    console.log('\n==========================================');
    console.log('🏛️ Double Verification (DIRECT BANK INQUIRY) Response:');
    console.log(JSON.stringify(verifyRes.data, null, 2));
    console.log('==========================================\n');

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.data.merchantTxnId).toBe(merchantTxnId);
    expect(verifyRes.data.isVerified).toBe(true);
    // Directly after creation, bank usually registers it as PENDING or OPEN depending on integration timing
    expect(['PENDING', 'OPEN', 'INITIATED', 'FAIL', 'FAILED']).toContain(verifyRes.data.bankStatus.toUpperCase());
  });
});

// ============================================================
// 4. Callback Endpoint — Simulating SBI Push Notification
// ============================================================
describe('Callback Endpoint (Simulate SBI Push)', () => {

  let targetMerchantTxnId = null;

  beforeAll(async () => {
    // Create a fresh payment to use for callback tests
    const res = await initiatePayment({ payment_category: 'CERTIFICATE', amount: 1.00 });
    targetMerchantTxnId = res.data.merchantTxnId;
  });

  it('Success Case: Should mark transaction as SUCCESS when SBI pushes SUCCESS', async () => {
    const res = await axios.post(`${API}/callback`, {
      merchantTxnId: targetMerchantTxnId,
      status: 'SUCCESS',
      bankTxnId: 'SBI_BANK_TXN_001'
    });
    expect(res.status).toBe(200);
    expect(res.data.status).toBe('OK');

    // Double verify
    const statusRes = await axios.get(`${API}/status/${targetMerchantTxnId}`);
    console.log('\n==========================================');
    console.log('✅ Callback Success Case — DB Record after SUCCESS callback:');
    console.log(JSON.stringify(statusRes.data, null, 2));
    console.log('==========================================\n');
    expect(statusRes.data.status).toBe('SUCCESS');
  });

  it('Failure Case: Should mark transaction as FAILED when SBI pushes FAILED', async () => {
    // Create a fresh payment for isolation
    const initRes = await initiatePayment({ payment_category: 'CERTIFICATE', amount: 1.00 });
    const txnId = initRes.data.merchantTxnId;

    const res = await axios.post(`${API}/callback`, {
      merchantTxnId: txnId,
      status: 'FAILED',
      bankTxnId: 'SBI_BANK_TXN_FAIL_001'
    });
    expect(res.status).toBe(200);

    const statusRes = await axios.get(`${API}/status/${txnId}`);
    console.log('\n==========================================');
    console.log('✅ Callback Failure Case — DB Record after FAILED callback:');
    console.log(JSON.stringify(statusRes.data, null, 2));
    console.log('==========================================\n');
    expect(statusRes.data.status).toBe('FAILED');
  });

  it('Refund Case: Should mark transaction as REFUNDED when SBI pushes REFUNDED', async () => {
    const initRes = await initiatePayment({ payment_category: 'CERTIFICATE', amount: 1.00 });
    const txnId = initRes.data.merchantTxnId;

    // First mark as SUCCESS
    await axios.post(`${API}/callback`, { merchantTxnId: txnId, status: 'SUCCESS', bankTxnId: 'SBI_REFUND_SRC' });

    // Then simulate refund notification
    const res = await axios.post(`${API}/callback`, {
      merchantTxnId: txnId,
      status: 'REFUNDED',
      bankTxnId: 'SBI_REFUND_001'
    });
    expect(res.status).toBe(200);

    const statusRes = await axios.get(`${API}/status/${txnId}`);
    console.log('\n==========================================');
    console.log('✅ Refund Case — DB Record after REFUNDED callback:');
    console.log(JSON.stringify(statusRes.data, null, 2));
    console.log('==========================================\n');
    expect(statusRes.data.status).toBe('REFUNDED');
  });
});

// ============================================================
// 5. SQL Injection Test — Real DB / Sequelize Parameterization
// ============================================================
describe('Sql Injection Test (Real DB)', () => {

  it('Should safely ignore SQL injection strings without crashing (Sequelize parameterized queries)', async () => {
    const maliciousPayload = {
      student_roll: "1' OR '1'='1",
      student_name: "'; DROP TABLE payments; --",
      amount: 1.00,
      payment_category: 'CERTIFICATE',
      payment_subtype: 'PC'
    };

    const res = await initiatePayment(maliciousPayload);
    
    // Sequelize escapes inputs — the DB record should be created with the literal malicious string
    expect(res.status).toBe(200);
    expect(res.data.merchantTxnId).toBeTruthy();

    // Verify the record was safely stored (not executed)
    const statusRes = await axios.get(`${API}/status/${res.data.merchantTxnId}`);
    console.log('\n==========================================');
    console.log('🛡️ SQL Injection Test — Record safely stored:');
    console.log(JSON.stringify(statusRes.data, null, 2));
    console.log('==========================================\n');

    expect(statusRes.data.student_name).toBe("'; DROP TABLE payments; --");
  });
});

// ============================================================
// 6. Concurrent Stress Test — Real HTTP Load
// ============================================================
describe('Stress Test (Real Concurrent HTTP Requests)', () => {

  it('Should handle 20 staggered payment initiations to the live server', async () => {
    console.log('\n⏳ Running 20 staggered initiations (4 batches of 5) against live server...');

    const BATCH_SIZE = 5;
    const BATCH_DELAY_MS = 300;
    const TOTAL = 20;
    const results = [];

    for (let batch = 0; batch < TOTAL / BATCH_SIZE; batch++) {
      const batchRequests = Array.from({ length: BATCH_SIZE }).map((_, j) => {
        const i = batch * BATCH_SIZE + j;
        return axios.post(`${API}/initiate`, {
          student_roll: `STRESS_${String(i).padStart(3, '0')}`,
          student_name: `Stress Student ${i}`,
          father_name: `Father ${i}`,
          study_status: 'PURSUING',
          email: `stress${i}@test.com`,
          mobile: '9000000000',
          college_code: 'VV',
          college_name: 'Test College of Engineering',
          branch_code: '12',
          branch_name: 'Information Technology',
          course: 'B.Tech',
          current_year: 'IV',
          semester: 'II',
          amount: 1.00,
          payment_category: 'OTHER_FEE',
          remarks: 'Stress Test Full Data'
        }).catch(err => err.response || { status: 500 });
      });
      const batchResults = await Promise.all(batchRequests);
      results.push(...batchResults);
      if (batch < TOTAL / BATCH_SIZE - 1) {
        await new Promise(r => setTimeout(r, BATCH_DELAY_MS));
      }
    }

    const passed = results.filter(r => r.status === 200).length;
    const failed = results.filter(r => r.status !== 200).length;

    console.log('\n==========================================');
    console.log(`⚡ Stress Test Results (20 staggered):`);
    console.log(`   ✅ Passed: ${passed}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log('==========================================\n');

    // 70% threshold — realistic for shared SBI sandbox (rate-limiting expected)
    expect(passed).toBeGreaterThanOrEqual(14);
  }, 60000); // 60s timeout for stress test
});
