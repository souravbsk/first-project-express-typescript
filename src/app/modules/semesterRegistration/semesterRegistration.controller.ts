import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { SemesterRegistrationServices } from './semesterRegistration.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
        req?.body,
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester registration created successfully',
      data: result,
    });
  },
);

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
        req?.query,
      );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester registrations retrieved successfully',
      data: result,
    });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(
        id,
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester registration retrieved successfully',
      data: result,
    });
  },
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester registration updated successfully',
      data: result,
    });
  },
);

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
