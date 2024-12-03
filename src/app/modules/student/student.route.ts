import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
const router = express.Router();

// will call controller function

router.get('/', StudentControllers.getAllStudents);

router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.get('/:studentId', StudentControllers.getStudentById);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
