import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// get all academic faculties
const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

// get academic faculty by id
const getSingleAcademicFacultyByFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// update academic faculty by id
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// delete academic faculty by id
const deleteAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};
export const AcademicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyByFromDB,
  updateAcademicFacultyIntoDB,
  deleteAcademicFacultyFromDB,
};
