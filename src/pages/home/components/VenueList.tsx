import { useEffect, useState } from 'react';
import { Venue } from '../../../types/venues.type';
import { useFetchVenues } from '../hooks/fetchVenues';
import VenuesCard from './VenuesCard';
import PageSection from '../../../shared/components/PageSection';

function VenueList() {
  const { data, loading, error } = useFetchVenues();
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);

  useEffect(() => {
    setFilteredVenues(data ? data : []);
  }, [data]);

  return (
    <PageSection
      title="Venues"
      seoTitle="Venues | Holidaze Booking"
      seoDescription="Browse our wide range of venues and find what you're looking for!"
      searchBar={true}
      error={error}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-2">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => <VenuesCard key={index} loading={true} />)
          : filteredVenues.map((venue) => <VenuesCard key={venue.id} data={venue} loading={false} />)}
      </div>
    </PageSection>
  );
}

export default VenueList;
