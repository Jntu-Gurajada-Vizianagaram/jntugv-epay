export const COLLEGE_MAP = {
  "U4": "Dadi Institute of Engineering & Technology",
  "6E": "Gonna Institute of Information Technology & Science",
  "6J": "Simhadhri Educational Society Group of Institutions",
  "A5": "Aditya Institute of Technology & Management",
  "MT": "Sri Venkateswara College of Engineering & Technology",
  "W6": "Sri Sivani College of Engineering",
  "98": "Raghu Engineering College",
  "L3": "Vignans Institute of Information Technology",
  "L6": "Chaitanya Engineering College",
  "NM": "Vignans Institute of Engineering for Women",
  "NR": "Baba Institute of Technology & Science",
  "NT": "Visakha Institute of Engineering & Technology",
  "NU": "Nadimpalli Satyanarayana Raju Institute of Technology",
  "6F": "Sai Ganapathi Engineering College",
  "34": "GMR Institute of Technology",
  "33": "MVGR College of Engineering",
  "99": "Avanthis St. Theressa Institute of Engineering & Technology",
  "HQ": "Avanthis Research & Technological Academy",
  "KD": "Lendi Institute of Engineering & Technology",
  "Q7": "Avanthi Institute of Engineering & Technology",
  "6C": "Miracle Educational Society Group of Institutions",
  "8K": "Gokul Group of Institutions",
  "B6": "Satya Institute of Technology & Management",
  "PC": "N S Raju Institute of Engineering and Technology",
  "V1": "Behara College of Engineering and Technology",
  "DA": "Sri Sivani College of Pharmacy",
  "AC": "Vignan Institute of Pharmaceutical Technology",
  "PK": "Viswanadha Institute of Pharmaceutical Sciences",
  "B7": "Emmanuel College of Pharmacy",
  "T5": "Avanthi Institute of Pharmaceutical Sciences",
  "VV": "JNTU-GV College of Engineering (A), Vizianagaram",
  "GV": "JNTU-GV College of Pharmaceutical Sciences, Vizianagaram",
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
