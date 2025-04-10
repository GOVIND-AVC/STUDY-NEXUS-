/* eslint-disable no-unused-vars */

import React from 'react'
import { useState,useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaBuilding, FaCalendarAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';




const Signup = () => {

  const [formData,setFormdata]=useState({
    name:'',
    userid: '',
    dob: '',
    number: '',
    email: '',
    accomodation: '',
    hostelDetails: '',
    course: '',
    year: '',
    password:''
  })

  const [showPassword,setShowPassword]=useState(false)
  const[errors,seterrors]=useState(false)

  const handleChange=(e)=>{
  const {name,value}=e.target
  setFormdata((prev)=>({
    ...prev,[name]:value
  }))
  }








  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff] px-4">
    <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-3xl">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        <span className="inline-block align-middle text-purple-700 mr-2">📘</span>
        StudyNexus
      </h1>
      <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <div className="flex items-center border rounded-lg px-3">
            <FaUser className="text-gray-400 mr-2" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="w-full py-2 outline-none" />
          </div>
        </div>

        {/* User ID */}
        <div>
          <label className="text-sm font-medium text-gray-700">User ID</label>
          <input type="text" name="userid" value={formData.userid} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
        </div>

        {/* DOB */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-700">Date of Birth</label>
          <div className="flex items-center border rounded-lg px-3">
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full py-2 outline-none" />
          </div>
        </div>

        {/* Phone */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <div className="flex items-center border rounded-lg px-3">
            <FaPhone className="text-gray-400 mr-2" />
            <input type="tel" name="number" value={formData.number} onChange={handleChange} className="w-full py-2 outline-none" />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="flex items-center border rounded-lg px-3">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full py-2 outline-none" />
          </div>
        </div>

        {/* Accommodation */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Accommodation</label>
          <div className="flex items-center space-x-4 mt-1">
            <label className="inline-flex items-center">
              <input type="radio" name="accomodation" value="Day Scholar" checked={formData.accomodation === 'Day Scholar'} onChange={handleChange} />
              <span className="ml-2">Day Scholar</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="accomodation" value="Hosteler" checked={formData.accomodation === 'Hosteler'} onChange={handleChange} />
              <span className="ml-2">Hosteler</span>
            </label>
          </div>
        </div>

        {/* Hostel (conditional) */}
        {formData.accomodation === 'Hosteler' && (
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Hostel Name</label>
            <input type="text" name="hostelDetails" value={formData.hostelDetails} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
        )}

        {/* Course */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-700">Course</label>
          <div className="flex items-center border rounded-lg px-3">
            <FaBuilding className="text-gray-400 mr-2" />
            <input type="text" name="course" value={formData.course} onChange={handleChange} className="w-full py-2 outline-none" />
          </div>
        </div>

        {/* Year */}
        <div>
          <label className="text-sm font-medium text-gray-700">Year</label>
          <select name="year" value={formData.year} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
            <option value="">Select Year</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </select>
        </div>

        {/* Password */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="flex items-center border rounded-lg px-3">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-2 outline-none"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 ml-2">
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="flex items-center border rounded-lg px-3">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full py-2 outline-none"
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="md:col-span-2 flex items-center space-x-2">
          <input type="checkbox" name="termsAgreed" checked={formData.termsAgreed} onChange={handleChange} />
          <span className="text-sm">
            I agree to the <span className="text-blue-600 underline">Terms of Service</span> and <span className="text-blue-600 underline">Privacy Policy</span>
          </span>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Create Account
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Signup