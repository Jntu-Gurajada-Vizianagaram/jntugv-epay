export const isValidHTNo = (ht = "") => {
  // Standardize
  const s = ht.replace(/\s+/g, "").toUpperCase();

  // Pattern:
  // YY + (2-4 alphanumeric dept/college code) + 1 alphabet + 4 digits
  const regex = /^[0-9]{2}[A-Z0-9]{2,4}[A-Z][0-9]{4}$/;

  return regex.test(s);
};

export const isValidAmount = (amt) => {
  const num = parseFloat(amt);
  return !isNaN(num) && num > 0 && num < 1000000; // amount between 0 and 1 million
}
