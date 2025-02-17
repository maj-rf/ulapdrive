export const CommonContainer = (props: React.PropsWithChildren) => {
  return (
    <div className="w-full md:max-w-md mx-auto md:m-0 space-y-2 border text-primary bg-primary-foreground p-4 rounded-md">
      {props.children}
    </div>
  );
};
