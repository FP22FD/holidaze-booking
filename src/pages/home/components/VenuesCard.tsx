import { PiImageDuotone, PiMapPinFill } from 'react-icons/pi';
import StarRating from '../../../shared/components/StarRating';
import { Venue } from '../../../types/venues.type';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SkeletonVenuesCard } from './SkeletonVenuesCard';

type CardProps = {
  data?: Venue;
  loading: boolean;
};

function VenuesCard({ data, loading }: CardProps) {
  const [imageError, setImageError] = useState<boolean>(false);

  const { media, location, name, rating, price } = data || {};

  const imageUrl = media?.length ? media[0].url : '';
  const altText = media?.length ? media[0].alt : 'Venue Image';
  const locationCountry = location?.country || 'Location unavailable';
  const reviews = 0;

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return <SkeletonVenuesCard />;
  }

  return (
    <div className="sm:max-w-sm rounded-lg border border-neutral-default bg-neutral-white shadow p-4" key={data?.id}>
      <Link to={`/venues/${data?.id}`}>
        {imageError || !imageUrl ? (
          <PiImageDuotone className="w-full h-48 object-cover text-neutral-default" />
        ) : (
          <img
            className="w-full object-cover h-48 rounded"
            width={500}
            src={imageUrl}
            alt={altText}
            onError={handleImageError}
          />
        )}
      </Link>

      <div className="my-4">
        <h2 className="tracking-tight text-primary-dark-blue text-body-normal font-semibold mb-1">{name}</h2>
        <div className="text-typography-primary-blue flex items-center gap-1 text-body-small font-medium">
          <PiMapPinFill />
          {locationCountry}
        </div>
      </div>

      <div className="border-t border-neutral-default mb-3"></div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <StarRating rating={rating} />
          <div className="text-typography-primary-grey text-body-small flex space-x-1">
            <span>{reviews}</span>
            <span>reviews</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="tracking-tight text-accent-pink font-bold text-heading-4">{price}</span>
          <span className="text-typography-primary-grey text-body-small">per person</span>
        </div>
      </div>
    </div>
  );
}

export default VenuesCard;
