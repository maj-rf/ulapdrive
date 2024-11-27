import { FieldValues, useForm } from 'react-hook-form';
import { useSubmit } from 'react-router';

export const Register = () => {
  const { register, handleSubmit } = useForm();
  const submit = useSubmit();

  const onSubmit = (data: FieldValues) => submit(data, { method: 'post' });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('example')} />
      <input type="submit" />
    </form>
  );
};
