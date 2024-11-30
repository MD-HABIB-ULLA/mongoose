"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidationSchema = void 0;
const zod_1 = require("zod");
// Define userName schema
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required.'),
    middleName: zod_1.z.string().optional(), // Optional middle name
    lastName: zod_1.z.string().min(1, 'Last name is required.'),
});
// Define guardian schema
const guardianSchema = zod_1.z.object({
    name: userNameSchema,
    occupation: zod_1.z.string().min(1, 'Occupation is required.'),
    contactNo: zod_1.z
        .string()
        .min(10, 'Contact number must be at least 10 digits.')
        .max(15, 'Contact number cannot exceed 15 digits.'), // Adjusted for realistic phone number ranges
});
// Define Student schema
const studentValidationSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'Student ID is required.'),
    name: userNameSchema,
    email: zod_1.z.string().email('Invalid email format.').min(1, 'Email is required.'),
    phoneNo: zod_1.z
        .string()
        .min(10, 'Phone number must be at least 10 digits.')
        .max(15, 'Phone number cannot exceed 15 digits.'), // Adjusted for realistic phone number ranges
    profileImage: zod_1.z.string().optional(),
    emergencyContactNo: zod_1.z
        .string()
        .min(10, 'Emergency contact number must be at least 10 digits.')
        .max(15, 'Emergency contact number cannot exceed 15 digits.'),
    gender: zod_1.z.enum(['Male', 'Female', 'other']),
    bloodGroup: zod_1.z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
    dateOfBirth: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (must be YYYY-MM-DD).')
        .optional(),
    presentAddress: zod_1.z
        .string()
        .min(1, 'Present address is required.')
        .max(100, 'Present address cannot exceed 100 characters.'),
    permanentAddress: zod_1.z
        .string()
        .min(1, 'Permanent address is required.')
        .max(100, 'Permanent address cannot exceed 100 characters.'),
    guardian: zod_1.z.object({
        mother: guardianSchema,
        father: guardianSchema,
    }),
    localGuardian: guardianSchema,
    isActive: zod_1.z.boolean(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long.'),
});
exports.studentValidationSchema = studentValidationSchema;
