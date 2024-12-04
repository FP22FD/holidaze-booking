import { Meta } from './meta.types';
import { Venue } from './venue.type';

/** GET all venues response. */
export interface AllVenuesResponse {
  data: Venue[];
  meta: Meta;
}
