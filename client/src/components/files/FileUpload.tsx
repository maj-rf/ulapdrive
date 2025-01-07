import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
const validMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/msword',
  'application/pdf',
  'text/plain',
  'application/zip',
  'image/jpg',
];

const UploadSchema = z.object({
  file: z
    .instanceof(File, { message: 'Upload must be a file' })
    .refine((file) => file.size > 0 && file.size < 2 ** 22, 'File size must be between 0 to 4MB')
    .refine(
      (file) => !file || validMimeTypes.includes(file.type),
      'Allowed types: jpeg, jpg, png, pdf, txt, zip, doc',
    ),
});

type FileValues = z.infer<typeof UploadSchema>;

export const FileUpload = () => {
  const form = useForm<FileValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = async (data: FileValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:max-w-md mx-auto space-y-2 border text-primary bg-primary-foreground p-4 rounded-md"
      >
        <FormField
          control={form.control}
          name="file"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Your File</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Picture"
                  type="file"
                  onChange={(event) => onChange(event.target.files && event.target.files[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Upload</Button>
      </form>
    </Form>
  );
};
