import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, { message: 'Password must be 20 characters or less' })
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
