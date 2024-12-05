import { usePersistContext } from '../../../store/usePersistContext';
import { useVenueManagement } from '../hooks/useDashboard';
import PageSection from '../../../shared/components/PageSection';
import Spinner from '../../../shared/components/Spinner';
import DashboardOverviewSection from './DashboardOverviewSection';
import DashboardVenueSection from './DashboardVenueSection';
import DashboardBookingSection from './DashboardBookingSection';

function Dashboard() {
  const { requireUserLevel, profileData } = usePersistContext();
  const { error, loading, stats, venuesData, loadVenues } = useVenueManagement(profileData?.name);

  requireUserLevel('manager');

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
      title="Manager Dashboard"
      seoTitle="Manager Dashboard | Holidaze Booking"
      seoDescription="Manage your venues and bookings made from your customer"
      searchBar={false}
    >
      <div className="w-full mx-auto flex flex-col md:flex-row md:space-x-8 lg:space-x-16 pb-2">
        <div className="w-full flex flex-col gap-8 rounded-lg pb-10">
          <DashboardOverviewSection stats={stats} />
          <DashboardVenueSection venues={venuesData ?? []} onRefresh={() => loadVenues()} />
          <DashboardBookingSection venues={venuesData ?? []} />
        </div>
      </div>
    </PageSection>
  );
}

export default Dashboard;
