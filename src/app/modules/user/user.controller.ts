import { UserServices } from './user.service';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createStudent = catchAsync(async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    if (result) {
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Student created successfully',
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
