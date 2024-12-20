import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'ID is required.' }),
    password: z.string({ invalid_type_error: 'Password must be a string.' }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};
