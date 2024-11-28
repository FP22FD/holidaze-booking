import Button from '../../../shared/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import { useUpdateVenue } from '../hooks/useUpdateVenue';
import { ModalMessage } from '../../../shared/components/Modal';
import { PiCheckCircleFill } from 'react-icons/pi';
import { EditVenueRequest, useCreateVenue } from '../hooks/useCreateVenue';
import { Venue } from '../../../types/venue.type';

interface Props {
  editMode: 'edit' | 'create';
  venue: Venue;
  onClose: () => void;
}

interface VenueForm {
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  price: number;
  maxGuests: number;
  rating: number;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

const validateUrl = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) {
      return new Yup.ValidationError('The URL is not publicly accessible.', null, 'imageUrl');
    }
    return true;
  } catch {
    return new Yup.ValidationError('The URL is not valid or accessible.', null, 'imageUrl');
  }
};

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Please enter the venue name').min(3, 'Venue name must be at least 3 characters'),
  rating: Yup.number()
    .required('Please enter the venue rating')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  imageUrl: Yup.string()
    .trim()
    .url('Please enter a valid URL for your venue image')
    .required('Please enter the venue image url')
    .test('check-url', 'The URL is not valid or accessible.', validateUrl),
  imageAlt: Yup.string()
    .trim()
    .required('Please enter the image description')
    .min(4, 'Image description must be at least 4 characters'),
  price: Yup.number()
    .required('Please enter the venue price')
    .min(1, 'Price must be at least 1')
    .max(10000, 'Price must be at most 10000'),
  maxGuests: Yup.number()
    .required('Please enter the max maxGuests')
    .min(1, 'maxGuests must be at least 1')
    .max(100, 'maxGuests must be at most 100'),
  description: Yup.string()
    .trim()
    .required('Please enter venue description')
    .min(8, 'description must be at least 8 characters'),
  wifi: Yup.boolean().required(),
  parking: Yup.boolean().required(),
  breakfast: Yup.boolean().required(),
  pets: Yup.boolean().required(),
}).required();

