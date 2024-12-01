import { StatusCodes } from 'http-status-codes';
import createAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = createAsync(async (req, res) => {
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

const getAllAcademicSemester = createAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester retrieved successfully',
      data: result,
    });
  }
});

// get academic semester by id from db

const getAcademicSemesterById = createAsync(async (req, res) => {
  const semesterId = req.params.semesterId;
  if (!semesterId) {
    throw new Error('semester id is required');
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
const updateAcademicSemesterById = createAsync(async (req, res) => {
  const semesterId = req.params.semesterId;
  if (!semesterId) {
    throw new Error('semester id is required');
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
