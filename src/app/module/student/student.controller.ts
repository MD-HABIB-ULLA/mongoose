import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    const result = await studentServices.createStudentIntoDB(student);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the student',
      error: error,
    });
  }
};
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentDataFromDB();
    res.status(200).json({
      success: true,
      message: 'Successfully retrieved all student data.',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve student data. Please try again later.',
      error: (error as Error).message,
    });
  }
};

export const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.studentId;
    const result = await studentServices.getSingleStudentDataFromDB(id);

    if (!result) {
      res.status(404).json({
        success: false,
        message: `No student found with the ID: ${id}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Successfully retrieved data for student with ID: ${id}`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the student data.',
      error: (error as Error).message,
    });
  }
};



export const studentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
