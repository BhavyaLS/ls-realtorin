'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from "react-google-recaptcha";
import BaseApi from '@/app/(api)/BaseAPI';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
import { div } from 'framer-motion/client';
import { Eye, EyeOff } from 'lucide-react';

const Sellersignup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        phoneNumber: '',
        businessName: '',
        role: '',
        password: '',
        confirmPassword: '',
        terms: false,
    });
    const [loading, setLoading] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({
        firstName: '',
        email: '',
        phoneNumber: '',
        businessName: '',
        role: '',
        password: '',
        confirmPassword: '',
        terms: '',
        recaptcha: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.firstName) {
            newErrors.firstName = 'First Name is required';
            isValid = false;
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'A valid Email is required';
            isValid = false;
        }
        if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone Number must be 10 digits';
            isValid = false;
        }
        if (!formData.businessName) {
            newErrors.businessName = 'Business Name is required';
            isValid = false;
        }
        if (!formData.role) {
            newErrors.role = 'Please select your role';
            isValid = false;
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords must match';
            isValid = false;
        }
        if (!formData.terms) {
            newErrors.terms = 'You must agree to the terms and conditions';
            isValid = false;
        }
        if (!recaptchaValue) {
            newErrors.recaptcha = 'Please verify you are not a robot';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            setLoading(true);
            try {
                const response = await axios.post(`${BaseApi}/sellerregister`, {
                    name: formData.firstName,
                    email: formData.email,
                    contact_number: formData.phoneNumber,
                    business_name: formData.businessName,
                    role: formData.role,
                    password: formData.password,
                    password_confirmation: formData.confirmPassword,
                });

                // Show success message with SweetAlert2
                await Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'You have successfully registered as a seller!',
                    confirmButtonText: 'OK',
                });

                // Handle successful registration (e.g., redirect)
                console.log('Registration successful:', response.data);
                router("/seller/signin");
            } catch (error) {
                // Show error message with SweetAlert2
                await Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.response?.data?.message || 'Please check your details and try again.',
                    confirmButtonText: 'OK',
                });

                console.error('Registration error:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
        setErrors((prevData) => ({
            ...prevData,
            recaptcha: "",
        }));
    };

    const handleRecaptchaExpired = () => {
        setRecaptchaValue(null);
        setErrors((prevData) => ({
            ...prevData,
            recaptcha: "Recaptcha has expired",
        }));
    };

    return (
        <>
            {loading ? (<div className='mih-h-screen font-semibold text-zinc-600 text-xl flex items-center justify-center'>Loading</div>) : (
                <div className="bg-gray-100 relative flex items-center justify-center h-auto" style={{ backgroundImage: "url('/img/Seller-Signin/signin.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute h-full inset-0 bg-black opacity-50"></div>

                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-4 my-16 z-10">
                        <div className='flex flex-col gap-0.5 items-center justify-center mb-6'>
                            <h2 className="text-2xl font-bold text-center text-[#0073E1] font-Montserrat">Seller Sign Up</h2>
                            <div className='flex items-center justify-center w-full'>
                                <div className='w-14 border-b-2 border-[#0073E1]'></div>
                                <div className='h-2.5 w-2.5 rounded-full border-2 border-[#0073E1]'></div>
                                <div className='w-14 border-b-2 border-[#0073E1]'></div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name">First Name <span className="text-red-500">*</span></label>
                                <input
                                    className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none ${errors.firstName ? 'border-red-500' : ''}`}
                                    id="first-name"
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name..."
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email <span className="text-red-500">*</span></label>
                                <input
                                    className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Email address..."
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone-number">Phone Number <span className="text-red-500">*</span></label>
                                <input
                                    className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none ${errors.phoneNumber ? 'border-red-500' : ''}`}
                                    id="phone-number"
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Enter number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="business-name">Business Name <span className="text-red-500">*</span></label>
                                <input
                                    className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none ${errors.businessName ? 'border-red-500' : ''}`}
                                    id="business-name"
                                    name="businessName"
                                    type="text"
                                    placeholder="Enter Business Name"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                />
                                {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">You are <span className="text-red-500">*</span></label>
                                <select
                                    className={`border-b bg-white w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none ${errors.role ? 'border-red-500' : ''}`}
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Your Role</option>
                                    <option value="Owner">Owner</option>
                                    <option value="Dealer/Broker">Dealer/Broker</option>
                                </select>
                                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                            </div>

                            <div className="relative mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password <span className="text-red-500">*</span></label>
                                <input
                                    className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 bottom-0.5 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div className="relative mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">Confirm Password <span className="text-red-500">*</span></label>
                                <input
                                    className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                    id="confirm-password"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="********"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-3 bottom-0.5 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-[20px] w-[20px] text-blue-500"
                                        name="terms"
                                        checked={formData.terms}
                                        onChange={handleChange}
                                    />
                                    <span className="ml-2 text-gray-700 text-sm">By signing up, you agree to Deal State <a href="#" className="text-blue-500">Terms and Conditions</a></span>
                                </label>
                                {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
                            </div>
                            <div>
                                <div className="" style={{ transform: 'scale(0.75)', transformOrigin: '0 0' }}>
                                    <ReCAPTCHA
                                        sitekey="6Lc4QOkqAAAAAF830ATYFMpwYj-osmPvtMmIFw_Z"
                                        onChange={handleRecaptchaChange}
                                        onExpired={handleRecaptchaExpired}
                                    />
                                </div>
                                {errors.recaptcha && <p className="text-red-500 text-sm -mt-3 mb-2">{errors.recaptcha}</p>}
                            </div>

                            <div className="mb-4">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">Sign up</button>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-700 text-sm font-semibold">Already A Member? <Link href="/seller/signin" className="text-blue-500 font-normal ml-1 hover:underline">Signin</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sellersignup;