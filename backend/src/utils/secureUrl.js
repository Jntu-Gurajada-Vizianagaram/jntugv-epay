const crypto = require('crypto');

// Use a persistent key for the session/app lifetime or from env
// In production, this should be in .env: SYSTEM_ENCRYPTION_KEY
const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = process.env.SYSTEM_ENCRYPTION_KEY
    ? Buffer.from(process.env.SYSTEM_ENCRYPTION_KEY, 'hex')
    : crypto.createHash('sha256').update(process.env.APP_SECRET || 'fallback-secret-key-jntugv').digest();

const IV_LENGTH = 16;

exports.encryptData = (data) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
};

exports.decryptData = (text) => {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = parts.join(':');
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
};
