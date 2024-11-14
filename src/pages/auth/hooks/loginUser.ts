import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_BASE_URL, API_AUTH, API_LOGIN, API_KEY } from '../../../shared/utils/endpoints';

export interface LoginResponse {
  data: UserData;
  meta: Meta;
}

export interface UserData {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
  accessToken: string;
  venueManager: boolean;
}

export interface Avatar {
  url: string;
  alt: string;
}

export interface Banner {
  url: string;
  alt: string;
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

export async function loginUser(
  email: string,
  password: string,
): Promise<{ success: boolean; data: null | UserData; error: string | null }> {
  try {
    const response = await fetch(API_BASE_URL + API_AUTH + API_LOGIN, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'X-Noroff-API-Key': API_KEY,
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userData: LoginResponse = await response.json();

      localStorage.setItem('access_token', userData.data.accessToken);

      return { success: true, data: userData.data, error: null };
    } else {
      const eh = new ErrorHandler(response);
      const msg = await eh.getErrorMessage();
      return { success: false, data: null, error: msg };
    }
  } catch {
    return { success: false, data: null, error: 'Could not login. Please try again!' };
  }
}
