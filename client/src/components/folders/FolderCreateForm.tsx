import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { FolderPlus } from 'lucide-react';
import { useFolderMutation } from '@/hooks/useFolderMutation';

const FolderSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Folder name is too short' })
    .max(16, { message: 'Folder name is too long' }),
});

type FolderFormValues = z.infer<typeof FolderSchema>;

export const FolderCreateForm = ({ userId }: { userId: number }) => {
  const form = useForm<FolderFormValues>({
    resolver: zodResolver(FolderSchema),
    defaultValues: {
      name: '',
    },
  });

  const create = useFolderMutation(userId).create;

  const onSubmit = async (values: FolderFormValues) => {
    create.mutate(values.name);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Folder Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" disabled={create.isPending}>
          <span className="hidden sm:block">Create Folder</span>
          <span className="">
            <FolderPlus />
          </span>
        </Button>
      </form>
    </Form>
  );
};
