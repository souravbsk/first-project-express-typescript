import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

// get all academic semesters
router.get('/', AcademicSemesterControllers.getAllAcademicSemester);

// get academic semester by id
router.get('/:semesterId', AcademicSemesterControllers.getAcademicSemesterById);

// update academic semester by id
router.patch(
  '/:semesterId',
  AcademicSemesterControllers.updateAcademicSemesterById,
);
export const AcademicSemesterRoutes = router;
