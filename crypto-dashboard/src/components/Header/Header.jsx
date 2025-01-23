import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {setSelectedCrypto} from "../../store/cryptoSlice"
import Select from 'react-select';
import './Header.scss'

const Header = ()  => {

    const [cryptoOptions, setCryptoOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const selectedCrypto = useSelector((state) => state.crypto.selectedCrypto);

    useEffect(() => {
        const fetchCryptoData = async() => {
            try {
                const response = await fetch('https://api.coincap.io/v2/assets');
                const data = await response.json();
                const options = data.data.map((crypto) => ({
                    value: crypto.id,
                    label: `${crypto.name} (${crypto.symbol})`,
                  }));
                  setCryptoOptions(options);
                  setLoading(false);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching cryptocurrency data:', error);
            }
        };

        fetchCryptoData();
    }, []);

    const handleCryptoChange = (selectedOption) => {
        dispatch(setSelectedCrypto(selectedOption.value));
    }

  return (
    <header className="w-full bg-gray-800 shadow-lg sticky z-50 top-0 text-white p-4">
      <div className="w-full flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl main-header">
        <h1 className="text-2xl font-bold">Crypto Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/overview" className="hover:text-gray-300">
                Overview
              </Link>
            </li>
            <li>
              <Link to="/history" className="hover:text-gray-300">
                History
              </Link>
            </li>
          </ul>
        </nav>
        {/* <select value={selectedCrypto} onChange={handleCryptoChange} className="bg-gray-700 text-white p-2 rounded">
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="dogecoin">Dogecoin</option>
        </select> */}
        <div className="w-full md:w-1/3 mt-4 md:mt-0">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Select
            options={cryptoOptions}
            onChange={handleCryptoChange}
            defaultValue={cryptoOptions.find((option) => option.value === selectedCrypto)}
            placeholder="Select a Cryptocurrency"
            className="bg-gray-700 text-black p-2 rounded"
          />
        )}
      </div>
      </div>
    </header>
  )
}

export default Header