import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(
    req.body,
  );
  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Academic Department created successfully',
      success: true,
      data: result,
    });
  }
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.getAllAcademicDepartmentFromDB(
    req.query,
  );
  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Academic Department fetched successfully',
      success: true,
      meta: result.meta,
      data: result.result,
    });
  }
});

const getSIngleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  console.log(departmentId);
  const result =
    await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(
      departmentId,
    );
  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Academic Department  fetched successfully',
      success: true,
      data: result,
    });
  }
});

const updateAcademicDepartmentById = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await AcademicDepartmentService.updateAcademicDepartmentById(
    departmentId,
    req.body,
  );
  if (result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Academic Department updated successfully',
      success: true,
      data: result,
    });
  }
});

export const AcademicDepartmentControllers = {
  createAcademicFaculty,
  getAllAcademicDepartment,
  getSIngleAcademicDepartment,
  updateAcademicDepartmentById,
};
