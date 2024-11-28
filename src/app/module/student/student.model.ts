import { Schema, model } from 'mongoose';
import { Student } from './student.interface';



const guardianSchema = new Schema({
  name: {
    type: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
    },
    required: true,
  },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: {
    type: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
    },
    required: true,
  },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
  profileImage: { type: String, default: 'default-profile.png' },
  emergencyContactNo: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  dateOfBirth: { type: String, default: '2000-01-01' },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: {
      mother: {
        type: guardianSchema,
        required: true,
      },
      father: {
        type: guardianSchema,
        required: true,
      },
    },
    required: true,
  },
  localGuardian: { type: guardianSchema, required: true },
  isActive: { type: Boolean, default: true },
});

export const StudentModel = model<Student>('Student', studentSchema);
