import { Request, Response } from 'express';
import { studentServices } from './student.service';
import { studentValidationSchema } from './student.validation';
import { z } from 'zod';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;

    // Validate the input using Zod
    const zodData = studentValidationSchema.parse(student);

    // Save the validated data to the database
    await studentServices.createStudentIntoDB(zodData);

    res.status(201).json({
      success: true,
      message: 'Student created successfully.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join('.'), // Combine array paths into a readable string
        message: err.message,
      }));

      res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: formattedErrors,
      });
    } else {
      // Handle other errors
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';
      res.status(500).json({
        success: false,
        message: errorMessage,
      });
    }
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
