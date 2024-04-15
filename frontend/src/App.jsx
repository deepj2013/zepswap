import React, { useEffect,  } from 'react'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router'
import Aos from 'aos'
import "aos/dist/aos.css"; 
import { IoLogoFlickr } from "react-icons/io5";



function App() {
  useEffect(() => {
    Aos.init({
      duration:0,
      delay:0, // Animation duration (in milliseconds)
      //   once: , // Whether animation should happen only once
    });
  }, []);


  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

  );
}

export default App