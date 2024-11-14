import { ErrorHandler } from '../../../shared/utils/errorHandler';
import { API_BASE_URL, API_AUTH, API_REGISTER } from '../../../shared/utils/endpoints';

export interface RegisterResponse {
  data: UserData;
  meta: Meta;
}

export interface UserData {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
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

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<{ success: boolean; data: null | UserData; error: string | null }> {
  try {
    const response = await fetch(API_BASE_URL + API_AUTH + API_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.ok) {
      const userData: RegisterResponse = await response.json();
      return { success: true, data: userData.data, error: null };
    } else {
      const eh = new ErrorHandler(response);
      const msg = await eh.getErrorMessage();
      return { success: false, data: null, error: msg };
    }
  } catch {
    return { success: false, data: null, error: 'Could not register. Please try again!' };
  }
}
