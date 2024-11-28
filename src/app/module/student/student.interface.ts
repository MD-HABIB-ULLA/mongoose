export type userName = {
  firstName: string;
  middleName?: string;  // Optional for students with middle names
  lastName: string;
};

export type guardian = {
  name: userName;
  occupation: string;
  contactNo: string;
};
export type Student = {
  id: string;
  name: userName;
  email: string;
  phoneNo: string;
  profileImage: string;
  emergencyContactNo: string;
  gender: 'Male' | 'Female' ;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  dateOfBirth?: string; // Format: "YYYY-MM-DD"
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    mother: guardian;
    father: guardian;
  };
  localGuardian: guardian;
  isActive: boolean;
};
