import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const API_BASE_URL = "https://api.coincap.io/v2";

export const fetchCurrentPrice = createAsyncThunk(
    'crypto/fetchCurrentPrice',
    async (crypto) => {
        const response = await axios.get(`${API_BASE_URL}/assets/${crypto}`);
        return response.data.data;
    }   
)

export const fetchHistoricalData = createAsyncThunk(
    'crypto/fetchHistoricalData',
    async (crypto, {rejectWithValue}) => {
        try {
            // const end = Date.now();
            const now = new Date();
            const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).getTime();
            const start = end - 7 * 24 * 60 * 60 * 1000 // 7 days ago

            const [historyResponse, detailsResponse] = await Promise.all([
                axios.get(`${API_BASE_URL}/assets/${crypto}/history?interval=d1&start=${start}&end=${end}`),
                axios.get(`${API_BASE_URL}/assets/${crypto}`),
            ]);
            // const response = await axios.get(`${API_BASE_URL}/assets/${crypto}/history?interval=d1&start=${start}&end=${end}`)
            // return response.data.data;

            const volume = detailsResponse.data.data.volumeUsd24Hr || 0;

            const historicalData  = historyResponse.data.data.map((item) => ({
                date: item.time ? new Date(item.time).toLocaleDateString() : "N/A",
                priceUsd: parseFloat(item.priceUsd),
                volume,
            }));

            // historicalData.forEach((item) => {
            //     item.volumeUsd24Hr = volumeUsd24Hr;
            // });

            return historicalData;
            // console.log(`historicalData is ${historicalData}`)
        } catch (error) {
            console.error('Error fetching historical data:', error.message);
            return rejectWithValue(error.response?.data?.error || error.message);
        }   


    }
);

export const fetchOverviewData = createAsyncThunk(
    'crypto/fetchOverviewData',
    async (crypto) => {
        const response = await axios.get(`${API_BASE_URL}/assets/${crypto}`);
        return response.data.data;
    }
)

const  cryptoSlice = createSlice({
    name: 'crypto',
    initialState: {
        selectedCrypto: "bitcoin",
        currentPrice: 0,
        priceChange: 0,
        historicalData: [],
        overviewData: null,
        lastUpdated: null,
        error: null,
    },
    reducers: {
        setSelectedCrypto(state, action) {
            state.selectedCrypto = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCurrentPrice.fulfilled, (state, action) => {
            state.currentPrice = Number.parseFloat(action.payload.priceUsd)
            state.priceChange = Number.parseFloat(action.payload.changePercent24Hr)
            state.lastUpdated = new Date().toISOString()
          })
          .addCase(fetchHistoricalData.pending, (state) => {
            state.error = null;
          })
          .addCase(fetchHistoricalData.fulfilled, (state, action) => {
            // state.historicalData = action.payload.map((item) => ({
            //   date: item.date,
            //   price: Number.parseFloat(item.priceUsd),
            //   volume: Number.parseFloat(item.volumeUsd24Hr ? parseFloat(item.volumeUsd24Hr) : 0),
            // }))
            state.historicalData = action.payload;
            state.error = null;
          })
          .addCase(fetchHistoricalData.rejected, (state, action) => {
            state.error = action.payload || 'Failed to fetch historical data';
          })
          .addCase(fetchOverviewData.fulfilled, (state, action) => {
            state.overviewData = {
              marketCap: Number.parseFloat(action.payload.marketCapUsd),
              totalSupply: Number.parseFloat(action.payload.supply),
              circulatingSupply: action.payload.circulatingSupply ? Number.parseFloat(action.payload.circulatingSupply) : "N/A",
              allTimeHigh: action.payload.maxSupply ? Number.parseFloat(action.payload.maxSupply) : "N/A",
              rank: Number.parseInt(action.payload.rank),
              description: `${action.payload.name} (${action.payload.symbol}) is a cryptocurrency with a current price of $${Number.parseFloat(action.payload.priceUsd).toFixed(2)}.`,
            }
          })
    },
})

export const {setSelectedCrypto} = cryptoSlice.actions;
export default cryptoSlice.reducer;