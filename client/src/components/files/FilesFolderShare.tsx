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
import { calculateExpiration, cn } from '@/lib/utils';
import { Copy, CopyCheck } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { CommonContainer } from './CommonContainer';
import { PropsWithChildren } from 'react';
const LinkSchema = z.object({
  expiresAt: z.coerce.number().min(1).max(3),
});

type LinkFormValues = z.infer<typeof LinkSchema>;

const CreateLinkForm = (props: PropsWithChildren) => {
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
              <FormLabel>Share this folder</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Specify a link duration</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-2 mt-1">
          <Button name="create-link-submit" disabled={createLink.isPending} type="submit">
            Submit
          </Button>
          {props.children}
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

export const FilesFolderShare = (props: PropsWithChildren) => {
  const { folderId } = useParams();
  const { data, isPending, error } = useGetLink(folderId as string);
  const removeLink = useRemoveLink(folderId as string);
  if (isPending)
    return (
      <CommonContainer>
        <Loading />
      </CommonContainer>
    );
  if (error) return <div>{error.message}</div>;
  if (!data) {
    return (
      <CommonContainer>
        <CreateLinkForm>{props.children}</CreateLinkForm>
      </CommonContainer>
    );
  }
  const linkUrl = `${window.location.host}/share/${data.id}`;
  return (
    <CommonContainer>
      <h1>Link will expire in: {calculateExpiration(data.expiresAt)}</h1>
      <div className="bg-accent mt-2 mb-2 rounded-sm">
        <div className="flex items-center px-4 p-1">
          <div className="truncate w-20 flex-1">{linkUrl}</div>
          <CopyButton text={linkUrl} />
        </div>
      </div>
      <div className="flex gap-2 items-center mt-2">
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
        {props.children}
      </div>
    </CommonContainer>
  );
};
