import { useParams } from 'react-router-dom';
import PageSection from '../../../shared/components/PageSection';
import { useFetchVenue } from '../hooks/fetchVenue';
import StarRating from '../../../shared/components/StarRating';
import { PiCarLight, PiCoffeeLight, PiMapPinLight, PiPawPrintLight, PiWifiHighLight } from 'react-icons/pi';
import Button from '../../../shared/components/Button';
import { Facility } from './Facility';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function VenueCard() {
  const { id } = useParams<{ id: string }>();
  const { data, error } = useFetchVenue(id || '');

  const { media, location, name, description, rating, maxGuests, price, meta } = data || {};
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

          {/* Calendar Display Under Confirm Booking Button */}
          <div className="flex justify-start items-start flex-col bg-neutral-white px-2 my-8">
            <p className="font-semibold mb-4">Ours Available dates</p>
            <div className="border-t border-neutral-default mb-3"></div>

            <div className="bg-neutral-white rounded-lg ">
              <DatePicker
                selected={null}
                onChange={() => {}}
                inline
                calendarClassName="rounded-lg"
                dayClassName={(date) =>
                  `text-typography-primary-grey rounded-full ${
                    date.getDate() === new Date().getDate() ? 'bg-pink-gradient text-white' : ''
                  } hover:neutral-default hover:text-typography-primary-grey e hover:rounded-full`
                }
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <div className="max-w-md p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary-dark-blue">Booking</h2>

            <form className="space-y-4">
              <div>
                <label htmlFor="from" className="block text-typography-primary-blue font-semibold">
                  From
                </label>
                <input
                  id="from"
                  type="date"
                  className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
                />
              </div>

              <div>
                <label htmlFor="to" className="block text-typography-primary-blue font-semibold">
                  To
                </label>
                <input
                  id="to"
                  type="date"
                  className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
                />
              </div>
              <div>
                <label htmlFor="guests" className="block text-typography-primary-blue font-semibold">
                  No. of Guests
                </label>
                <input
                  id="guests"
                  type="number"
                  min={1}
                  className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
                />
              </div>

              <div className="text-center my-4 flex flex-col pb-4">
                <p className="text-body-large text-typography-primary-grey font-medium mb-4">Subtotal</p>
                <p className="text-accent-pink font-extrabold text-4xl">${price}</p>
              </div>
              <div className="w-full place-self-center">
                <Button
                  label="Confirm Booking"
                  type="button"
                  ariaLabel="Confirm booking"
                  variant="primary"
                  size="large"
                  fullWidth={true}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageSection>
  );
}

export default VenueCard;
