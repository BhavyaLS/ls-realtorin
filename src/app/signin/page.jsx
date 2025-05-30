'use client'

import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import ReCAPTCHA from "react-google-recaptcha";

const Page = () => {
    // State for form data (email, password)
    const [formdata, setFormdata] = useState({
        email: '',
        password: '',
    });

    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        const storedRememberMe = localStorage.getItem('rememberMe') === 'true';

        if (storedEmail && storedPassword && storedRememberMe) {
            setFormdata({
                email: storedEmail,
                password: storedPassword,
            });
            setRememberMe(storedRememberMe);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevData) => ({
            ...prevData,
            [name]: "",
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!formdata.email) {
            formErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formdata.email)) {
            formErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formdata.password) {
            formErrors.password = 'Password is required';
            isValid = false;
        } else if (formdata.password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        // Check if reCAPTCHA is validated
        if (!recaptchaValue) {
            formErrors.recaptcha = 'Please verify you are not a robot';
            isValid = false;
        }

        if (Object.keys(formErrors).length === 0) {
            // Save to localStorage if rememberMe is checked
            if (rememberMe) {
                localStorage.setItem('email', formdata.email);
                localStorage.setItem('password', formdata.password);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('password');
                localStorage.setItem('rememberMe', 'false');
            }
        } else {
            setErrors(formErrors);
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Form is valid, proceed with submission
            console.log('Form submitted');
        }
    };

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
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
    }

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-12">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col-reverse lg:flex-row max-w-4xl w-full">
                    <div className="lg:w-1/2 p-8">
                        <h2 className="font-roboto text-black font-semibold text-4xl leading-[46.88px] tracking-normal mb-6">
                            Sign In
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                                    Email
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500 placeholder:text-red-500' : ''}`}
                                    id="email"
                                    name="email"
                                    placeholder="Email address..."
                                    type="text"
                                    value={formdata.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                    Password
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500 placeholder:text-red-500' : ''}`}
                                        id="password"
                                        name="password"
                                        placeholder="************"
                                        type={showPassword ? "text" : "password"}
                                        value={formdata.password}
                                        onChange={handleChange}
                                    />
                                    {showPassword ? (
                                        <button className='absolute right-3 top-3 text-gray-500 cursor-pointer' onClick={togglePasswordVisibility}><FaEye /></button>
                                    ) : (
                                        <button className='absolute right-3 top-3 text-gray-500 cursor-pointer' onClick={togglePasswordVisibility}><FaEyeSlash /></button>
                                    )}
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
                                <Link href="/forgotpassword" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                    Forgot Your Password?
                                </Link>
                            </div>
                            <div>
                                <div className="mb-4" style={{ transform: 'scale(0.75)', transformOrigin: '0 0' }}>

                                    <ReCAPTCHA
                                        sitekey="6Lc4QOkqAAAAAF830ATYFMpwYj-osmPvtMmIFw_Z"
                                        onChange={handleRecaptchaChange}
                                        onExpired={handleRecaptchaExpired}
                                    />

                                </div>
                                {errors.recaptcha && <p className="text-red-500 text-sm -mt-7 mb-4">{errors.recaptcha}</p>}
                            </div>
                            <div className="flex justify-center mb-6">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Sign In
                                </button>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-700 flex gap-1">
                                    Don't have an account?
                                    <Link href="/signup" className="text-blue-500 hover:text-blue-800 hover:underline">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="hidden md:flex lg:w-1/2">
                        <Image alt="Sign in" className="rounded-lg object-cover h-full w-full" height={400} src="/img/Signin/signin.png" width={600} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
