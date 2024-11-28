import { Avatar } from '../../../types/avatar.types';
import { Facilities } from '../../../types/facilities.types';
import { Media } from '../../../types/media.types';
import { Meta } from '../../../types/meta.types';
import { Banner } from '../../../types/profile.type';

export interface DashboardResponse {
  data: AdminVenueData[];
  meta: Meta;
}

export interface AdminVenueData {
  bookings: Booking[];
  created: string;
  description: string;
  id: string;
  location: Location;
  maxGuests: number;
  media: Media[];
  meta: Facilities;
  name: string;
  owner: Owner;
  price: number;
  rating: number;
  updated: string;
  _count: Count;
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

export interface Owner {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: Customer;
}

export interface Customer {
  name: string;
  email: string;
  bio?: string;
  avatar: Avatar;
  banner: Banner;
}

export interface Count {
  bookings: number;
}
