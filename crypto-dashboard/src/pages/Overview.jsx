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
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        {selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)} Overview
      </h2>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Description</h3>
            <p className="text-gray-700 text-center leading-relaxed">
            {overviewData.description || "No description available for this cryptocurrency."}
            </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 font-semibold mb-2">Market Cap</p>
          <p className="text-xl font-bold text-blue-600">
            ${overviewData.marketCap.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 font-semibold mb-2">Total Supply</p>
          <p className="text-xl font-bold text-blue-600">
            {overviewData.totalSupply.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 font-semibold mb-2">Circulating Supply</p>
          <p className="text-xl font-bold text-blue-600">
            {overviewData.circulatingSupply.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 font-semibold mb-2">All-Time High</p>
          <p className="text-xl font-bold text-green-500">
            ${overviewData.allTimeHigh.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-600 font-semibold mb-2">Rank</p>
          <p className="text-xl font-bold text-purple-600">{overviewData.rank}</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
