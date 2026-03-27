const request = require('supertest');
const express = require('express');
const paymentRoutes = require('../src/routes/payments');
const paymentService = require('../src/services/paymentService');

// Mocking dependencies
jest.mock('../src/services/paymentService');
jest.mock('../src/utils/secureUrl', () => ({
  encryptData: jest.fn(data => Buffer.from(JSON.stringify(data)).toString('base64')),
  decryptData: jest.fn(data => JSON.parse(Buffer.from(data, 'base64').toString('utf8'))),
}));

const app = express();
app.use(express.json());
// Assuming endpoints are mounted at /api/payment or similar, we'll use / here for tests
app.use('/', paymentRoutes);

describe('Payment Controller Tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Validation - /initiate', () => {
    it('Should return 400 when missing mandatory fields (e.g., student_roll)', async () => {
      const response = await request(app)
        .post('/initiate')
        .send({
          amount: 100,
          payment_category: "CERTIFICATE",
          student_name: "Test"
          // missing student_roll
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Validation Error');
    });

    it('Should return 400 when amount is negative', async () => {
      const response = await request(app)
        .post('/initiate')
        .send({
          student_roll: "123",
          student_name: "Test",
          amount: -50,
          payment_category: "CERTIFICATE"
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });

    it('Should return 400 when semester is missing for UNIVERSITY_EXAMINATION', async () => {
      const response = await request(app)
        .post('/initiate')
        .send({
          student_roll: "123",
          student_name: "Test Name",
          amount: 500,
          payment_category: "UNIVERSITY_EXAMINATION",
          year: "1"
          // missing semester
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });

    it('Should return 400 when fee_type is missing for PHD_FEE', async () => {
      const response = await request(app)
        .post('/initiate')
        .send({
          student_roll: "123",
          student_name: "Test Name",
          amount: 5000,
          payment_category: "PHD_FEE",
          department: "CSE"
          // missing fee_type
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation Error');
    });
  });

  describe('Success Initiations (All Payment Types) - /initiate', () => {
    it('Should successfully initiate UNIVERSITY_EXAMINATION', async () => {
      paymentService.initiate.mockResolvedValue({ action: 'http://test.url' });

      const response = await request(app)
        .post('/initiate')
        .send({
          student_roll: "123",
          student_name: "Test Name",
          amount: 500,
          payment_category: "UNIVERSITY_EXAMINATION",
          semester: "2",
          payment_subtype: "REGULAR"
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('action');
      expect(paymentService.initiate).toHaveBeenCalled();
    });

    it('Should successfully initiate PHD_FEE', async () => {
      paymentService.initiate.mockResolvedValue({ action: 'http://test.url' });

      const response = await request(app)
        .post('/initiate')
        .send({
          student_roll: "PHD123",
          student_name: "PhD Name",
          amount: 5000,
          payment_category: "PHD_FEE",
          fee_type: "TUITION"
        });

      expect(response.status).toBe(200);
      expect(response.body.action).toBe('http://test.url');
    });

    it('Should successfully initiate CERTIFICATE', async () => {
      paymentService.initiate.mockResolvedValue({ action: 'http://test.url' });

      const response = await request(app)
        .post('/initiate')
        .send({
          student_roll: "C123",
          student_name: "Cert Name",
          amount: 200,
          payment_category: "CERTIFICATE",
          payment_subtype: "PC"
        });

      expect(response.status).toBe(200);
      expect(paymentService.initiate).toHaveBeenCalledTimes(1);
    });

    it('Should successfully initiate ADMISSION', async () => {
      paymentService.initiate.mockResolvedValue({ action: 'http://test.url' });

      const response = await request(app)
        .post('/initiate')
        .send({
          student_roll: "NEW_ADM_001",
          student_name: "Adm Name",
          amount: 1500,
          payment_category: "ADMISSION",
          course: "B.Tech"
        });

      expect(response.status).toBe(200);
    });

    it('Should successfully initiate AFFILIATION', async () => {
      paymentService.initiate.mockResolvedValue({ action: 'http://test.url' });

      const response = await request(app)
        .post('/initiate')
        .send({
          student_roll: "AFF_COLL",
          student_name: "College Name",
          amount: 25000,
          payment_category: "AFFILIATION",
          payment_subtype: "NEW_AFFILIATION"
        });

      expect(response.status).toBe(200);
    });

    it('Should successfully initiate HOSTEL_FEE', async () => {
      paymentService.initiate.mockResolvedValue({ action: 'http://test.url' });

      const response = await request(app)
        .post('/initiate')
        .send({
          student_roll: "H123",
          student_name: "Hostel Name",
          amount: 4000,
          payment_category: "HOSTEL_FEE"
        });

      expect(response.status).toBe(200);
    });

    it('Should successfully initiate OTHER_FEE', async () => {
      paymentService.initiate.mockResolvedValue({ action: 'http://test.url' });

      const response = await request(app)
        .post('/initiate')
        .send({
          student_roll: "O123",
          student_name: "Other Name",
          amount: 100,
          payment_category: "OTHER_FEE"
        });

      expect(response.status).toBe(200);
    });
  });

  describe('Payment Process Callbacks - /callback', () => {
    it('Should successfully handle callbackHandler', async () => {
      paymentService.callback.mockResolvedValue(true);

      const response = await request(app)
        .post('/callback')
        .send({
          merchantTxnId: "TXN123",
          status: "SUCCESS"
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("OK");
      expect(paymentService.callback).toHaveBeenCalledWith({
        merchantTxnId: "TXN123",
        status: "SUCCESS"
      });
    });

    it('Should return 500 on callback error', async () => {
      paymentService.callback.mockRejectedValue(new Error('Simulated Error'));

      const response = await request(app)
        .post('/callback')
        .send({
          merchantTxnId: "TXN123"
        });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Callback failed");
    });
  });

  describe('Payment Status - /status/:merchantTxnId', () => {
    it('Should return payment status', async () => {
      paymentService.getStatus.mockResolvedValue({ merchantTxnId: "TXN123", status: "SUCCESS" });

      const response = await request(app).get('/status/TXN123');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("SUCCESS");
      expect(paymentService.getStatus).toHaveBeenCalledWith("TXN123");
    });

    it('Should handle error on status check', async () => {
      paymentService.getStatus.mockRejectedValue(new Error('DB Error'));

      const response = await request(app).get('/status/TXN123');

      expect(response.status).toBe(500);
    });
  });

  describe('Bank Double Verification - /verify-bank/:merchantTxnId', () => {
    it('Should return verification result from bank', async () => {
      paymentService.verifyTransactionWithBank.mockResolvedValue({
        merchantTxnId: "TXN123",
        isVerified: true,
        bankStatus: "SUCCESS"
      });

      const response = await request(app).get('/verify-bank/TXN123');

      expect(response.status).toBe(200);
      expect(response.body.isVerified).toBe(true);
      expect(response.body.bankStatus).toBe("SUCCESS");
      expect(paymentService.verifyTransactionWithBank).toHaveBeenCalledWith("TXN123");
    });

    it('Should handle error on verification check', async () => {
      paymentService.verifyTransactionWithBank.mockRejectedValue(new Error('Bank Error'));

      const response = await request(app).get('/verify-bank/TXN123');

      expect(response.status).toBe(500);
    });
  });

  describe('Client Returns - /return', () => {
    it('Should handle plain return GET call with status: SUCCESS', async () => {
      const response = await request(app)
        .get('/return')
        .query({ status: 'SUCCESS' });

      expect(response.status).toBe(302);
      expect(response.headers.location).toContain('/payment/success');
      expect(response.headers.location).toContain('data=');
    });

    it('Should handle plain return GET call with status: FAIL', async () => {
      const response = await request(app)
        .get('/return')
        .query({ status: 'FAIL' });

      expect(response.status).toBe(302);
      expect(response.headers.location).toContain('/payment/failure');
      expect(response.headers.location).toContain('data=');
    });

    it('Should decode encrypted return payload and redirect SUCCESS', async () => {
      paymentService.decodeReturnPayload.mockResolvedValue({
        orderInfo: {
          orderStatus: "PAID",
          orderRefNumber: "TXN999",
          orderAmount: 500
        }
      });

      const response = await request(app)
        .get('/return')
        .query({ encryptedPaymentFinalResponse: "dummy_encrypted" });

      expect(response.status).toBe(302);
      expect(paymentService.decodeReturnPayload).toHaveBeenCalledWith("dummy_encrypted");
      expect(response.headers.location).toContain('/payment/success');
    });

    it('Should decode encrypted return payload and redirect FAIL', async () => {
      paymentService.decodeReturnPayload.mockResolvedValue({
        orderInfo: {
          orderStatus: "FAILED",
          orderRefNumber: "TXN999",
          orderAmount: 500
        }
      });

      const response = await request(app)
        .get('/return')
        .query({ encryptedPaymentFinalResponse: "dummy_encrypted" });

      expect(response.status).toBe(302);
      expect(response.headers.location).toContain('/payment/failure');
    });
  });

  describe('Extended Lifecycle Tests', () => {
    it('Success Case - Should process Payment SUCCESS callback', async () => {
      paymentService.callback.mockResolvedValue(true);
      const response = await request(app).post('/callback').send({ merchantTxnId: 'TXN1', status: 'SUCCESS' });
      expect(response.status).toBe(200);
      expect(paymentService.callback).toHaveBeenCalledWith({ merchantTxnId: 'TXN1', status: 'SUCCESS' });
    });

    it('Failure case - Should process Payment FAILURE callback', async () => {
      paymentService.callback.mockResolvedValue(true);
      const response = await request(app).post('/callback').send({ merchantTxnId: 'TXN2', status: 'FAILED' });
      expect(response.status).toBe(200);
      expect(paymentService.callback).toHaveBeenCalledWith({ merchantTxnId: 'TXN2', status: 'FAILED' });
    });

    it('Refund Case - Should process REFUND callback', async () => {
      paymentService.callback.mockResolvedValue(true);
      const response = await request(app).post('/callback').send({ merchantTxnId: 'TXN4', status: 'REFUNDED' });
      expect(response.status).toBe(200);
      expect(paymentService.callback).toHaveBeenCalledWith({ merchantTxnId: 'TXN4', status: 'REFUNDED' });
    });

    it('Double Verification - Log the Double verification API response', async () => {
      paymentService.getStatus.mockResolvedValue({
        merchantTxnId: 'TXN100',
        status: 'SUCCESS',
        bankTxnId: 'SBI999888777',
        amount: 500,
        currency: 'INR'
      });
      // Assuming getPaymentStatus endpoint acts as our double verification API route
      const response = await request(app).get('/status/TXN100');
      
      console.log("=========================================");
      console.log("Double Verification API Response:");
      console.log(JSON.stringify(response.body, null, 2));
      console.log("=========================================");
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('SUCCESS');
      expect(response.body.bankTxnId).toBe('SBI999888777');
    });

    it('Should process Payment ABORT callback', async () => {
      paymentService.callback.mockResolvedValue(true);
      const response = await request(app).post('/callback').send({ merchantTxnId: 'TXN3', status: 'ABORTED' });
      expect(response.status).toBe(200);
      expect(paymentService.callback).toHaveBeenCalledWith({ merchantTxnId: 'TXN3', status: 'ABORTED' });
    });

    it('Should process REFUND callback', async () => {
      paymentService.callback.mockResolvedValue(true);
      const response = await request(app).post('/callback').send({ merchantTxnId: 'TXN4', status: 'REFUNDED' });
      expect(response.status).toBe(200);
      expect(paymentService.callback).toHaveBeenCalledWith({ merchantTxnId: 'TXN4', status: 'REFUNDED' });
    });

    it('Should handle Duplicate Payment gracefully (mocked constraint error)', async () => {
      paymentService.initiate.mockRejectedValue(new Error('SequelizeUniqueConstraintError'));
      const response = await request(app)
        .post('/initiate')
        .send({ student_roll: '123', student_name: 'Test', amount: 500, payment_category: 'CERTIFICATE' });
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to initiate payment');
    });
  });

  describe('System & Security Tests', () => {
    it('Sql Injection Test - Should reject or safely handle malicious strings', async () => {
      // Zod validation should pass these safe strings through, but Sequelize handles escaping.
      // We will ensure the controller processes them without raw DB execution crashing.
      paymentService.initiate.mockResolvedValue({ action: 'http://safe.url' });
      const maliciousName = "'; DROP TABLE Payments; --";
      const response = await request(app)
        .post('/initiate')
        .send({
          student_roll: '123',
          student_name: maliciousName,
          amount: 500,
          payment_category: 'CERTIFICATE'
        });
      
      expect(response.status).toBe(200);
      expect(paymentService.initiate).toHaveBeenCalledWith(expect.objectContaining({
        student_name: maliciousName
      }));
    });

    it('Network failure case - Should return 500 on timeout or service crash', async () => {
      paymentService.initiate.mockRejectedValue(new Error('Network Timeout'));
      const response = await request(app)
        .post('/initiate')
        .send({ student_roll: '123', student_name: 'Test', amount: 500, payment_category: 'CERTIFICATE' });
      
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to initiate payment');
    });

    it('Stress Test - Should handle 50 concurrent payment initiations', async () => {
      paymentService.initiate.mockResolvedValue({ action: 'http://stress-test.url' });
      
      const payload = {
        student_roll: 'STRESS_001',
        student_name: 'Stress Test',
        amount: 500,
        payment_category: 'CERTIFICATE'
      };

      const requests = Array.from({ length: 50 }).map(() => 
        request(app).post('/initiate').send(payload)
      );

      const responses = await Promise.all(requests);
      
      const allSuccess = responses.every(res => res.status === 200 && res.body.action === 'http://stress-test.url');
      expect(allSuccess).toBe(true);
      expect(paymentService.initiate).toHaveBeenCalledTimes(50);
    });
  });

});
