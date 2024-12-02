import { UserService } from './user.service';
import { StatusCodes } from 'http-status-codes';
import createAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createStudent = createAsync(async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserService.createStudentIntoDB(password, studentData);

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

export const UserControllers = {
  createStudent,
};
