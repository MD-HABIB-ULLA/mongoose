import { z } from 'zod';

// Define userName schema
const userNameSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  middleName: z.string().optional(), // Optional middle name
  lastName: z.string().min(1, 'Last name is required.'),
});

// Define guardian schema
const guardianSchema = z.object({
  name: userNameSchema,
  occupation: z.string().min(1, 'Occupation is required.'),
  contactNo: z
    .string()
    .min(10, 'Contact number must be at least 10 digits.')
    .max(15, 'Contact number cannot exceed 15 digits.'), // Adjusted for realistic phone number ranges
});

// Define Student schema
const studentValidationSchema = z.object({
  id: z.string().min(1, 'Student ID is required.'),
  name: userNameSchema,
  email: z.string().email('Invalid email format.').min(1, 'Email is required.'),
  phoneNo: z
    .string()
    .min(10, 'Phone number must be at least 10 digits.')
    .max(15, 'Phone number cannot exceed 15 digits.'), // Adjusted for realistic phone number ranges
  profileImage: z.string().optional(),
  emergencyContactNo: z
    .string()
    .min(10, 'Emergency contact number must be at least 10 digits.')
    .max(15, 'Emergency contact number cannot exceed 15 digits.'),
  gender: z.enum(['Male', 'Female', 'other']),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (must be YYYY-MM-DD).')
    .optional(),
  presentAddress: z
    .string()
    .min(1, 'Present address is required.')
    .max(100, 'Present address cannot exceed 100 characters.'),
  permanentAddress: z
    .string()
    .min(1, 'Permanent address is required.')
    .max(100, 'Permanent address cannot exceed 100 characters.'),
  guardian: z.object({
    mother: guardianSchema,
    father: guardianSchema,
  }),
  localGuardian: guardianSchema,
  isActive: z.boolean(),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
});

export { studentValidationSchema };
