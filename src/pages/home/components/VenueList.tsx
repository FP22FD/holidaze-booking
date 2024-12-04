import { useFetchVenues } from '../hooks/fetchVenues';
import VenueCard from './VenueCard';
import PageSection from '../../../shared/components/PageSection';
import { SkeletonVenuesCard } from './SkeletonVenuesCard';

function VenueList() {
  const { data, loading, error } = useFetchVenues();
  const venues = data || [];

  return (
    <PageSection
      title="Venues"
      seoTitle="List of all available Venues | Holidaze Booking"
      seoDescription="Browse our wide range of venues and find what you're looking for!"
      searchBar={true}
      error={error}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-2">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => <SkeletonVenuesCard key={index} />)
          : venues.map((venue) => <VenueCard key={venue.id} data={venue} />)}
      </div>
    </PageSection>
  );
}

export default VenueList;
