'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import BaseApi from '@/app/(api)/BaseAPI';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
const Page = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        recaptcha: '',
    });

    useEffect(() => {
        const storedEmail = localStorage.getItem('admin_email');
        const storedPassword = localStorage.getItem('admin_password');
        const storedRememberMe = localStorage.getItem('admin_rememberMe') === 'true';

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
                localStorage.setItem('admin_email', formData.email);
                localStorage.setItem('admin_password', formData.password);
                localStorage.setItem('admin_rememberMe', 'true');
            } else {
                localStorage.removeItem('admin_email');
                localStorage.removeItem('admin_password');
                localStorage.setItem('admin_rememberMe', 'false');
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
                const response = await axios.post(`${BaseApi}/admin/login`, {
                    email: formData.email,
                    password: formData.password,
                    // recaptcha: recaptchaValue,
                });

                Cookies.set('admin_token', response.data.token);
                await Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have been logged in successfully!',
                    confirmButtonText: 'OK',
                });
                router.push('/admin/dashboard');
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
        <div className="bg-gray-100 min-h-screen w-full relative flex items-center justify-center h-auto" style={{ backgroundImage: "url('/img/Seller-Signin/signin.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute h-full inset-0 bg-black opacity-50"></div>

            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-4 my-16 z-10">
                <div className='flex flex-col gap-0.5 items-center justify-center mb-6'>
                    <h2 className="text-2xl font-bold text-center  text-[#0073E1] font-Montserrat">Admin Sign In</h2>
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
                        <input
                            className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="********"
                            value={formData.password}
                            onChange={handleChange}
                        />
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
                </form>
            </div>
        </div>
    );
}

export default Page;