import { z } from 'zod';

export const registerSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email('Invalid email format'),
      displayName: z
        .string({ required_error: 'Display Name is required' })
        .min(3, 'Display Name must be at least 3 characters')
        .max(16, 'Display Name must be at most 16 characters'),
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, { message: 'Password is too short' }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match. Try again',
      path: ['confirmPassword'],
    }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password is too short' }),
  }),
});
