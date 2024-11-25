import { Avatar } from './avatar.types';
import { Meta } from './meta.types';

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
  // _count: Count;
}

// export interface Avatar {
//   url: string;
//   alt: string;
// }

export interface Banner {
  url: string;
  alt: string;
}

// export interface Count {
//   venues: number;
//   bookings: number;
// }
