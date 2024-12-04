import { Link } from 'react-router-dom';

export function ErrorPage() {
  return (
    <div>
      <h1 className="text-heading-2 text-neutral-grayish-blue text-center">An error has occurred.</h1>
      <Link className="hover:text-gray-200" to="/">
        Home
      </Link>
    </div>
  );
}
