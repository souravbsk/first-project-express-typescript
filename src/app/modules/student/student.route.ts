import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

// will call controller function

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StudentControllers.getAllStudents,
);

router.patch(
  '/:studentId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),

  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.get(
  '/:studentId',

  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),

  StudentControllers.getStudentById,
);
router.delete(
  '/:studentId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),

  StudentControllers.deleteStudent,
);

export const StudentRoutes = router;
