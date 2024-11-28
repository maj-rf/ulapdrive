import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';
import { AuthLayout } from '@/components/AuthLayout';

const RegisterSchema = z
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

const RegisterForm = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: 'your_email@gmail.com',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 max-w-md mx-auto space-y-5 border bg-gray-50 p-4 rounded-md"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full">Submit</Button>
        <p>
          Already have an account?{' '}
          <Link to="/login" className="font-medium underline text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
};

export const Register = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
