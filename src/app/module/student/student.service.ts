import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  const student = new Student(studentData);
  if (await student.isStudentExist(studentData.id)) {
    throw new Error('Student already exists');
  }

  const result = await Student.create(studentData);

  return result;
};



const getAllStudentDataFromDB = async () => {
  const result = await Student.find();
  return result;
};



const getSingleStudentDataFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentDataFromDB,
  getSingleStudentDataFromDB,
};
