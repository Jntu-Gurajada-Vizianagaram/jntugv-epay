
import { z } from "zod";

export const PaymentInitiateSchema = z.object({
    student_roll: z.string().min(1, "Student Roll Number is required"),
    student_name: z.string().min(1, "Student Name is required"),
    amount: z.preprocess(
        (a) => parseFloat(a),
        z.number().positive("Amount must be positive")
    ),
    payment_category: z.enum([
        "UNIVERSITY_EXAMINATION",
        "PHD_FEE",
        "CERTIFICATE",
        "ADMISSION",
        "AFFILIATION",
        "HOSTEL_FEE",
        "OTHER_FEE"
    ]),
    payment_type: z.string().optional(),

    email: z.string().email("Invalid email").optional().or(z.literal("")),
    mobile: z.string().regex(/^[0-9]{10}$/, "Invalid mobile number").optional().or(z.literal("")),

    father_name: z.string().optional(),
    study_status: z.string().optional(),
    year: z.string().optional(),
    semester: z.string().optional(),
    college_code: z.string().optional(),
    college_name: z.string().optional(),
    branch_code: z.string().optional(),
    branch_name: z.string().optional(),
    course: z.string().optional(),
    roll_number: z.string().optional(),

    // Specific Fee Details
    payment_subtype: z.string().optional(),
    remarks: z.string().optional(),
    department: z.string().optional(),
    fee_type: z.string().optional(),
    approval_letter_ref: z.string().optional(),
    admission_ref: z.string().optional(),
    branch: z.string().optional(),
    category: z.string().optional(),
    gender: z.string().optional(),
    dob: z.string().optional(),
    aadhar: z.string().optional(),
    address: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.payment_category === "UNIVERSITY_EXAMINATION" && !data.semester) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Semester is required",
            path: ["semester"],
        });
    }
    if (data.payment_category === "PHD_FEE" && !data.fee_type) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Fee Type is required",
            path: ["fee_type"],
        });
    }
});
