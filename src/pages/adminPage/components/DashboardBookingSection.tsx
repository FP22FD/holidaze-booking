import { PiUsersFill } from 'react-icons/pi';
import { AdminVenueData } from '../types/dashboardResponse.type';

interface Props {
  venues: AdminVenueData[];
}

const VenueBookings = ({ venues }: Props) => {
  return venues.map((venue) => (
    <div key={venue.id}>
      <div className="flex justify-between p-2 place-items-center border-b mx-2">
        <p className="font-semibold">{venue.name}</p>
        <div className="flex space-x-2 text-body-small sm:text-body-medium text-typography-primary-grey">
          <p>Bookings</p>
          <span className="font-semibold">{venue._count.bookings}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2 m-2">
        {venue.bookings.length === 0 && (
          <div className="flex min-w-max">
            <p className="text-body-small text-typography-primary-grey md:text-body-medium">
              Currently, this venue is not booked!
            </p>
          </div>
        )}

        {venue.bookings
          .sort((v1, v2) => new Date(v2.dateFrom).valueOf() - new Date(v1.dateFrom).valueOf())
          .map((booking) => (
            <div
              key={booking.id}
              className="bg-neutral-white rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex-col text-body-small">
                <div className="flex-col place-self-end text-center">
                  <span>
                    <PiUsersFill className="h-6 w-6 text-neutral-dark" />
                  </span>
                  <p className="text-typography-primary-grey">{booking.guests}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src={booking.customer.avatar.url}
                      alt={booking.customer.avatar.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-dark-blue">{booking.customer.name}</h4>
                    <p className="text-typography-primary-grey">{booking.customer.email}</p>
                  </div>
                </div>
                <div className="border-t border-neutral-default my-4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col text-center">
                    <p className="font-semibold">From</p>
                    <p className="text-typography-primary-grey">{new Date(booking.dateFrom).toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col text-center">
                    <p className="font-semibold">To</p>
                    <p className="text-typography-primary-grey">{new Date(booking.dateTo).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  ));
};

export default VenueBookings;