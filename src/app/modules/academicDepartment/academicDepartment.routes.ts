import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicFaculty,
);
router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSIngleAcademicDepartment,
);
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);

router.patch(
  '/:departmentId',

  AcademicDepartmentControllers.updateAcademicDepartmentById,
);

export const academicDepartmentRoutes = router;
