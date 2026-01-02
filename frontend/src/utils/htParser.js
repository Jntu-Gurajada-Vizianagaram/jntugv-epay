
import { COLLEGE_MAP } from "./collegeMap";
import { BRANCH_MAP } from "./branchMap";

/**
 * Universal JNTU-GV Hallticket Parser
 * Supports formats:
 *  - 
 *  - 22022P0101 (Ph.D)

 */
export function parseHTNumber(ht = "") {
  const s = ht.replace(/\s+/g, "").toUpperCase();
  if (!s) return { valid: false, error: "Empty Hallticket Number" };

  // ----------------------------
  // 1) Ph.D Format (New Data Dump)
  // Pattern: YY(2) + '022P' + BRANCH(2-3) + ROLL(2-3)
  // Ex: 22022P0101, 19022PMET01
  // ----------------------------
  if (s.includes("022P")) {
    return parseNewPhDFormat(s);
  }

  // ----------------------------
  // 2) Old Ph.D Format
  // ----------------------------
  if (s.startsWith("PHD")) {
    return parseOldPhDFormat(s);
  }

  // ----------------------------
  // 3) Regular UG/PG Format
  // Pattern: YY(2) + COLLEGE(2) + TYPE(1) + ADMISSION_TYPE(1) + BRANCH(2) + ROLL(2 or 4)
  // Ex: 22VV1A1203, 22VV5A1273
  // ----------------------------
  // Regex Breakdown:
  // ([0-9]{2})       -> Year
  // ([A-Z0-9]{2})    -> College Code (VV, U4, etc)
  // ([A-Z0-9])       -> Course Code (1=B.Tech, 5=Lateral, etc)
  // ([A-Z])          -> Admission Type (A=Regular, D=Diploma, etc)
  // ([0-9]{2})       -> Branch Code (12, 05, etc)
  // ([0-9]{2,4})     -> Roll Number (03, 1273)
  const regex = /^([0-9]{2})([A-Z0-9]{2})([A-Z0-9])([A-Z])([0-9]{2})([0-9]{2,4})$/;

  const m = s.match(regex);
  if (!m) return { valid: false, error: "Invalid Hallticket Format" };

  const [_, year, collegeCode, courseCode, typeCode, branchCode, roll] = m;

  // Resolve college & branch names
  const collegeName = COLLEGE_MAP[collegeCode] || "Unknown / Affiliated College";
  const branchName = BRANCH_MAP[branchCode] || "Unknown Branch";

  return {
    valid: true,
    raw: s,
    year,
    collegeCode,
    branchCode,
    courseCode,
    typeCode,
    roll,
    college: collegeName,
    branch: branchName,
    course: detectCourse(branchCode, courseCode, typeCode),
  };
}

/**
 * Parse New Ph.D format: 22022P0101
 * Regex: YY(2) + 022P + BRANCH(2 to 3 chars) + ROLL(2 to 3 chars)
 */
function parseNewPhDFormat(s) {
  // Try matching standard MM numeric branch first: 22022P0501
  // YY(2) + 022P + BRANCH(2) + ROLL(2+)
  const regexNumeric = /^([0-9]{2})022P([0-9]{2})([0-9]{2,})$/;
  const mNum = s.match(regexNumeric);

  if (mNum) {
    const [_, year, branchCode, roll] = mNum;
    return {
      valid: true,
      raw: s,
      year,
      course: "Ph.D Program",
      college: "JNTU-GV Research",
      branchCode,
      branch: BRANCH_MAP[branchCode] || "Research Scholar",
      roll
    };
  }

  // Try alpha branch: 19022PMET01, 22022P0MG01
  const regexAlpha = /^([0-9]{2})022P([A-Z0-9]{2,4})([0-9]{2,})$/;
  const mAlpha = s.match(regexAlpha);

  if (mAlpha) {
    const [_, year, branchCode, roll] = mAlpha;
    // Map special codes
    let branchName = "Research Scholar";
    if (branchCode === "MET") branchName = "Metallurgical Engineering";
    if (branchCode === "0MG" || branchCode === "MG") branchName = "Management (MBA)";

    return {
      valid: true,
      raw: s,
      year,
      course: "Ph.D Program",
      college: "JNTU-GV Research",
      branchCode,
      branch: branchName,
      roll
    };
  }

  // Fallback
  return {
    valid: true,
    raw: s,
    course: "Ph.D Program",
    college: "JNTU-GV Research",
    branch: "Research Scholar",
  };
}

function parseOldPhDFormat(s) {
  // PHD20CSE001
  const regex = /^PHD([0-9]{2})([A-Z]{2,5})([0-9]{3})$/;
  const match = s.match(regex);
  if (match) {
    return {
      valid: true,
      raw: s,
      year: match[1],
      branch: match[2],
      roll: match[3],
      course: "Ph.D Program",
      college: "JNTU-GV Research",
    };
  }
  return { valid: true, raw: s, course: "Ph.D Program" };
}

function detectCourse(branchCode, courseCode, typeCode) {
  const code = courseCode + typeCode; // Added this line for correctness based on the instruction's usage of 'code'

  if (code === "1A") return "B.Tech (Regular)";
  if (code === "5A") return "B.Tech (Lateral Entry)";
  if (code === "1R") return "B.Pharmacy";
  if (code === "1T") return "Pharm D";
  if (code === "1S") return "M.Pharmacy";
  if (code === "1E") return "MBA";
  if (code === "1F") return "MCA";

  if (typeCode === "S") return "MCA";
  if (typeCode === "M") return "MBA";
  if (branchCode === "D") return "Diploma";
  if (["A", "B", "C", "D"].includes(branchCode)) return "M.Tech";

  return "PG / Other";
}
