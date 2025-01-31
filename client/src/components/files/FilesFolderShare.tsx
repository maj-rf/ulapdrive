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
import { useCreateLink, useGetLink, useRemoveLink } from '@/hooks/useShare';
import { useParams } from 'react-router';
import { Loading } from '../Loading';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const LinkSchema = z.object({
  expiresAt: z.coerce.number().min(1).max(3),
});

type LinkFormValues = z.infer<typeof LinkSchema>;

const CreateLinkForm = () => {
  const form = useForm<LinkFormValues>({
    resolver: zodResolver(LinkSchema),
    defaultValues: {
      expiresAt: 1,
    },
  });
  const { folderId } = useParams();
  const createLink = useCreateLink(folderId as string);

  const onSubmit = async (values: LinkFormValues) => {
    createLink.mutate({ folderId: folderId as string, expiresAt: values.expiresAt });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-2">
        <FormField
          control={form.control}
          name="expiresAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Duration</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full mt-1">
          <Button name="create-link-submit" disabled={createLink.isPending} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

const SharedLinkContainer = () => {
  const { folderId } = useParams();
  const { data, isPending } = useGetLink(folderId as string);
  const removeLink = useRemoveLink(folderId as string);
  if (isPending) return <Loading />;
  return (
    <>
      {data ? (
        <div>
          <p>{`${import.meta.env.BASE_URL}share/${data.id}`}</p>
          <Button
            onClick={() => removeLink.mutate(data.id)}
            disabled={removeLink.isPending}
            className="grid place-items-center"
          >
            <span className={cn('col-[1] row-[1]', removeLink.isPending ? 'invisible' : 'visible')}>
              Remove Link
            </span>
            <span
              aria-label="Uploading..."
              className={cn('col-[1] row-[1]', removeLink.isPending ? 'visible' : 'invisible')}
            >
              <Loading />
            </span>
          </Button>
        </div>
      ) : (
        <CreateLinkForm />
      )}
    </>
  );
};

export const FilesFolderShare = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      {show ? (
        <div>
          <Button onClick={() => setShow(false)}>Close</Button>

          <SharedLinkContainer />
        </div>
      ) : (
        <Button className="w-fit" onClick={() => setShow(true)}>
          Share
        </Button>
      )}
    </>
  );
};
