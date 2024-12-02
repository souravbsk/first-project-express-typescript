import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// get all academic code from db
const getAllAcademicSemesterFromDB = async () => {
  const result = AcademicSemester.find();
  return result;
};

// get academic semester by id from db
const getAcademicSemesterByIdFromDB = async (id: string) => {
  const result = AcademicSemester.findById(id);
  if (!result) {
    throw new Error('Academic Semester not found');
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
    throw new Error('Invalid Semester Code');
  }

  const result = AcademicSemester.findByIdAndUpdate(id, payload, { new: true });

  if (!result) {
    throw new Error('Failed to update Academic Semester');
  }

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getAcademicSemesterByIdFromDB,
  updateAcademicSemesterByIdFromDB,
};
