
import { COLLEGE_MAP } from "./collegeMap";
import { BRANCH_MAP } from "./branchMap";

// Helper — Check if a string is digits only
const isDigits = (str) => /^[0-9]+$/.test(str);

/**
 * Universal JNTU-GV Hallticket Parser
 * Supports formats:
 *  - 22VV5A1203
 *  - 22U41A1203
 *  - 22MT1A1207
 *  - 22U41D0054
 *  - PHD20CSE001
 */
export function parseHTNumber(ht = "") {
  const s = ht.replace(/\s+/g, "").toUpperCase();
  if (!s) return { valid: false, error: "Empty Hallticket Number" };

  // ----------------------------
  // 1) Ph.D Format
  // ----------------------------
  if (s.startsWith("PHD")) {
    return parsePhDFormat(s);
  }

  // ----------------------------
  // 2) Regular UG/PG Format
  // Pattern: YY + COLLEGE(2–4) + BRANCH_CODE(1) + TYPE(1) + ROLL(4)
  // Example: 22VV5A1203
  // ----------------------------

  const regex = /^([0-9]{2})([A-Z0-9]{2,4})([A-Z0-9])([A-Z])([0-9]{4})$/;

  const m = s.match(regex);
  if (!m) return { valid: false, error: "Invalid Hallticket Format" };

  const [_, year, collegeCode, branchCode, typeCode, roll] = m;

  // Resolve college & branch names
  const collegeName = COLLEGE_MAP[collegeCode] || "Unknown / Affiliated College";
  const branchName = BRANCH_MAP[branchCode] || "Unknown Branch";

  const course = detectCourse(branchCode, typeCode);

  return {
    valid: true,
    raw: s,

    // Basics
    year,
    collegeCode,
    branchCode,
    typeCode,
    roll,

    // Resolved values
    college: collegeName,
    branch: branchName,
    course,
  };
}

/**
 * Parse Ph.D format: PHD20CSE001
 */
function parsePhDFormat(s) {
  // example: PHD20CSE001
  const regex = /^PHD([0-9]{2})([A-Z]{2,4})([0-9]{3})$/;

  const match = s.match(regex);
  if (!match) {
    return {
      valid: true, // still allow PhD with unknown format
      raw: s,
      course: "Ph.D Program",
      college: "JNTU-GV Research Program",
      branch: "Research Scholar",
    };
  }

  const [_, year, branch, roll] = match;

  return {
    valid: true,
    raw: s,
    year,
    branch,
    roll,
    course: "Ph.D Program",
    college: "JNTU-GV Research Program",
  };
}

/**
 * Determine course type based on branchCode + typeCode
 */
function detectCourse(branchCode, typeCode) {
  // B.Tech branches usually 1–7
  if (/^[1-7]$/.test(branchCode)) return "B.Tech";

  // Diploma / Lateral Entry
  if (branchCode === "D") return "Diploma / Lateral Entry";

  // M.Tech specializations
  if (["A", "B", "C"].includes(branchCode)) return "M.Tech";

  // MCA pattern
  if (typeCode === "S") return "MCA";

  // MBA pattern
  if (typeCode === "M") return "MBA";

  return "Unknown Program";
}
