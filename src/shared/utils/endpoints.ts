//storage API endpoints

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_KEY = import.meta.env.VITE_API_KEY || '__VITE_API_KEY__';

export const API_AUTH = '/auth';
export const API_REGISTER = `${API_BASE_URL}${API_AUTH}/register`;
export const API_LOGIN = `${API_BASE_URL}${API_AUTH}/login/?_holidaze=true`;

export const API_VENUES = `${API_BASE_URL}/holidaze/venues`;
export const API_VENUE = (id: string) => `${API_BASE_URL}/holidaze/venues/${id}`;

export const API_VENUES_SEARCH = `${API_BASE_URL}/holidaze/venues`;

export const API_DATA_PROFILE = (name: string) => `${API_BASE_URL}/holidaze/profiles/${name}`;
