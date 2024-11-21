const DashboardCards = () => {
  return (
    <div className="m-2">
      <div>
        <div className="flex justify-between">
          <div className="border rounded-lg p-10 m-2 text-center w-full">
            <p className="font-semibold text-neutral-dark">Venues</p>
            <span className="text-primary-dark-blue font-bold text-lead-paragraph">1</span>
          </div>
          <div className="border rounded-lg p-10 m-2 text-center w-full">
            <p className="font-semibold text-neutral-dark">Bookings</p>
            <span className="text-primary-dark-blue font-bold text-lead-paragraph">1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
