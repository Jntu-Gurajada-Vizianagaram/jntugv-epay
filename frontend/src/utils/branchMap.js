export const BRANCH_MAP = {
  "01": "Civil Engineering",
  "02": "Mechanical Engineering",
  "03": "Electrical Engineering",
  "04": "Electronics and Communication Engineering",
  "05": "Computer Science and Engineering",
  "06": "Chemical Engineering",
  "07": "Biotechnology",
  "08": "Mining Engineering",
  "09": "Metallurgical Engineering",
  "10": "Aerospace Engineering",
  "11": "Environmental Engineering",
  "12": "Information Technology",
  "13": "Industrial Engineering",
  "14": "Petroleum Engineering",
  "15": "Agricultural Engineering",
  "M01": "M.Tech in Structural Engineering",
  "M02": "M.Tech in Thermal Engineering",
  "M03": "M.Tech in Power Systems",
  "M04": "M.Tech in VLSI Design",

};

export const SPECIALIZATION_MAP = {
  "AI": "Artificial Intelligence",
  "DS": "Data Science",
  "CS": "Cyber Security",
  "SE": "Software Engineering",
  "VLSI": "VLSI Design",
  "CE": "Communication Engineering",
  "R": "Robotics",
  "EM": "Embedded Systems",
  // Add more specializations here...
};

export function detectSpecialization(branchCode) {
  // Simple logic based on branch codes
  if (branchCode.endsWith("AI")) return "AI";
  if (branchCode.endsWith("DS")) return "DS";
  if (branchCode.endsWith("CS")) return "CS";
  if (branchCode.endsWith("SE")) return "SE";
  if (branchCode.endsWith("VLSI")) return "VLSI";
  if (branchCode.endsWith("CE")) return "CE";
  if (branchCode.endsWith("R")) return "R";
  if (branchCode.endsWith("EM")) return "EM";
  return null;
}

/** Parse standard HT number format: YYCCBBTTRRRR
 * /
 * export function parseHTNo(s) {
 * // Standardize
 *  
 * s = s.replace(/\s+/g, "").toUpperCase();
 *   // Example: 21CS01AC05
 *   const regex = /^([0-9]{2})([A-Z0-9]{2,4})([0-9]{2})([A-Z])([0-9]{4})$/;
 *   const match = s.match(regex);
 *  if (!match) {
 *       return { valid: false, raw: s };
 *   }
 *   const [_, year, collegeCode, branchCode, typeCode, roll] = match;
 *  return {
 *     valid: true,
 *    raw: s,
 *    year: parseInt(year, 10) + 2000,
 *  
 *  
 *   collegeCode,
 *   branchCode,
 *   typeCode,
 *   roll: parseInt(roll, 10),
 *  };
 * }
 * /
 * / Example usage:
 * const parsed = parseHTNo("21CS01AC05");
 * if (parsed.valid) {
 *   console.log("Year:", parsed.year);
 *   console.log("College Code:", parsed.collegeCode);
 *   console.log("Branch Code:", parsed.branchCode);
 *  console.log("Type Code:", parsed.typeCode);
 *  console.log("Roll Number:", parsed.roll);
 * } else {
 *  console.log("Invalid HT number format");
 * }
 *  /
 * / Add more branches here...
 * / };
 * / export const SPECIALIZATION_MAP = {
 *  "AI": "Artificial Intelligence",
 *  "DS": "Data Science", 
 * "CS": "Cyber Security",
 * "SE": "Software Engineering",
 * "VLSI": "VLSI Design",
 * "CE": "Communication Engineering",
 *  "R": "Robotics",
 * "EM": "Embedded Systems",
 * // Add more specializations here...
 * };
 * / export function detectSpecialization(branchCode) {
 *  // Simple logic based on branch codes
 *  if (branchCode.endsWith("AI")) return "AI";
 * if (branchCode.endsWith("DS")) return "DS";
 * if (branchCode.endsWith("CS")) return "CS";
 * if (branchCode.endsWith("SE")) return "SE";
 * if (branchCode.endsWith("VLSI")) return "VLSI";
 * if (branchCode.endsWith("CE")) return "CE";
 * if (branchCode.endsWith("R")) return "R";
 * if (branchCode.endsWith("EM")) return "EM";
 * return null;
 * }
 * */