import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';
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
