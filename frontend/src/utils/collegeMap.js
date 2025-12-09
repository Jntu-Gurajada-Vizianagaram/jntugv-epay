export const COLLEGE_MAP = {
  "VV": "JNTU-GV College of Engineering, Vizianagaram",
  "U41": "University College of Engineering Narasaraopet",
  "MT1": "Matrusri Engineering College (Affiliated)",
  "CS": "College of Science (Old Format)",
  // Add more colleges here...
};



export const TYPE_MAP = {
    "1": "Regular",
    "5": "Lateral Entry",
};

export function detectCourse(branchCode, typeCode) {
    // Simple logic based on branch and type codes
    if (/^[1-7]$/.test(branchCode)) return "B.Tech";
    if (/^M[0-9]{2}$/.test(branchCode)) return "M.Tech";
    if (branchCode === "PHD") return "Ph.D";
    return "Other";
}
/** Parse standard HT number format: YYCCBBTTRRRR
 */
// export function parseHTNo(s) {
//   // Standardize
//   s = s.replace(/\s+/g, "").toUpperCase();
//     // Example: 21CS01AC05
//     const regex = /^([0-9]{2})([A-Z0-9]{2,4})([0-9]{2})([A-Z])([0-9]{4})$/;
//     const match = s.match(regex);
//     if (!match) {
//         return { valid: false, raw: s };
//     }   
//     const [_, year, collegeCode, branchCode, typeCode, roll] = match;









