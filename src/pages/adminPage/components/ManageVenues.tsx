import { PiImageDuotone, PiMapPinFill, PiPlusLight } from 'react-icons/pi';
import StarRating from '../../../shared/components/StarRating';
import Button from '../../../shared/components/Button';
import { AdminVenueData } from '../types/dashboardResponse.type';
import { useState } from 'react';
import { Modal } from '../../../shared/components/Modal';
import VenueForm from './VenueForm';
import { Venue } from '../../../types/venue.type';
import Spinner from '../../../shared/components/Spinner';
import { useDeleteVenue } from '../hooks/useDeleteVenue';

interface Props {
  venues: AdminVenueData[];
  onRefresh: () => void;
}

const ManageVenues = ({ venues, onRefresh }: Props) => {
  const { loading: loadingDelete, error: errorDelete, deleteVenue } = useDeleteVenue();

  const [inUpdate, setInUpdate] = useState<Venue | undefined>(undefined);
  const [inDelete, setInDelete] = useState<Venue | undefined>(undefined);
  const [inCreate, setInCreate] = useState<Venue | undefined>(undefined);

  const handleCreateVenue = () => {
    setInCreate({
      id: '',
      created: '',
      updated: '',
      name: '',
      description: '',
      media: [],
      price: 0,
      maxGuests: 0,
      rating: 0,
      location: { country: '' },
      meta: { pets: false, breakfast: false, wifi: false, parking: false },
      _count: { bookings: 0 },
    });
  };

  return (
    <>
      {inCreate && (
        <Modal
          onClose={() => setInCreate(undefined)}
          title="Create Venue"
          body={
            <VenueForm
              editMode="create"
              venue={inCreate}
              onClose={() => {
                setInCreate(undefined);
                onRefresh();
              }}
            />
          }
        />
      )}

      {inUpdate && (
        <Modal
          onClose={() => setInUpdate(undefined)}
          title="Edit Venue"
          body={
            <VenueForm
              editMode="edit"
              venue={inUpdate}
              onClose={() => {
                setInUpdate(undefined);
                onRefresh();
              }}
            />
          }
        />
      )}

      {inDelete && (
        <Modal
          body={
            <>
              Are you sure you want to delete the venue{' '}
              <span className="font-bold text-primary-dark-blue">{inDelete.name}</span>
            </>
          }
          footer={
            <div className="flex space-x-4 justify-center">
              {loadingDelete && <Spinner />}

              {errorDelete && <p className="text-status-error-red">{errorDelete}</p>}

              {!loadingDelete && (
                <>
                  <Button
                    label="Cancel"
                    type="button"
                    ariaLabel="cancel"
                    variant="secondary"
                    onClick={() => setInDelete(undefined)}
                  />
                  <Button
                    label="Yes, delete it"
                    type="button"
                    ariaLabel="yes, delete it"
                    variant="primary"
                    onClick={async () => {
                      const { success } = await deleteVenue(inDelete.id);
                      if (success) {
                        setInDelete(undefined);
                        onRefresh();
                      }
                    }}
                  />
                </>
              )}
            </div>
          }
        />
      )}

      <div className="m-2 p-2">
        <div className="flex justify-between p-2 place-items-center border-b mx-2">
          <p className="font-semibold">Venues</p>
          <div className="flex space-x-2 text-body-small sm:text-body-medium text-typography-primary-grey">
            <p>Venues</p>
            <span className="font-semibold">{venues.length}</span>
          </div>
        </div>

        <div className="gap-4 py-6 flex">
          <div className="gap-4 flex-1 md:flex">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="shadow-md hover:shadow-lg transition-shadow p-2 rounded-lg flex flex-col justify-between w-full"
              >
                {venue.media.length > 0 ? (
                  <img
                    src={venue.media[0].url}
                    alt={venue.media[0].alt || 'Venue image'}
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <PiImageDuotone className="w-full h-48 object-cover text-neutral-default" />
                )}

                <h4 className="text-typography-primary-blue font-bold">{venue.name}</h4>

                <div className="flex justify-between mb-4 items-center">
                  <div className="text-body-medium flex items-center">
                    <PiMapPinFill className="mr-2" />
                    {venue.location?.country || 'Norway'}
                  </div>
                  <div className="flex flex-col items-start">
                    {venue.rating && <StarRating rating={venue.rating} />}
                    <div className="text-typography-primary-grey text-body-small flex space-x-1"></div>
                  </div>
                </div>

                <p className="text-body-small mb-4 whitespace-pre-line">{venue.description}</p>

                <div className="flex justify-between text-body-small mb-4">
                  <div className="flex flex-col items-start">
                    <span>{venue.maxGuests}</span>
                    <span className="text-typography-primary-grey text-body-small">Max Guests</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span>{venue.price}</span>
                    <span className="text-typography-primary-grey text-body-small">per person</span>
                  </div>
                </div>

                <div className="flex justify-between text-body-small">
                  <div className="flex flex-col items-start">
                    <p className="tracking-tight">Facilities</p>
                    <div className="text-typography-primary-grey text-body-small">
                      <div className="flex flex-wrap justify-between gap-4 text-body-small">
                        {venue.meta?.pets && <span>Pets</span>}
                        {venue.meta?.breakfast && <span>Breakfast</span>}
                        {venue.meta?.wifi && <span>Free Wifi</span>}
                        {venue.meta?.parking && <span>Free Parking</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-neutral-default my-4"></div>

                <div className="flex items-center justify-between"></div>
                <div className="flex justify-between">
                  <div className="text-typography-primary-grey place-items-center space-y-4 my-4">
                    <Button
                      label="Edit Venue"
                      type="button"
                      ariaLabel="Edit venue"
                      variant="secondary"
                      size="small"
                      onClick={() => setInUpdate(venue)}
                    />
                  </div>

                  <div className="text-typography-primary-grey place-items-center space-y-4 my-4">
                    <Button
                      label="Delete Venue"
                      type="button"
                      ariaLabel="Edit venue"
                      variant="secondary"
                      size="small"
                      onClick={() => setInDelete(venue)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="shadow-md hover:shadow-lg transition-shadow p-2 rounded-lg border flex items-center justify-center min-w-48 lg:min-w-72">
              <div className="text-typography-primary-grey place-items-center space-y-4 my-4">
                <button aria-label="Create Venue" onClick={handleCreateVenue}>
                  <PiPlusLight className="text-typography-primary-white bg-pink-gradient rounded w-8 h-8" />
                </button>
                <p>Create Venue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageVenues;
