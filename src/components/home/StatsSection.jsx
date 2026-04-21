const StatsSection = () => {
  return (
    <div className="w-full bg-black py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Happy Customers */}
          <div className="text-center">
            <h3 className="font-orbitron text-5xl font-black text-white md:text-6xl">
              10K+
            </h3>
            <p className="mt-3 text-lg font-medium text-white md:text-xl">
              Happy Customers
            </p>
          </div>

          {/* New Arrivals */}
          <div className="text-center">
            <h3 className="font-orbitron text-5xl font-black text-white md:text-6xl">
              500+
            </h3>
            <p className="mt-3 text-lg font-medium text-white md:text-xl">
              New Arrivals
            </p>
          </div>

          {/* Satisfaction Rate */}
          <div className="text-center">
            <h3 className="font-orbitron text-5xl font-black text-white md:text-6xl">
              99%
            </h3>
            <p className="mt-3 text-lg font-medium text-white md:text-xl">
              Satisfaction Rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
