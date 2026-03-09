require('dotenv').config({ path: 'e:/jntugv-pay/backend/.env' });
const { SBIEPayClient } = require("epay_nodejs_sdk");

const encryptedFinalResponse = "YVhRTnFQdktOU0IwOEpOcWlWQ2RsaFA3SkFzd1lETktPb1F4Z0hWdENuR1RWMjlYM2tWay9QOTA1WEQrL1NONXV0V0hqQWZNVGp3N3hyUWFtRzVrY3JjdmZmeEJZUGxkS2d3Sk1SU3BvNi82enpRbTc2SGhhZTBDOGlYQnRGQm1XVDcrdkt1c3ZYNDczV0tKdmlNSTFVVzhoaUNJNjM1azRwWlFwK0prOFBmdTU3N2pEcHFaS1JVcGZsdWViQTZxclpRR0R0eHRRYzhsWHRLUkE2YzlSbnJEZTFWZzhYcVIvRXJOL2REWnVjZUUzdnZ6WjJLNllQSUJSK2o5dXMyaFdJckVES1MyWFo1TlIrSVFndXRrcUlTUVYwdExCd2hqUTRJY29iNkc0cW1YN3Z0SlhiTHl1RjZmRmtzbDloNmtpc3RnM3pZQTZuNDNLM3RnNWhRSG1DS1hUMDA3bVN4T0czRndBV1ptK3Ezc3M4K2pMcmV6K1AvY2VvYmIrU3RXV09JT21CNmprVDYxUGkwcmlwWkd2RE83bU1VbmVqeWtBNnhucWcwbzlndUZzcmYrWkNJWHQ5amZ2NFVSbHZIVDNhNDZlUjA4eWhZN0xxOWRuZnZ2TTZLSkY5b3ZGQ1RSUE40d0JEcGNONmdiWUFnc1BRWDFRbTZ3Q3lFb2xiK0NkV1dxYWRiYmFJUmd0dTdMS1FzZHVwc3hYeEN1UVpzWk9FNEZ2S1RtdnFoNVhrdHpPRUpxTjJxbm9pWTJyZHJLaHFUaEVBYmdONGxNcjJhdGZWM1A1bXI5VThKN3Ric05BN3pRMmRMZ0FMeERFQWFRZXc9PQ";

async function testSDKDecode() {
    try {
        const sbiePayClient = new SBIEPayClient({
            apiKey: process.env.SBI_MERCHANT_ID,
            apiSecret: process.env.SBI_MERCHANT_KEY,
            encryptionKey: process.env.SBI_ENCRYPTION_KEY_BASE64
        }, 'SANDBOX', true);

        const decoded = await sbiePayClient.crypto.decodeCallback(encryptedFinalResponse);
        console.log("Decoded via decodeCallback:", decoded);
    } catch (e) {
        console.error("Failed to decode final response via SDK:", e);
    }
}

testSDKDecode();
