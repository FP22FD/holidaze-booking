import { ReactNode } from 'react';
import { SEO } from './SEO';

interface PageProps {
  title: string;
  seoTitle: string;
  seoDescription: string;
  searchBar?: boolean;
  error?: string;
  children: ReactNode;
}

function PageSection({ title, seoTitle, seoDescription, error, searchBar = false, children }: PageProps) {
  return (
    <section className="row-start-1 col-span-12 flex flex-col items-center">
      <SEO title={seoTitle} description={seoDescription} />
      {searchBar && <div className="w-full px-2 md:w-3/4 my-6 hidden">Here is the search bar component</div>}
      <div className="max-w-screen-xl w-full mx-auto px-4 lg:px-8 flex flex-col items-center">
        <div className="w-full text-left border-b">
          <h1 className="text-primary-dark-blue font-semibold text-md md:text-heading-4 capitalize inline-block relative">
            {title}
            <span className="absolute left-0 bottom-0 h-1 w-full bg-accent-pink rounded-t-lg"></span>
          </h1>
        </div>

        {error && (
          <div role="alert" className="text-center text-status-error-red my-5 py-5">
            {error}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}

export default PageSection;
