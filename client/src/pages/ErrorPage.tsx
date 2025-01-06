import { useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { Button } from '@/components/ui/button';
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div id="error-page" className="h-screen bg-gradient-to-tr from-blue-400 to-emerald-400">
      <div className="flex flex-col justify-center items-center h-full gap-2">
        <h1>Oops! 😭 </h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className="font-bold text-xl">
          <i>{errorMessage}</i>
        </p>
        <Button>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
