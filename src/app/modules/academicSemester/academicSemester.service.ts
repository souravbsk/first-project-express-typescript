import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import {
  academicSemesterField,
  academicSemesterNameCodeMapper,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// get all academic code from db
const getAllAcademicSemesterFromDB = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(academicSemesterField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await academicSemesterQuery.modelQuery;
  return result;
};

// get academic semester by id from db
const getAcademicSemesterByIdFromDB = async (id: string) => {
  const result = AcademicSemester.findById(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic Semester not found');
  }
  return result;
};

// update academic semester by id from db
const updateAcademicSemesterByIdFromDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = AcademicSemester.findByIdAndUpdate(id, payload, { new: true });

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Failed to update Academic Semester',
    );
  }

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getAcademicSemesterByIdFromDB,
  updateAcademicSemesterByIdFromDB,
};
