import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  console.log(payload);
  const result = await AcademicDepartment.create(payload);
  console.log(result);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

const updateAcademicDepartmentById = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Department does not exist');
  }

  return result;
};
export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentById,
};
