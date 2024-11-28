import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { AuthLayout } from '@/components/AuthLayout';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password is too short' }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'your_email@gmail.com',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 max-w-md mx-auto space-y-5 border  bg-gray-50 p-4 rounded-md"
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
        <Button className="w-full">Submit</Button>
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="font-medium underline text-blue-400">
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
};

export const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
