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
