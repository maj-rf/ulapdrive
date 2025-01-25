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
import { useCreateFolder } from '@/hooks/useFolder';

const FolderSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Folder name is too short' })
    .max(16, { message: 'Folder name is too long' }),
});

type FolderFormValues = z.infer<typeof FolderSchema>;

export const FolderCreateForm = ({ hideForm }: { hideForm: () => void }) => {
  const form = useForm<FolderFormValues>({
    resolver: zodResolver(FolderSchema),
    defaultValues: {
      name: '',
    },
  });

  const create = useCreateFolder();

  const onSubmit = async (values: FolderFormValues) => {
    create.mutate(values.name);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-2">
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
        <div className="flex w-full mt-1">
          <Button name="create-folder-submit-button" disabled={create.isPending} type="submit">
            Submit
          </Button>
          <Button
            className="ml-auto"
            name="create-folder-cancel-button"
            disabled={create.isPending}
            type="button"
            onClick={hideForm}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
