//storage API endpoints

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_VENUES = `${API_BASE_URL}/holidaze/venues`;
export const API_VENUE = (id: string) => `${API_BASE_URL}/holidaze/venues/${id}`;

export const API_VENUES_SEARCH = `${API_BASE_URL}/holidaze/venues`;
