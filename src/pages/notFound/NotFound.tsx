import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center mt-28">
      <h1 className="text-3xl text-neutral-grayish-blue">
        Oops! You seem to be lost.<span className="text-8xl text-primary-soft-red"></span>
      </h1>
      <Link className="hover:text-gray-200" to="/">
        Go to home
      </Link>
    </div>
  );
}

export default PageNotFound;
