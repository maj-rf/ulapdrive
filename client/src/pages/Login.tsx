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
import { useLogin } from '@/hooks/useAuth';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password is too short' }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useLogin();

  const onSubmit = async (data: LoginFormValues) => {
    loginMutation.mutate({ email: data.email, password: data.password });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 max-w-md mx-auto space-y-5 border text-primary bg-primary-foreground p-4 rounded-md relative"
      >
        <div className="flex items-center justify-center gap-2 w-fit bg-secondary text-2xl font-semibold absolute top-0 left-0 right-0 mx-auto p-2 rounded-2xl -translate-y-6">
          <p>☁️ulap☁️</p>
        </div>
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
        <Button className="w-full" disabled={loginMutation.isPending}>
          Submit
        </Button>
        <p>
          Don't have an account?{' '}
          <Link to="/auth/register" className="font-medium underline text-blue-400">
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
};

export const Login = () => {
  return <LoginForm />;
};
