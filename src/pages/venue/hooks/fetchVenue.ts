import { useEffect, useState } from 'react';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_VENUE } from '../../../shared/utils/endpoints';
import { SingleVenue, VenueResponse } from '../../../types/venue.type';

export function useFetchVenue(id: string): { data: SingleVenue | null; loading: boolean; error: string } {
  const [data, setData] = useState<SingleVenue | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const venueController = new AbortController();
    const { signal } = venueController;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_VENUE(id), { signal });

        if (response.ok) {
          const venueData: VenueResponse = await response.json();
          const data = venueData.data;

          setData(data);
          setError('');
        } else {
          const eh = new ErrorHandler(response);
          const msg = await eh.getErrorMessage();
          setError(msg);
          setData(null);
        }
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          setError('Could not show the venue!');
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      venueController.abort();
    };
  }, [id]);

  return { data, loading, error };
}
