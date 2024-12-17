import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already 'UPCOMING' | 'ONGOING'

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      ` There is already a ${isThereAnyUpcomingOrOngoingSemester.status} semester registered !`,
    );
  }
  // check if academic semester is already registered
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester: academicSemester,
  });

  if (isSemesterRegistrationExist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'This Semester already registered',
    );
  }
  // check if the semester is exist

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic Semester Not Found');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const requestedStatus = payload?.status;
  // check if the requested semester registration exist
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Semester Registration Not Found',
    );
  }

  // if the requested semester registration is ended , we will not updated

  const currentSeamsterStatus = isSemesterRegistrationExist.status;

  if (currentSeamsterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      StatusCodes.CONFLICT,
      ` This semester is ${currentSeamsterStatus}`,
    );
  }

  // UPCOMING ---> ONGOING ---> ENDED
  if (
    currentSeamsterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `You can not directly change status from  ${currentSeamsterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSeamsterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `You can not directly change status from  ${currentSeamsterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
