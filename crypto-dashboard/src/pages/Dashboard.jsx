import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux"
import { fetchCurrentPrice, fetchHistoricalData } from '../store/cryptoSlice'
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
          tension: 0.1,
        },
      ],
    }
  
    const chartOptions = {
      responsive: true,
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
      <div className="space-y-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)} Current Price</h2>
          <p className="text-4xl font-bold">${currentPrice.toFixed(2)}</p>
          <p className={`text-lg ${priceChange >= 0 ? "text-green-600" : "text-red-600"}`}>
            {priceChange >= 0 ? "▲" : "▼"} {Math.abs(priceChange).toFixed(2)}%
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Price History</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    )
  }
  
  export default Dashboard