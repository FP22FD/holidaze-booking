import PageSection from '../../../shared/components/PageSection';
import { usePersistContext } from '../../../store/usePersistContext';
import DashboardCards from './DashboardCards';
import ManageVenues from './ManageVenues';
import VenueBookings from './VenueBookings';

function Dashboard() {
  const { requireUserLevel } = usePersistContext();
  requireUserLevel('customer');

  return (
    <PageSection
      title="Dashboard"
      seoTitle="Dashboard | Holidaze Booking"
      seoDescription="Browse our wide range of venues and find what you're looking for!"
      searchBar={false}
    >
      <div className="w-full mx-auto flex flex-col md:flex-row md:space-x-8 lg:space-x-16 py-2">
        <div className="w-full space-y-8 border rounded-lg">
          <DashboardCards />
          <ManageVenues />
          <VenueBookings />
        </div>
      </div>
    </PageSection>
  );
}

export default Dashboard;
