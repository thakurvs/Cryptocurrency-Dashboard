import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <main className="w-full min-h-screen flex-grow container mx-auto px-4 py-4">
          <Outlet />
        </main>
      <Footer />
    </div>
  )
}

export default App
