import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a new user
  const userData: Partial<TUser> = {};

  userData.password = password || (config.defaultPassword as string);

  userData.role = 'student';

  // year semester and 4  digit number
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (admissionSemester) {
    // set manually generated id
    userData.id = await generateStudentId(admissionSemester);
  }

  // create  a user

  const newUser = await User.create(userData);
  console.log(newUser, ' new user');

  // create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user

    payload.id = newUser.id;
    payload.user = newUser._id; // reference _id

    const newStudent = await Student.create(payload);
    console.log(newStudent, ' new student');
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
