import { z } from 'zod';

const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First Name can't be longer than 20 characters")
    .refine((value) => /^[A-Z][a-zA-Z]*$/.test(value), {
      message:
        'First Name should start with a capital letter and contain only alphabets',
    }),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last Name should contain only alphabets',
  }),
});

const GuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Other'], {
        errorMap: () => ({ message: 'Gender must be Male, Female, or Other' }),
      }),
      dateOfBirth: z.date().optional(),
      email: z.string().email({ message: 'Invalid email format' }),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: GuardianValidationSchema,
      localGuardian: LocalGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().url().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
