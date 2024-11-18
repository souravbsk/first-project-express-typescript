import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { student: studentData } = req.body;

    const result = await StudentServices.createStudentIntoDB(studentData);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Student created successfully',
        data: result,
      });
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Students retrieved successfully',
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Student retrieved successfully',
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getStudentById,
};
