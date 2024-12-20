import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { SemesterRegistrationRouter } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoutes } from '../modules/OfferedCourse/OfferedCourse.route';
import { authRouter } from '../modules/Auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/faculties',
    router: FacultyRoutes,
  },
  {
    path: '/admins',
    router: AdminRoutes,
  },
  {
    path: '/students',
    router: StudentRoutes,
  },

  {
    path: '/academic-semesters',
    router: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    router: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    router: academicDepartmentRoutes,
  },
  {
    path: '/courses',
    router: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    router: SemesterRegistrationRouter,
  },
  {
    path: '/offered-courses',
    router: OfferedCourseRoutes,
  },
  {
    path: '/auth',
    router: authRouter,
  },
];

// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
