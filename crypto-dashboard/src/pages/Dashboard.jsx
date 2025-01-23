import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchCurrentPrice, fetchHistoricalData } from "../store/cryptoSlice"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const dispatch = useDispatch()
  const { selectedCrypto, currentPrice, priceChange, historicalData } = useSelector((state) => state.crypto)

  useEffect(() => {
    dispatch(fetchCurrentPrice(selectedCrypto))
    dispatch(fetchHistoricalData(selectedCrypto))
  }, [dispatch, selectedCrypto])

  const chartData = {
    labels: historicalData.map((data) => new Date(data.date).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: historicalData.map((data) => data.priceUsd),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    // maintainAspectRatio: false, // Ensure chart fits its container
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `${selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)} Price - Last 7 Days`,
      },
    },
  }

  return (
    <div className="bg-gray-100 overflow-hidden">
      <div className="flex flex-wrap lg:flex-nowrap gap-6">
        
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="w--full">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)} Current Price
            </h2>
            <p className="text-4xl font-extrabold text-blue-600 mb-4">${currentPrice.toFixed(2)}</p>
            <p className={`text-2xl font-semibold ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {priceChange >= 0 ? "▲" : "▼"} {Math.abs(priceChange).toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="flex-2 bg-white p-6 rounded-lg shadow-lg w-full">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Price History</h2>
          <div className="w-full place-items-center" style={{ height: "400px" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
