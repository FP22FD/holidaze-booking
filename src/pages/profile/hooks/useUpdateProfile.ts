import { useState } from 'react';
import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_DATA_PROFILE, API_KEY } from '../../../shared/utils/endpoints';

/** GET single profile response. */
export interface ProfileResponse {
  data: ProfileData;
  meta: Meta;
}

export interface ProfileData {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
  venueManager: boolean;
  _count: Count;
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
  venues: number;
  bookings: number;
}

export interface Meta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage?: number;
  nextPage: number;
  pageCount: number;
  totalCount: number;
}

export function useUpdateProfile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const updateProfile = async (profileData: ProfileData) => {
    try {
      setLoading(true);

      const response = await fetch(API_DATA_PROFILE(profileData.name), {
        method: 'PUT',
        body: JSON.stringify(profileData),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'X-Noroff-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const profileData: ProfileResponse = await response.json();

        const data = profileData.data;
        return { success: true, data };
      } else {
        const eh = new ErrorHandler(response);
        const msg = await eh.getErrorMessage();
        setError(msg);

        return { success: false, data: null };
      }
    } catch {
      setError('Could not update the profile!');
    } finally {
      setLoading(false);
    }

    return { success: false, data: null };
  };

  return { loading, error, updateProfile };
}
