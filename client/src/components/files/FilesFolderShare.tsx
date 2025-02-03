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
import { Copy, CopyCheck } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

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

const CopyButton = ({ text }: { text: string }) => {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log('Copied!', { text });
      })
      .catch((error) => {
        console.error('Failed to copy!', error);
      });
  };

  return (
    <Button variant="ghost" className="ml-auto" onClick={handleCopy(text)}>
      {copiedText ? <CopyCheck /> : <Copy />}
    </Button>
  );
};

// TODO: extract a date diff function and reuse it in SharePage
const SharedLinkContainer = () => {
  const { folderId } = useParams();
  const { data, isPending, error } = useGetLink(folderId as string);
  const removeLink = useRemoveLink(folderId as string);
  if (isPending)
    return (
      <div className="w-full md:max-w-md mx-auto space-y-2 border text-primary bg-primary-foreground p-4 rounded-md mt-2">
        <Loading />
      </div>
    );
  if (error) return <div>{error.message}</div>;
  if (!data) {
    return (
      <div className="w-full md:max-w-md mx-auto space-y-2 border text-primary bg-primary-foreground p-4 rounded-md mt-2">
        <CreateLinkForm />
      </div>
    );
  }
  const linkUrl = `${window.location.host}/share/${data.id}`;
  return (
    <div className="w-full md:max-w-md mx-auto space-y-2 border text-primary bg-primary-foreground p-4 rounded-md mt-2">
      <h1>Link will expire in: {new Date(data.expiresAt).toISOString()}</h1>
      <div className="bg-accent mt-2 mb-2 rounded-sm">
        <div className="flex items-center p-2">
          <div className="truncate">{linkUrl}</div>
          <CopyButton text={linkUrl} />
        </div>
      </div>
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
