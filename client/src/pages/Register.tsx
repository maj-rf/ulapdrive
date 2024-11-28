import { useForm } from 'react-hook-form';
import { FormField } from '../components/FormField';
import { FormData } from '../types/types';
import { Link } from 'react-router';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const RegisterSchema: ZodType<FormData> = z
  .object({
    email: z.string().email(),
    displayName: z.string().min(3).max(16),
    password: z.string().min(8, { message: 'Password is too short' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match. Try again',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data);
  };

  return (
    <section className="bg-gray-50 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-10 mx-auto md:h-full lg:py-0">
        <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900">☁️ulap☁️</h1>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 max-w-md mx-auto space-y-5 border px-2 py-4 bg-white rounded-md"
          >
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 ">
              Create an account
            </h1>
            <FormField
              type="email"
              placeholder="your_email@gmail.com"
              name="email"
              register={register}
              error={errors.email}
              label="Email Address"
            />
            <FormField
              type="text"
              placeholder="Ted Lasso"
              name="displayName"
              register={register}
              error={errors.displayName}
              label="Display Name"
            />
            <FormField
              type="password"
              placeholder="Password"
              name="password"
              register={register}
              error={errors.password}
              label="Password"
            />
            <FormField
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword}
              label="Confirm Password"
            />
            <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Submit
            </button>
            <p>
              Already have an account?{' '}
              <Link to="/login" className="font-medium underline text-blue-400">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
