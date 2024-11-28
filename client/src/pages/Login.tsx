import { useForm } from 'react-hook-form';
import { FormField } from '../components/FormField';
import { FormData } from '../types/types';
import { Link } from 'react-router';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginSchema: ZodType<FormData> = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password is too short' }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
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
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 ">Login</h1>
            <FormField
              type="email"
              placeholder="your_email@gmail.com"
              name="email"
              register={register}
              error={errors.email}
              label="Email Address"
            />

            <FormField
              type="password"
              placeholder="Password"
              name="password"
              register={register}
              error={errors.password}
              label="Password"
            />
            <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Submit
            </button>
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="font-medium underline text-blue-400">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
