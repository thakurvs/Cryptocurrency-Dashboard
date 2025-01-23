import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import Dashboard from './pages/Dashboard.jsx'
import History from './pages/History.jsx'
import Overview from './pages/Overview.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history" element={<History />} />
      <Route path="/overview" element={<Overview />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
