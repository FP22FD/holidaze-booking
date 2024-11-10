/** GET venue detail response. */
export interface VenueResponse {
  data: SingleVenue;
  meta?: Meta;
}

export interface SingleVenue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Facilities;
  location: Location;
  _count: Count;
}

export interface Media {
  url: string;
  alt: string;
}

export interface Facilities {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface Location {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  lat?: number;
  lng?: number;
}

export interface Count {
  bookings: number;
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
