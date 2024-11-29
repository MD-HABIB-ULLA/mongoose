import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
const getAllStudentDataFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
const getSingleStudentDataFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentDataFromDB,
  getSingleStudentDataFromDB,
};