const VenueForm = ({ editMode, venue, onClose }: Props) => {
  const { loading: loadingCreate, error: errorCreate, createVenue } = useCreateVenue();
  const { loading: loadingUpdate, error: errorUpdate, updateVenue } = useUpdateVenue();
  const [formError, setFormError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const loading = loadingCreate || loadingUpdate;
  const error = errorCreate || errorUpdate;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: venue.name,
      rating: venue.rating,
      imageUrl: venue.media[0]?.url || '',
      imageAlt: venue.media[0]?.alt || '',
      price: venue.price,
      maxGuests: venue.maxGuests,
      description: venue.description,
      wifi: venue.meta.wifi,
      parking: venue.meta.parking,
      breakfast: venue.meta.breakfast,
      pets: venue.meta.pets,
    },
  });

  const onSubmit: SubmitHandler<VenueForm> = async (data, e) => {
    e?.preventDefault();
    setFormError('');

    const request: EditVenueRequest = {
      name: data.name,
      description: data.description,
      media: [{ url: data.imageUrl, alt: data.imageAlt }],
      price: data.price,
      maxGuests: data.maxGuests,
      rating: data.rating,
      location: {
        address: '',
        city: '',
        zip: '',
        country: '',
        continent: '',
        lat: undefined,
        lng: undefined,
      },
      meta: {
        wifi: data.wifi,
        parking: data.parking,
        breakfast: data.breakfast,
        pets: data.pets,
      },
    };

    if (editMode === 'create') {
      const { success } = await createVenue(request);
      if (success) {
        setIsSuccess(true);
      } else {
        setFormError('Failed to create venue. Please try again later.');
      }
    } else if (editMode === 'edit' && venue) {
      const { success } = await updateVenue(venue.id, request);
      if (success) {
        setIsSuccess(true);
      } else {
        setFormError('Failed to update venue. Please try again later.');
      }
    }
  };

  return (
    <>
      {error && <div className="text-status-error-red text-center my-4">{error}</div>}

      {isSuccess && (
        <ModalMessage
          onClose={onClose}
          message="You have successfully updated your venue!"
          icon={<PiCheckCircleFill className="w-16 h-16 text-primary-dark-blue" />}
        />
      )}

      <form
        className="bg-neutral-white border w-full rounded-lg px-6 py-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {formError && <div className="text-status-error-red text-center my-4">{formError}</div>}

        <div className="place-self-start text-body-medium sm:text-body-medium w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start mb-2">
            <div className="w-full">
              <label htmlFor="name" id="name" className="block text-typography-primary-blue">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                placeholder="Enter venue name"
                aria-labelledby="name"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
              />

              {errors.name && <div className="text-status-error-red">{errors.name.message}</div>}
            </div>

            <div>
              <label htmlFor="rating" id="rating" className="block text-typography-primary-blue">
                Rating
              </label>
              <input
                id="rating"
                type="number"
                min="1"
                max="5"
                {...register('rating')}
                placeholder="Enter rating number"
                aria-labelledby="rating"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
              />

              {errors.rating && <div className="text-status-error-red">{errors.rating.message}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start mb-2">
            <div className="w-full">
              <label htmlFor="imageUrl" id="imageUrl" className="block text-typography-primary-blue">
                Image url
              </label>
              <input
                id="imageUrl"
                type="url"
                {...register('imageUrl')}
                placeholder="Enter image url"
                aria-labelledby="imageUrl"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
              />
              {errors.imageUrl && <div className="text-status-error-red">{errors.imageUrl.message}</div>}
            </div>

            <div>
              <label htmlFor="imageAlt" id="imageAlt" className="block text-typography-primary-blue">
                Image Alt
              </label>
              <input
                id="imageAlt"
                type="text"
                {...register('imageAlt')}
                placeholder="Enter image name"
                aria-labelledby="imageAlt"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
              />
              {errors.imageAlt && <div className="text-status-error-red">{errors.imageAlt.message}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start mb-2">
            <div className="w-full">
              <label htmlFor="price" id="price" className="block text-typography-primary-blue">
                Price
              </label>
              <input
                id="price"
                min="1"
                max="10000"
                type="number"
                {...register('price')}
                placeholder="Enter venue price"
                aria-labelledby="price"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
              />
              {errors.price && <div className="text-status-error-red">{errors.price.message}</div>}
            </div>

            <div>
              <label htmlFor="maxGuests" id="maxGuests" className="block text-typography-primary-blue">
                maxGuests
              </label>
              <input
                id="maxGuests"
                min="1"
                max="100"
                type="number"
                {...register('maxGuests')}
                placeholder="Enter max maxGuests"
                aria-labelledby="maxGuests"
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
              />
              {errors.maxGuests && <div className="text-status-error-red">{errors.maxGuests.message}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 text-start text-body-small border rounded-md py-3 px-1 my-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4">
              <div className="flex place-items-center gap-1 md:gap-2">
                <input
                  id="wifi"
                  type="checkbox"
                  value="1"
                  {...register('wifi')}
                  aria-labelledby="wifi"
                  className="w-3 h-3 md:w-4 md:h-4 border rounded-full appearance-none checked:bg-primary-dark-blue checked:border-none focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
                />
                <label htmlFor="wifi" id="wifi" className="block text-typography-primary-blue">
                  WiFi
                </label>
              </div>

              <div className="flex place-items-center gap-1 md:gap-2">
                <input
                  id="parking"
                  type="checkbox"
                  value="1"
                  {...register('parking')}
                  aria-labelledby="parking"
                  className="w-3 h-3 md:w-4 md:h-4 border rounded-full appearance-none checked:bg-primary-dark-blue checked:border-none focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
                />
                <label htmlFor="parking" id="parking" className="block text-typography-primary-blue">
                  Parking
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4">
              <div className="flex place-items-center gap-1 md:gap-2">
                <input
                  id="pets"
                  type="checkbox"
                  value="1"
                  {...register('pets')}
                  aria-labelledby="pets"
                  className="w-3 h-3 md:w-4 md:h-4 border rounded-full appearance-none checked:bg-primary-dark-blue checked:border-none focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
                />
                <label htmlFor="pets" id="pets" className="block text-typography-primary-blue">
                  Pets
                </label>
              </div>

              <div className="flex place-items-center gap-1 md:gap-2">
                <input
                  id="breakfast"
                  type="checkbox"
                  value="1"
                  {...register('breakfast')}
                  aria-labelledby="breakfast"
                  className="w-3 h-3 md:w-4 md:h-4 border rounded-full appearance-none checked:bg-primary-dark-blue checked:border-none focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
                />
                <label htmlFor="breakfast" id="breakfast" className="block text-typography-primary-blue">
                  Breakfast
                </label>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" id="description" className="block text-typography-primary-blue text-start">
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              placeholder="Enter description"
              aria-labelledby="description"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-offset-primary-light-blue"
            ></textarea>

            {errors.description && <div className="text-status-error-red text-start">{errors.description.message}</div>}
          </div>

          <div className="flex mt-6 place-self-center">
            {editMode === 'create' && (
              <Button
                type="submit"
                label="Create Venue"
                ariaLabel="Create Venue"
                size="medium"
                variant="primary"
                disabled={loading}
              />
            )}

            {editMode === 'edit' && (
              <Button
                type="submit"
                label="Edit Venue"
                ariaLabel="Edit Venue"
                size="medium"
                variant="primary"
                disabled={loading}
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default VenueForm;
