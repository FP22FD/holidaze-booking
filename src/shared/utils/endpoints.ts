//storage API endpoints

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY || '__VITE_API_KEY__';

export const API_AUTH = '/auth';
export const API_REGISTER = new URL(`${API_BASE_URL}${API_AUTH}/register`);
export const API_LOGIN = new URL(`${API_BASE_URL}${API_AUTH}/login/?_holidaze=true`);

export const API_VENUES = new URL(`${API_BASE_URL}/holidaze/venues`);
export const API_VENUE = (id: string) => new URL(`${API_BASE_URL}/holidaze/venues/${id}`);

export const API_VENUES_SEARCH = (query: string) =>
  new URL(`${API_BASE_URL}/holidaze/venues/search?limit=10&sort=name&sortOrder=asc&q=${query}`);

export const API_DATA_PROFILE = (name: string) => new URL(`${API_BASE_URL}/holidaze/profiles/${name}`);

export const API_BOOKINGS_PROFILE = (name: string) =>
  new URL(
    `${API_BASE_URL}/holidaze/profiles/${name}/bookings?sort=created&sortOrder=desc&limit=100&_customer=true&_venue=true`,
  );
