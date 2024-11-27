import { FormFieldExtensionProps } from '../types/types';

export const FormField = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  label,
}: React.ComponentProps<'input'> & FormFieldExtensionProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name}>{label}</label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type={type}
        placeholder={placeholder}
        id={name}
        {...register(name, { valueAsNumber })}
      />
      {error && <span className="text-red-400">{error.message}</span>}
    </div>
  );
};
