import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUpdateFolder } from '@/hooks/useFolderMutation';

const FolderSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Folder name is too short' })
    .max(16, { message: 'Folder name is too long' }),
});

type FolderFormValues = z.infer<typeof FolderSchema>;

type FolderUpdateProps = {
  userId: number;
  name: string;
  id: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FolderUpdateForm = ({ userId, id, name, setEditing }: FolderUpdateProps) => {
  const form = useForm<FolderFormValues>({
    resolver: zodResolver(FolderSchema),
    defaultValues: {
      name,
    },
  });

  const update = useUpdateFolder(userId);

  const onSubmit = async (values: FolderFormValues) => {
    const folder = await update.mutateAsync({ name: values.name, folderId: id });
    if (folder) setEditing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-rows-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-2">
          <Button type="submit" disabled={update.isPending}>
            Update
          </Button>
          <Button type="button" disabled={update.isPending} onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
