import React from 'react'
import { useNavigate } from 'react-router'

function Admin({setIsLoggedIn}) {
    const navigate=useNavigate()
  return (
    <div className="bg-theme h-screen flex items-center justify-center fixed top-0 right-0 w-screen z-50">
    <div className="bg-white p-8 rounded-2xl shadow-md w-full lg:w-[500px] ">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">Username</label>
                <input type="text" id="username" name="username" className="form-input mt-1 block w-full" placeholder="Enter your username" />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input type="password" id="password" name="password" className="form-input mt-1 block w-full" placeholder="Enter your password" />
            </div>
            <div className="flex items-center justify-between w-full">
                <button 
                onClick={()=>{
                    setIsLoggedIn(true)
                    localStorage.setItem('isLoggedIn',true)
                    navigate('/Dashboard')
                }}
                type="submit" className="bg-theme text-white py-2 w-full  px-4 rounded ">Login</button>
            </div>
        </form>
    </div>
</div>
  )
}

export default Admin