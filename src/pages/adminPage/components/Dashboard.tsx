import PageSection from '../../../shared/components/PageSection';
import Spinner from '../../../shared/components/Spinner';
import { usePersistContext } from '../../../store/usePersistContext';
import { useVenueManagement } from '../hooks/useDashboard';
import StatOverviewCards from './DashboardOverviewSection';
import ManageVenues from './DashboardVenueSection';
import VenueBookings from './DashboardBookingSection';

function Dashboard() {
  const { requireUserLevel, profileData } = usePersistContext();
  const { error, loading, stats, venuesData, loadVenues } = useVenueManagement(profileData?.name);

  requireUserLevel('customer');

  if (loading) {
    return (
      <div className="text-typography-primary-blue">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-status-error-red">{error}</div>;
  }

  if (!stats) {
    return;
  }

  return (
    <PageSection
      title="Dashboard"
      seoTitle="Dashboard | Holidaze Booking"
      seoDescription="Browse our wide range of venues and find what you're looking for!"
      searchBar={false}
    >
      <div className="w-full mx-auto flex flex-col md:flex-row md:space-x-8 lg:space-x-16 py-2">
        <div className="w-full flex flex-col gap-8 border rounded-lg pb-10">
          <StatOverviewCards stats={stats} />
          <ManageVenues venues={venuesData ?? []} onRefresh={() => loadVenues()} />
          <VenueBookings venues={venuesData ?? []} />
        </div>
      </div>
    </PageSection>
  );
}

export default Dashboard;
