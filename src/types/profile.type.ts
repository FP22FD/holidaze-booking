import { Avatar } from './avatar.types';
import { Banner } from './banner.types';
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
}
