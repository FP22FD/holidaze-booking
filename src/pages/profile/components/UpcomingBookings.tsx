import { useState } from 'react';
import Button from '../../../shared/components/Button';
import { BookingData, useBookingsProfile } from '../hooks/useBookingsProfile';
import { PiImageDuotone } from 'react-icons/pi';

interface Props {
  name: string;
}

const UpcomingBookings = ({ name }: Props) => {
  const { loading, error, data } = useBookingsProfile(name);
  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (!data) {
    return null;
  }

  const getImageUrl = (booking: BookingData) => (booking.venue.media?.length ? booking.venue.media[0].url : '');
  const getAltText = (booking: BookingData) =>
    booking.venue.media?.length ? booking.venue.media[0].alt : 'Venue Image';

  return (
    <div className="p-2">
      <h2 className="text-primary-dark-blue text-heading-6 mb-6">Upcoming Bookings</h2>

      {loading && <p className="text-typography-primary-grey">Loading...</p>}
      {error && <p className="text-status-error-red">{error}</p>}

      {!loading && !error && data.length === 0 && <p className="text-primary-grey">No upcoming bookings found.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((booking: BookingData) => (
          <div key={booking.id} className="bg-neutral-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="object-cover rounded overflow-hidden">
                {imageError || !getImageUrl(booking) ? (
                  <PiImageDuotone className="w-full h-48 object-cover text-neutral-default" />
                ) : (
                  <img
                    className="object-cover h-48 rounded"
                    width={500}
                    src={getImageUrl(booking)}
                    alt={getAltText(booking)}
                    onError={handleImageError}
                  />
                )}
              </div>
            </div>

            <div className="mt-4 text-primary-dark-blue text-body-medium">
              <h6 className="mb-4 font-medium">{booking.venue.name}</h6>
              <div className="flex justify-between">
                <div className="text-start">
                  <p className="text-typography-primary-grey">Check-in</p>
                  <p>{new Date(booking.dateFrom).toLocaleDateString()}</p>
                </div>
                <div className="text-end">
                  <p className="text-typography-primary-grey">Check-out</p>
                  <p>{new Date(booking.dateTo).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 place-self-end">
              <Button label={'Delete'} type={'button'} variant="secondary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBookings;
