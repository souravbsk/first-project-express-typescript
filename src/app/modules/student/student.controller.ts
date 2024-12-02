/* eslint-disable @typescript-eslint/no-explicit-any */
import { StudentServices } from './student.service';
import { StatusCodes } from 'http-status-codes';
import createAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// import StudentValidationSchema from './student.validation';

const getAllStudents = createAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  }
});

const getStudentById = createAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  }
});

const deleteStudent = createAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  }
});

export const StudentControllers = {
  getAllStudents,
  getStudentById,
  deleteStudent,
};
