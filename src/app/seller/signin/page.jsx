'use client'

import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BaseApi from '@/app/(api)/BaseAPI';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Eye, EyeOff } from 'lucide-react';
import Cookies from 'js-cookie';

const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        recaptcha: '',
    });

    useEffect(() => {
        const storedEmail = localStorage.getItem('seller_email');
        const storedPassword = localStorage.getItem('seller_password');
        const storedRememberMe = localStorage.getItem('seller_rememberMe') === 'true';

        if (storedEmail && storedPassword && storedRememberMe) {
            setFormData({
                email: storedEmail,
                password: storedPassword,
            });
            setRememberMe(storedRememberMe);
        }
    }, []);

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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validate = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'A valid Email is required';
            isValid = false;
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }
        if (!recaptchaValue) {
            newErrors.recaptcha = 'Please verify you are not a robot';
            isValid = false;
        }

        if (Object.keys(newErrors).length === 0) {
            if (rememberMe) {
                localStorage.setItem('seller_email', formData.email);
                localStorage.setItem('seller_password', formData.password);
                localStorage.setItem('seller_rememberMe', 'true');
            } else {
                localStorage.removeItem('seller_email');
                localStorage.removeItem('seller_password');
                localStorage.setItem('seller_rememberMe', 'false');
            }
        } else {
            setErrors(newErrors);
        }
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await axios.post(`${BaseApi}/login`, {
                    email: formData.email,
                    password: formData.password,
                });
                Cookies.set('seller_token', response.data.token);
                Cookies.set('seller_name', response.data.user.name);
                Cookies.set('seller_email', response.data.user.email);
                // Show success message with SweetAlert2
                await Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have been logged in successfully!',
                    confirmButtonText: 'OK',
                });

                navigate("/seller/dashboard")
            } catch (error) {
                // Show error message with SweetAlert2
                await Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.response?.data?.message || 'Please check your credentials and try again.',
                    confirmButtonText: 'OK',
                });

                console.error('Login error:', error.response?.data || error.message);
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
        <div className="bg-gray-100 min-h-screen relative flex items-center justify-center h-auto" style={{ backgroundImage: "url('/img/Seller-Signin/signin.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute h-full inset-0 bg-black opacity-50"></div>

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-4 my-16 z-10">
                <div className='flex flex-col gap-0.5 items-center justify-center mb-6'>
                    <h2 className="text-2xl font-bold text-center text-[#0073E1] font-Montserrat">Seller Sign In</h2>
                    <div className='flex items-center justify-center w-full'>
                        <div className='w-14 border-b-2 border-[#0073E1]'></div>
                        <div className='h-2.5 w-2.5 rounded-full border-2 border-[#0073E1]'></div>
                        <div className='w-14 border-b-2 border-[#0073E1]'></div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
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
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password <span className="text-red-500">*</span></label>
                        <div className="relative">
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
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center">
                            <input
                                className="mr-2 leading-tight"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className="text-sm text-gray-700">
                                Remember me
                            </span>
                        </label>
                        <Link href="/seller/forgotpassword" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            Forgot Your Password?
                        </Link>
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
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">Sign in</button>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-700 text-sm font-semibold">Not A Member? <Link href="/seller/signup" className="text-blue-500 font-normal hover:underline ml-1">Signup</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Page;