import { PiMapPinFill, PiPlusLight } from 'react-icons/pi';
import StarRating from '../../../shared/components/StarRating';

const ManageVenues = () => {
  return (
    <div className="m-2 p-2">
      <div className="flex md:flex-wrap gap-4">
        <div key="1" className="flex-1 border p-2 rounded-lg flex flex-col justify-between">
          <img src="url" alt="Venue image" className="w-full h-32 object-cover mb-4" />
          <h4 className="text-typography-primary-blue font-bold">Name</h4>
          <span className="text-body-medium flex items-center">
            <PiMapPinFill className="mr-2" />
            Location
          </span>
          <StarRating />
          <p className="text-body-medium mt-2">Description</p>
        </div>

        <div className="flex-1 border p-2 rounded-lg flex items-center justify-center">
          <div className="text-neutral-dark place-items-center space-y-2">
            <div>
              <PiPlusLight className="text-typography-primary-white bg-pink-gradient rounded w-8 h-8" />
            </div>
            <p>Create Venue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageVenues;
