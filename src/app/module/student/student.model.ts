import { Schema, model } from 'mongoose';
import { TStudent, StudentMethod, StudentModel } from './student.interface';

// Guardian schema with validation and error messages
const GuardianSchema = new Schema({
  name: {
    type: {
      firstName: {
        type: String,
        required: [true, 'Guardian first name is required.'],
        maxlength: [20, 'First name cannot exceed 20 characters.'],
      },
      middleName: {
        type: String,
        maxlength: [20, 'Middle name cannot exceed 20 characters.'],
      },
      lastName: {
        type: String,
        required: [true, 'Guardian last name is required.'],
        maxlength: [20, 'Last name cannot exceed 20 characters.'],
      },
    },
    required: [true, 'Guardian name is required.'],
  },
  occupation: {
    type: String,
    required: [true, 'Guardian occupation is required.'],
    maxlength: [20, 'Occupation cannot exceed 20 characters.'],
  },
  contactNo: {
    type: String,
    required: [true, 'Guardian contact number is required.'],
    validate: {
      validator: (value: string) => /^\d{10}$/.test(value),
      message: 'Guardian contact number must be a valid 10-digit number.',
    },
  },
});

// Main student schema with validation and error messages
const studentSchema = new Schema<TStudent, StudentModel, StudentMethod>({
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
    unique: true,
    maxlength: [20, 'Student ID cannot exceed 20 characters.'],
  },
  name: {
    type: {
      firstName: {
        type: String,
        required: [true, 'Student first name is required.'],
        maxlength: [20, 'First name cannot exceed 20 characters.'],
      },
      middleName: {
        type: String,
        maxlength: [20, 'Middle name cannot exceed 20 characters.'],
      },
      lastName: {
        type: String,
        required: [true, 'Student last name is required.'],
        maxlength: [20, 'Last name cannot exceed 20 characters.'],
      },
    },
    required: [true, 'Student name is required.'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNo: {
    type: String,
    required: [true, 'Phone number is required.'],
    maxlength: [20, 'Phone number cannot exceed 20 characters.'],
  },
  profileImage: {
    type: String,
    default: 'default-profile.png',
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
    maxlength: [20, 'Emergency contact number cannot exceed 20 characters.'],
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  dateOfBirth: {
    type: String,
    default: '2000-01-01',
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
    maxlength: [100, 'Present address cannot exceed 100 characters.'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required.'],
    maxlength: [100, 'Permanent address cannot exceed 100 characters.'],
  },
  guardian: {
    type: {
      mother: {
        type: GuardianSchema,
        required: true,
      },
      father: {
        type: GuardianSchema,
        required: true,
      },
    },
    required: true,
  },
  localGuardian: {
    type: GuardianSchema,
    required: true,
  },
  isActive: { type: Boolean, default: true },
});

studentSchema.methods.isStudentExist = async function (id: string) {
  const existingStudent = await Student.findOne({ id });

  return existingStudent;
};
// Export the Student model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
