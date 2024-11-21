import { PiTrashSimpleLight } from 'react-icons/pi';

const VenueBookings = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 m-2">
      <div
        key="1"
        className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg
        transition-shadow"
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img src="booking.url" alt="Venue Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-semibold text-primary-dark-blue">Name</h4>
            <p className="text-sm text-typography-primary-grey">Guests: 2</p>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-700">
          <p>
            <strong>Check-in:</strong> 20/12/2024
          </p>
          <p>
            <strong>Check-out:</strong> 25/12/2024
          </p>
        </div>

        <div className="mt-4">
          <button className="text-status-error-red flex items-center space-x-2">
            <PiTrashSimpleLight />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueBookings;
