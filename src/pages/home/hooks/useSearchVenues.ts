import { useState, useEffect } from 'react';
import { AllVenuesResponse, Venue } from '../../../types/venues.type';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_VENUES_SEARCH } from '../../../shared/utils/endpoints';

export function useSearchVenues(query: string) {
  const [data, setData] = useState<Venue[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query.trim()) {
      setData([]); // Clear results if no query
      return;
    }

    const searchController = new AbortController();
    const { signal } = searchController;

    const searchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_VENUES_SEARCH(query), { signal });

        if (response.ok) {
          const searchResults: AllVenuesResponse = await response.json();
          setData(searchResults.data);
          setError('');
        } else {
          const eh = new ErrorHandler(response);
          const msg = await eh.getErrorMessage();
          setError(msg);
          setData([]);
        }
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          setError('Could not fetch search results!');
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    searchData();

    return () => {
      searchController.abort(); // Cleanup fetch request on unmount
    };
  }, [query]);

  return { data, loading, error };
}
