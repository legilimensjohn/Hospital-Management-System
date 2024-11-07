import { useState } from 'react'
  import './App.css'
import Home from './Pages/Home'
 import SignupPage from './Pages/SignupPage'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import { AllRoutes } from './Routes/AllRoutes'
 
  
function App() {
 
  return (
    <div>
      {/* <Login/> */}
     {/* <Checkout/> */}
      <Navbar/>
      <AllRoutes/>
    </div>
  )
}

export default App
