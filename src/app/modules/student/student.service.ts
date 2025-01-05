import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import User from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableField } from './student.conostant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate('academicDepartment academicFaculty'),
    query,
  )
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  console.log(result);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // transaction -1
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete student');
    }
    // transaction -2
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to delete student',
    );
  }
};

// raw search filter
// const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
//   const queryObj = { ...query }; // copy query object

//   //filtering
//   const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
//   excludeFields.forEach((field) => delete queryObj[field]);
//   console.log(`base query:`, query, queryObj);

//   // for search query step -1
//   let searchTerm = '';
//   if (query?.searchTerm) {
//     searchTerm = query.searchTerm as string;
//   }

//   // Select filed for searchTerm
//   const studentSearchableField = ['email', 'name.firstName', 'presentAddress'];

//   const searchQuery = Student.find({
//     $or: studentSearchableField.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });

//   // for filtering step -2
//   const filterQuery = searchQuery
//     .find(queryObj)
//     .populate('admissionSemester')
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     });

//   // sort step -3
//   let sort = '-createdAt';
//   if (query?.sort) {
//     sort = query.sort as string;
//   }

//   const sortQuery = filterQuery.sort(sort);

//   // limit step -4 (pagination)
//   let limit = 1;
//   let page = 1;
//   let skip = 1;

//   if (query?.limit) {
//     limit = Number(query.limit) as number;
//   }

//   if (query?.page) {
//     page = Number(query.page) as number;
//     // skip formula
//     skip = (page - 1) * limit;
//   }

//   // page query
//   const pageQuery = sortQuery.skip(skip);

//   const limitQuery = pageQuery.limit(limit);

//   // select fields
//   let filed = '-__v';
//   if (query?.fields) {
//     filed = (query.fields as string).split(',').join(' ');
//     console.log(filed);
//   }

//   const selectQuery = await limitQuery.select(filed);
//   return selectQuery;
// };

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
