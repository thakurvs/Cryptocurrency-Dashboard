# Real-Time Cryptocurrency Dashboard

The Real-Time Cryptocurrency Dashboard is a responsive web application built with React, Redux, and Tailwind CSS. It allows users to view real-time and historical data of cryptocurrencies, including their price, market cap, total supply, and more. The dashboard also provides interactive features like filtering, searching, and seamless navigation between multiple pages (Dashboard, Overview, and History).

This project integrates the CoinCap API to fetch data for selected cryptocurrencies and visualize it using charts and tables. The app's goal is to provide an intuitive and interactive experience for crypto enthusiasts and developers to explore cryptocurrency data.

## Features

Dashboard Page
- Real-time price and 24-hour percentage change for selected cryptocurrencies.
- Line chart to display 7-day historical price trends.
- Dropdown to search and select any cryptocurrency dynamically.

Overview Page
- Displays key metrics like:
- Market Cap
- Total Supply
- Circulating Supply
- All-Time High Price
- Cryptocurrency Rank
- A detailed description of the cryptocurrency.

History Page
- Displays a table of historical data (price, date, and 24-hour volume).
- Search functionality to filter data by date.

## Project Structure
real-time-crypto-dashboard/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │
│   ├── pages/ 
│   │   ├── Dashboard.jsx
│   │   ├── Overview.jsx
│   │   ├── History.jsx
│   ├── store/
│   │   ├── cryptoSlice.js
│   ├── styles/
│   │   ├── tailwind.css
│   ├── App.jsx
│   ├── main.jsx
├── public/
├── README.md
├── package.json
├── tailwind.config.js

## Technologies Used

- Frontend: React.js, Tailwind CSS, Redux Toolkit, Chart.js
- Backend: CoinCap API (https://api.coincap.io/v2)
- Routing: React Router
- State Management: Redux Toolkit
- Data Visualization: Chart.js
- 
## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or later)
- vite 
- npm or yarn package manager

## Setup

### 1. Clone the Repository:

Clone the repository to your local machine:
- git clone <repository-url>           # repository-url is :- https://github.com/thakurvs/Cryptocurrency-Dashboard.git 
- cd <repository-folder>               # in this case repo name is :- Cryptocurrency-Dashboard
- cd <project-name>                    # in this case project name is :- crypto-dashboard

### 2. Install dependencies:
npm install
# or
yarn install

### 3. install vite
Note:- run below command in case you don't have vite installed on your system as this project is created using vite.
npm install vite
# or
npm install -D vite

### 4. Start the development server:
npm run dev
# or
yarn dev

### 5. Open the application:
The application will be available at http://localhost:5173 in your browser.
