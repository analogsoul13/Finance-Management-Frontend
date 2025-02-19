import { ToastContainer } from 'react-toastify'
import './App.css'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Auth/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
