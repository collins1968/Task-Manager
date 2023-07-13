import './App.css'
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'

function App() {
  return (
    <div >
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
