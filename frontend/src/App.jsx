import React, { useEffect,  } from 'react'
import  { ComplexNavbar } from './component/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router'
import Aos from 'aos'
import "aos/dist/aos.css"; 
import { IoLogoFlickr } from "react-icons/io5";
import Swap from './pages/Swap/Swap'
import Predction from './pages/Game/Predction/Predction'
import GameLottery from './pages/Game/Lottery/GameLottery'
import Pottery from './pages/Game/Pottery/Pottery'
import Stack from './pages/Stack/Stack'
import Pool from './pages/Pool/Pool'
import NavBar2 from './component/NavBar2'
import Buy from './pages/Buy/BuyPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  useEffect(() => {
    Aos.init({
      duration:0,
      delay:0, // Animation duration (in milliseconds)
      //   once: , // Whether animation should happen only once
    });
  }, []);


  return (
   <div className='w-screen overflow-hidden'>
   <NavBar2/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Swap" element={<Swap />} />
        <Route path="/Predction" element={<Predction />} />
        <Route path="/GameLottery" element={<GameLottery />} />
        <Route path="/Pottery" element={<Pottery />} />
        <Route path="/Stack" element={<Stack />} />
        <Route path="/Pool" element={<Pool />} />
        <Route path="/Buy" element={<Buy />} />

        
        
        
      </Routes>
      <ToastContainer />

   </div>
   

  );
}

export default App