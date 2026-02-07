# API Documentation - Payment Initiation

## Overview
This document outlines the API endpoints and frontend hooks available for initiating payments in the JNTU-GV Payment System.

## Endpoints

### 1. Initiate Payment (POST)
**Route**: `/api/payment/initiate`
**Method**: `POST`
**Description**: Initiates a new payment transaction. Validates the payload using Zod before processing.

**Request Body (JSON)**:
Must conform to the `PaymentInitiateSchema`.

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `student_roll` | String | Yes | Student Roll Number |
| `student_name` | String | Yes | Student Name |
| `amount` | Number | Yes | Amount to pay |
| `payment_category`| Enum | Yes | One of: UNIVERSITY_EXAMINATION, PHD_FEE, CERTIFICATE, ADMISSION, AFFILIATION, HOSTEL_FEE, OTHER_FEE |
| `payment_type` | String | No | Specific type within category |
| `email` | String | No | Valid email |
| `mobile` | String | No | 10-digit mobile number |
| ... | ... | ... | (See specific category fields below) |

**Category Specific Fields**:
- **UNIVERSITY_EXAMINATION**: `semester` (Required)
- **PHD_FEE**: `fee_type` (Required), `department`, `remarks`
- **CERTIFICATE**: `payment_subtype` (certificate type)
- **ADMISSION**: `category`, `gender`, `dob`, `aadhar`, `address`
- **AFFILIATION**: `payment_subtype` (affiliation type), `college_code`, `college_name`

**Response (JSON)**:
```json
{
  "action": "https://secure.sbi.co.in/...",
  "merchantTxnId": "JNTUGV-12345...",
  "fields": {
    "merchantId": "...",
    "encRequest": "...",
    "amount": "100.00",
    "returnUrl": "...",
    "callbackUrl": "..."
  }
}
```

### 2. Initiate Payment View (GET)
**Route**: `/api/payment/initiate`
**Method**: `GET`
**Description**: Similar to POST but accepts parameters via Query String. Useful for testing or simple link-based initiation.

**Query Parameters**:
Same as POST body fields.

**Response**:
Same as POST response.

### 3. Example Usage

**Quick Test (Browser/GET):**
To test the initiation flow with mock data, ensure your backend is running (`npm start`) and visit the following URL in your browser:

```
http://localhost:4000/api/payment/initiate?student_roll=20J41A0501&student_name=TestUser&amount=100&payment_category=OTHER_FEE&email=test@example.com&mobile=9988776655
```

**Quick Test (cURL/POST):**
```bash
curl -X POST http://localhost:4000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "student_roll": "20J41A0501",
    "student_name": "Test User",
    "amount": 500,
    "payment_category": "UNIVERSITY_EXAMINATION",
    "semester": "3-1",
    "email": "test@example.com",
    "mobile": "9876543210"
  }'
```

**Running the Test Script:**
We have provided a convenience script to test this endpoint:
```bash
# From backend directory
node scripts/test_initiate_payment.js
```

## Frontend Hooks (TanStack Query)

Located in `frontend/src/hooks/usePaymentServer.js`.

### `useInitiatePayment` (Mutation)
```javascript
import { useInitiatePayment } from '../hooks/usePaymentServer';

const { mutate, isLoading, error } = useInitiatePayment();

const handleSubmit = (data) => {
  mutate(data, {
    onSuccess: (response) => {
      console.log("Redirecting to:", response.action);
    }
  });
};
```

### `useGetInitiatePayment` (Query)
```javascript
import { useGetInitiatePayment } from '../hooks/usePaymentServer';

const { data, isLoading } = useGetInitiatePayment({ 
  student_roll: "123", 
  amount: 500, 
  payment_category: "OTHER_FEE" 
});
```

## Schemas (Zod)

Located in:
- Backend: `backend/src/validators/paymentValidator.js`
- Frontend: `frontend/src/schemas/paymentSchema.js`

Both schemas share the same structure to ensure consistent validation across the stack.
