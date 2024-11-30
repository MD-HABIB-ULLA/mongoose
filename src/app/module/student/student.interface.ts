import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string; // Optional for students with middle names
  lastName: string;
};

export type TGuardian = {
  name: TUserName;
  occupation: string;
  contactNo: string;
};
export type TStudent = {
  id: string;
  name: TUserName;
  email: string;
  phoneNo: string;
  profileImage?: string;
  emergencyContactNo: string;
  gender: 'Male' | 'Female' | 'other';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  dateOfBirth?: string; // Format: "YYYY-MM-DD"
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    mother: TGuardian;
    father: TGuardian;
  };
  localGuardian: TGuardian;
  isActive: boolean;
};

export type StudentMethod = {
  isStudentExist(id: string): Promise<TStudent | null>;
};

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethod
>;
