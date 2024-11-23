import { API_BOOKINGS_PROFILE, API_KEY } from '../../../shared/utils/endpoints';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { useEffect, useState } from 'react';

export interface BookingsProfileResponse {
  data: BookingData[];
  meta: Meta;
}

export interface BookingData {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
  customer: Customer;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Meta;
  location: Location;
  owner: Owner;
  _count: Count;
}

export interface Media {
  url: string;
  alt: string;
}

export interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export interface Owner {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
}
export interface Avatar {
  url: string;
  alt: string;
}

export interface Banner {
  url: string;
  alt: string;
}

export interface Count {
  bookings: number;
}

export interface Customer {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
}

export interface Meta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage?: string | number;
  nextPage?: string | number;
  pageCount: number;
  totalCount: number;
}

export function useBookingsProfile(name: string) {
  const [data, setData] = useState<BookingData[] | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const bookingsController = new AbortController();
    const { signal } = bookingsController;

    const fetchData = async () => {
      try {
        const response = await fetch(API_BOOKINGS_PROFILE(name), {
          signal,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'X-Noroff-API-Key': API_KEY,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const bookingsData: BookingsProfileResponse = await response.json();

          if (!bookingsController.signal.aborted) {
            const data = bookingsData.data;
            setData(data);
            setError('');
          }
        } else {
          const eh = new ErrorHandler(response);
          const msg = await eh.getErrorMessage();
          setError(msg);
          setData(null);
        }
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          setError('Could not show the upcoming bookings!');
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      bookingsController.abort();
    };
  }, [name]);

  return { data, loading, error };
}
