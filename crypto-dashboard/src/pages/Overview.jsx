import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOverviewData } from "../store/cryptoSlice";

function Overview() {
  const dispatch = useDispatch();
  const { selectedCrypto, overviewData } = useSelector((state) => state.crypto);

  useEffect(() => {
    dispatch(fetchOverviewData(selectedCrypto));
  }, [dispatch, selectedCrypto]);

  if (!overviewData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg mx-auto">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 text-center">
        {selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)} Overview
      </h2> 

      <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center">
          Description
        </h3>
        <p className="text-sm md:text-base text-gray-700 text-center leading-relaxed line-clamp-3">
          {overviewData.description || "No description available for this cryptocurrency."}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
        {/* Market Cap */}
        <div className="bg-white p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 font-semibold text-sm mb-1">Market Cap</p>
          <p className="text-base md:text-lg font-bold text-blue-600 truncate">
            ${overviewData.marketCap.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 font-semibold text-sm mb-1">Total Supply</p>
          <p className="text-base md:text-lg font-bold text-blue-600 truncate">
            {overviewData.totalSupply.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 font-semibold text-sm mb-1">Circulating Supply</p>
          <p className="text-base md:text-lg font-bold text-blue-600 truncate">
            {overviewData.circulatingSupply.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 font-semibold text-sm mb-1">All-Time High</p>
          <p className="text-base md:text-lg font-bold text-green-500 truncate">
            ${overviewData.allTimeHigh.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-3 md:p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 font-semibold text-sm mb-1">Rank</p>
          <p className="text-base md:text-lg font-bold text-purple-600 truncate">
            {overviewData.rank}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
