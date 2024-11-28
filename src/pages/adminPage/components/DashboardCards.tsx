import { AdminVenuesStats } from '../hooks/useDashboard';

interface Props {
  stats: AdminVenuesStats;
}

const DashboardCards = ({ stats }: Props) => {
  return (
    <div className="m-2">
      <div>
        <div className="flex justify-between">
          <div className="border rounded-lg p-10 m-2 text-center w-full">
            <p className="font-semibold text-typography-primary-grey">Venues</p>
            <span className="text-primary-dark-blue font-bold text-lead-paragraph">{stats.venues}</span>
          </div>
          <div className="border rounded-lg p-10 m-2 text-center w-full">
            <p className="font-semibold text-typography-primary-grey">Bookings</p>
            <span className="text-primary-dark-blue font-bold text-lead-paragraph">{stats.bookings}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
