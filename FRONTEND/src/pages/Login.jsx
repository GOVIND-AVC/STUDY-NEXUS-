import React, { useState } from 'react'
import {FaGoogle} from "react-icons/fa";
import {Eye,EyeOff} from "lucide-react";


const Login = () => {
  
  const [showPassword,setShowPassword]=useState(false)


  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-[900px] rounded-xl shadow-lg bg-white">
        
        {/* Left Side - Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" placeholder="Enter your email" className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-blue-500" />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-blue-500"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-10 right-3 text-gray-600">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 text-sm">Forgot password?</a>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Sign in →
          </button>

          <div className="my-4 text-center text-gray-500">Or continue with</div>

          <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100">
            <FaGoogle className="text-red-500" />
            Sign in with Google
          </button>

          <p className="mt-4 text-center text-sm">
            Don't have an account? <a href="#" className="text-blue-600 font-medium">Sign up</a>
          </p>
        </div>

        {/* Right Side - Background with Quote */}
        <div className="w-1/2 bg-blue-600 text-white flex items-center justify-center rounded-r-xl relative">
          <div className="absolute inset-0 bg-black/30 rounded-r-xl"></div>
          <div className="relative z-10 text-center px-6">
            <p className="text-xl font-semibold">"Education is not preparation for life; education is life itself."</p>
            <p className="mt-2">— John Dewey</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login