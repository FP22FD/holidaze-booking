import { Avatar } from './avatar.types';
import { Banner } from './profile.type';

export interface Customer {
  name: string;
  email: string;
  bio?: string;
  avatar: Avatar;
  banner: Banner;
}
