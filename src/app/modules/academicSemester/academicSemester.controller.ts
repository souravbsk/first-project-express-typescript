import { StatusCodes } from 'http-status-codes';
import { AcademicSemesterServices } from './academicSemester.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../errors/AppError';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

// get all academic semester

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB(
    req.query,
  );

  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester retrieved successfully',
      meta: result.meta,
      data: result.result,
    });
  }
});

// get academic semester by id from db

const getAcademicSemesterById = catchAsync(async (req, res) => {
  const semesterId = req.params.semesterId;
  if (!semesterId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'semester id is required');
  }

  const result =
    await AcademicSemesterServices.getAcademicSemesterByIdFromDB(semesterId);
  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester retrieved successfully',
      data: result,
    });
  }
});

// update academic semester by id from db
const updateAcademicSemesterById = catchAsync(async (req, res) => {
  const semesterId = req.params.semesterId;
  if (!semesterId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'semester id is required');
  }
  const result =
    await AcademicSemesterServices.updateAcademicSemesterByIdFromDB(
      semesterId,
      req.body,
    );

  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester updated successfully',
      data: result,
    });
  }
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getAcademicSemesterById,
  updateAcademicSemesterById,
};
