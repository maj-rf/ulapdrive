import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { useFileUpload } from '@/hooks/useFile';
import { useParams } from 'react-router';
import { Loading } from '../Loading';
import { cn } from '@/lib/utils';
import { CommonContainer } from './CommonContainer';
import { PropsWithChildren } from 'react';

const validMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/jpg',
  'image/webp',
  'application/msword',
  'application/pdf',
  'text/plain',
  'application/zip',
];

const UploadSchema = z.object({
  file_uploaded: z
    .instanceof(File, { message: 'Upload must be a file' })
    .refine((file) => file.size > 0 && file.size < 2 ** 22, 'File size must be between 0 to 4MB')
    .refine(
      (file) => !file || validMimeTypes.includes(file.type),
      'Allowed types: jpeg, jpg, webp, png, pdf, txt, zip, doc',
    ),
});

type FileValues = z.infer<typeof UploadSchema>;

export const FileUpload = (props: PropsWithChildren) => {
  const form = useForm<FileValues>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      file_uploaded: undefined,
    },
  });
  const { folderId } = useParams();

  const upload = useFileUpload(folderId as string);
  const onSubmit = async (values: FileValues) => {
    const formData = new FormData();
    if (values.file_uploaded) formData.append('file_uploaded', values.file_uploaded);
    const done = await upload.mutateAsync({ obj: formData, folderId: folderId as string });
    if (done) {
      form.reset({ ...form.getValues(), file_uploaded: undefined });
    }
  };

  return (
    <CommonContainer>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data">
          <FormField
            control={form.control}
            name="file_uploaded"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Your File</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    placeholder="Upload a file"
                    type="file"
                    onChange={(event) => onChange(event.target.files && event.target.files[0])}
                    accept=".doc,.jpg,.jpeg,.png,.webp,.zip,.gif,.pdf,.txt"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 items-center mt-2">
            <Button disabled={upload.isPending} className="grid place-items-center">
              <span className={cn('col-[1] row-[1]', upload.isPending ? 'invisible' : 'visible')}>
                Upload
              </span>
              <span
                aria-label="Uploading..."
                className={cn('col-[1] row-[1]', upload.isPending ? 'visible' : 'invisible')}
              >
                <Loading />
              </span>
            </Button>
            {props.children}
          </div>
        </form>
      </Form>
    </CommonContainer>
  );
};
