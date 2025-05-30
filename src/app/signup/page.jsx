'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReCAPTCHA from "react-google-recaptcha";

const Page = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        country: '',
        password: '',
        confirmPassword: '',
        termsChecked: false,
    });

    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!formData.firstName) {
            formErrors.firstName = 'First name is required';
            isValid = false;
        }
        if (!formData.email) {
            formErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Please enter a valid email address';
            isValid = false;
        }
        if (!formData.country) {
            formErrors.country = 'Country/Region is required';
            isValid = false;
        }

        if (!formData.password) {
            formErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!formData.confirmPassword) {
            formErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        if (!formData.termsChecked) {
            formErrors.termsChecked = 'You must agree to the Terms and Conditions';
            isValid = false;
        }
        if (!recaptchaValue) {
            formErrors.recaptcha = 'Please verify you are not a robot';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {

            console.log('Form Submitted', formData);
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
    }

    return (
        <div className='bg-gray-100'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-12">
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-12 flex flex-col gap-4 lg:flex-row max-w-5xl w-full">
                    <div className="hidden md:flex lg:w-1/2">
                        <Image alt="A beautiful two-story house with a well-maintained lawn and a driveway" className="rounded-lg h-full" height={350} width={460} src="/img/Signup/signup.png" />
                    </div>
                    <div className="lg:w-1/2 mt-6 md:mt-0 md:ml-6">
                        <h2 className="font-roboto text-black font-semibold text-4xl leading-[46.88px] mb-6">
                            Sign Up
                        </h2>
                        <form onSubmit={handleSubmit} >
                            <div className="mb-4">
                                <label className="font-roboto text-black font-medium text-[16px] leading-[18.75px]" htmlFor="first-name">
                                    First Name
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`appearance-none border-t-0 border-x-0 border-b border-3 border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.firstName ? 'border-red-500 placeholder:text-red-500' : ''}`}
                                    id="first-name"
                                    name="firstName"
                                    placeholder="First Name..."
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="font-roboto text-black font-medium text-[16px] leading-[18.75px]" htmlFor="email">
                                    Email
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`appearance-none border-t-0 border-x-0 border-b border-3 border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.email ? 'border-red-500 placeholder:text-red-500' : ''}`}
                                    id="email"
                                    name="email"
                                    placeholder="Email address..."
                                    type="text"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="font-roboto text-black font-medium text-[16px] leading-[18.75px]" htmlFor="country">
                                    Country/Region
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className={`bg-white border-t-0 border-x-0 border-b border-3 border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.country ? 'border-red-500' : ''}`}
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                >
                                    <option>Select country</option>
                                    {/* Add more countries here */}
                                </select>
                                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="font-roboto text-black font-medium text-[16px] leading-[18.75px]" htmlFor="password">
                                    Password
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`appearance-none border-t-0 border-x-0 border-b border-3 border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.password ? 'border-red-500 placeholder:text-red-500' : ''}`}
                                    id="password"
                                    name="password"
                                    placeholder="********"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="font-roboto text-black font-medium text-[16px] leading-[18.75px]" htmlFor="confirm-password">
                                    Confirm Password
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className={`appearance-none border-t-0 border-x-0 border-b border-3 border-gray-500 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.confirmPassword ? 'border-red-500 placeholder:text-red-500' : ''}`}
                                    id="confirm-password"
                                    name="confirmPassword"
                                    placeholder="********"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                            </div>

                            <div className="my-6">
                                <label className="flex items-center gap-2">
                                    <input
                                        className={`form-checkbox h-[20px] w-[20px] ${errors.termsChecked ? 'border-red-500' : ''}`}
                                        type="checkbox"
                                        name="termsChecked"
                                        checked={formData.termsChecked}
                                        onChange={handleChange}
                                    />
                                    <span className="font-roboto text-black font-normal text-[14px] leading-[16.41px] flex gap-1 mt-0.5">
                                        By signing up, you agree to Real State
                                        <a className="text-[#0073E1] font-medium hover:underline" href="#">
                                            Terms and Conditions
                                        </a>
                                    </span>
                                </label>
                                {errors.termsChecked && <p className="text-red-500 text-sm mt-1">{errors.termsChecked}</p>}
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

                            <div className="flex items-center justify-center my-4">
                                <button className="font-roboto rounded-[10px] font-semibold text-white px-6 py-2.5 text-[20px] leading-[25.78px] bg-[#0073E1] hover:bg-blue-500" type="submit">
                                    Sign up
                                </button>
                            </div>

                            <div className="">
                                <p className="font-roboto text-black font-normal text-[16px] leading-[18.75px] flex justify-center gap-1">
                                    Already a Member?
                                    <Link href="/signin" className="text-[#0073E1] font-medium hover:underline">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
