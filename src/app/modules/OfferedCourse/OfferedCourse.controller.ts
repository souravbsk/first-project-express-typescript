import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseService } from './OfferedCourse.service';
import { Request, Response } from 'express';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.getAllOfferedCoursesFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered courses retrieved successfully',
    data: result,
  });
});

const getSingleOfferedCourses = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OfferedCourseService.getSingleOfferedCourseFromDB(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'OfferedCourse fetched successfully',
      data: result,
    });
  },
);
const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OfferedCourseService.updateOfferedCourseIntoDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered course updated successfully',
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const result = await OfferedCourseService.deleteOfferedCourseFromDB(id);
  console.log('first');
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Offered course deleted successfully',
    data: result,
  });
});
export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourses,
};
