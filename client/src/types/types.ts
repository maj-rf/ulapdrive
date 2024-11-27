import { FieldError, UseFormRegister } from 'react-hook-form';

export type FormFieldExtensionProps = {
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  label: string;
};

export type ValidFieldNames = 'email' | 'displayName' | 'password' | 'confirmPassword';

export type FormData = {
  email: string;
  password: string;
  displayName?: string;
  confirmPassword?: string;
};
