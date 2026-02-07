const axios = require('axios');

const BASE_URL = process.env.API_URL || 'http://localhost:4000/api/payment';

// Example Valid Data matching common use case
const params = {
    student_roll: "20J41A0501",
    student_name: "John Doe",
    amount: 2500,
    payment_category: "UNIVERSITY_EXAMINATION",
    semester: "4-1",
    payment_type: "REGULAR",
    email: "john.doe@example.com",
    mobile: "9876543210",
    // Optional fields for context
    year: "4",
    course: "B.Tech",
    branch_code: "05",
    branch_name: "CSE",
    college_code: "J4",
    college_name: "JNTU-GV College of Engineering"
};

async function testInitiate() {
    try {
        console.log("------------------------------------------");
        console.log("Testing GET /initiate with Mock Params...");
        console.log("Target URL:", `${BASE_URL}/initiate`);
        console.log("Params:", JSON.stringify(params, null, 2));
        console.log("------------------------------------------");

        const response = await axios.get(`${BASE_URL}/initiate`, { params });

        console.log("\n✅ Success! Response Received:");
        console.log(JSON.stringify(response.data, null, 2));

        console.log("------------------------------------------");
        if (response.data.action) {
            console.log("To simulate the payment user flow:");
            console.log("1. Open the browser.");
            console.log(`2. Navigate to the returned action URL (or POST the fields to it).`);
            console.log(`   Action: ${response.data.action}`);
        }
        console.log("------------------------------------------");

    } catch (error) {
        console.error("\n❌ Error Testing Payment Initiation:");
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Connection Error:", error.message);
            console.error("Is the backend server running on port 4000?");
        }
    }
}

testInitiate();
