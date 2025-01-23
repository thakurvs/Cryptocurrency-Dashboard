import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { fetchHistoricalData } from "../store/cryptoSlice"

const History = () => {
    const dispatch = useDispatch()
    const { selectedCrypto, historicalData, error } = useSelector((state) => state.crypto);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = historicalData.filter((data) =>
        // console.log(`data.date is ${data.date}`),
        new Date(data.date).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (selectedCrypto) {
            dispatch(fetchHistoricalData(selectedCrypto));
        }
    }, [dispatch, selectedCrypto])

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)} Historical Data</h2>
          {error && <p className="text-red-500">Error: {error}</p>}
          <input
            type="text"
            placeholder="Search by date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          
          {historicalData.length === 0 && !error ? (
            <p className="text-gray-500">Loading data...</p>
          ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Date</th>
                <th className="p-2">Price (USD)</th>
                <th className="p-2">24h Volume</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (

                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="p-2">{new Date(data.date).toLocaleDateString()}</td>
                  <td className="p-2">
                    ${data.priceUsd ? data.priceUsd.toFixed(2) : "N/A"}
                  </td>
                  <td className="p-2">
                    ${data.volume ? data.volume.toLocaleString() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;