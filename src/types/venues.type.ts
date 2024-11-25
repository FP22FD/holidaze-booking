// import { Media } from './media.types';
import { Meta } from './meta.types';
import { Venue } from './venue.type';

/** GET all venues response. */
export interface AllVenuesResponse {
  data: Venue[];
  meta: Meta;
}

// export interface Venue {
//   id: string;
//   name: string;
//   description: string;
//   media: Media[];
//   price: number;
//   maxGuests: number;
//   rating: number;
//   created: string;
//   updated: string;
//   meta: Facilities;
//   location: Location;
//   _count: Count;
// }

// export interface Facilities {
//   wifi: boolean;
//   parking: boolean;
//   breakfast: boolean;
//   pets: boolean;
// }

// export interface Location {
//   address?: string;
//   city?: string;
//   zip?: string;
//   country?: string;
//   continent?: string;
//   lat?: number;
//   lng?: number;
// }

// export interface Count {
//   bookings: number;
// }
