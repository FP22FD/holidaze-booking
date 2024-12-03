import { useParams } from 'react-router-dom';
import PageSection from '../../../shared/components/PageSection';
import { useFetchVenue } from '../hooks/fetchVenue';
import StarRating from '../../../shared/components/StarRating';
import { PiCarLight, PiCoffeeLight, PiMapPinLight, PiPawPrintLight, PiWifiHighLight } from 'react-icons/pi';
import { Facility } from './Facility';
import VenueBookingCalendar from './VenueBookingCalendar';
import Spinner from '../../../shared/components/Spinner';

function VenueCard() {
  const { id } = useParams<{ id: string }>();
  const { data: venue, error } = useFetchVenue(id || '');

  if (!venue) {
    return <Spinner />;
  }

  const { media, location, name, description, rating, maxGuests, meta } = venue;
  const imageUrl = media?.length ? media[0].url : '';
  const altText = media?.length ? media[0].alt : 'Venue Image';
  const locationCountry = location?.country || 'Location unavailable';
  const reviews = 0;

  return (
    <PageSection
      title="Venue Details"
      seoTitle="Venues | Holidaze Booking"
      seoDescription="Browse our wide range of venues and find what you're looking for!"
      searchBar={false}
      error={error}
    >
      <div className="w-full mx-auto flex flex-col md:flex-row md:space-x-8 lg:space-x-16 mt-2">
        <div className="w-full md:w-2/3 mb-8 md:mb-0">
          <img className="w-full object-cover h-64 sm:h-80 lg:h-96" src={imageUrl} alt={altText || 'Product image'} />

          <div className="px-2 mt-4">
            <div className="flex items-center space-x-3 text-body-medium">
              <div className="flex items-center space-x-1">
                <PiMapPinLight className="text-accent-purple" />
                <span>{locationCountry}</span>
              </div>

              <div className="border-l border-neutral-dark h-4"></div>

              <StarRating rating={rating || 0} />

              <div className="border-l border-neutral-dark h-4"></div>

              <div className="flex items-start space-x-1">
                <span>{reviews > 0 ? reviews : 'No reviews yet'}</span>
              </div>
            </div>

            <h2 className="my-4 text-xl font-semibold">{name}</h2>
            <p className="mb-4">{description}</p>
            {maxGuests && (
              <div className="flex items-center space-x-2 rounded text-body-medium">
                <span className="font-semibold">Max Guests</span>
                <span className="pl-1">{maxGuests}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap px-2 gap-4 mt-6">
            {meta?.wifi && <Facility icon={<PiWifiHighLight />} label="Free Wifi" />}
            {meta?.parking && <Facility icon={<PiCarLight />} label="Free Parking" />}
            {meta?.pets && <Facility icon={<PiPawPrintLight />} label="Pets Allowed" />}
            {meta?.breakfast && <Facility icon={<PiCoffeeLight />} label="Breakfast" />}
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <VenueBookingCalendar venue={venue} />
        </div>
      </div>
    </PageSection>
  );
}

export default VenueCard;
