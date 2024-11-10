import { PiStarFill } from 'react-icons/pi';

type RatingProps = {
  rating?: number;
};

const StarRating = ({ rating = 0 }: RatingProps) => {
  const maxRating = 5;

  const stars = [...Array(maxRating)].map((_, index) =>
    index < rating ? (
      <PiStarFill key={index} className="text-star-bronze" />
    ) : (
      <PiStarFill key={index} className="text-neutral-default" />
    ),
  );

  return (
    <div className="flex gap-2 justify-between">
      <span className="flex">{stars}</span>
    </div>
  );
};

export default StarRating;