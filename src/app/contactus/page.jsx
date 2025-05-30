'use client'
import React, { useState } from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { GiRotaryPhone } from "react-icons/gi";
import { IoIosMail } from "react-icons/io";
import { IoMdAlarm } from "react-icons/io";
import ReCAPTCHA from "react-google-recaptcha";
const Page = () => {
    // State for form data and error messages
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!formData.name) {
            formErrors.name = 'Name is required';
            isValid = false;
        }
        if (!formData.email) {
            formErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Please enter a valid email address';
            isValid = false;
        }
        if (!formData.message) {
            formErrors.message = 'Message is required';
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
            alert('Form submitted successfully');
            setFormData({ name: '', email: '', message: '' });
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
        <div className="bg-white">
            <div className="relative w-full h-[150px] bg-cover bg-center" style={{ backgroundImage: "url('/img/Contactus/contactus.png')" }}>
                <div className="top-0 left-0 w-full h-full bg-black opacity-50 "></div>
                <h1 className="w-full text-center text-2xl font-semibold text-white absolute top-14 z-10">Contact Us</h1>
            </div>
            <div className="bg-purple-50 container rounded-lg shadow-lg p-8 max-w-4xl my-8 mx-auto flex gap-4 flex-col md:flex-row">
                <div className="md:w-3/5 p-4">
                    <h2 className="text-xl font-semibold mb-4 text-black">Send Us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-black" htmlFor="name">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                className={`w-full border border-gray-300 text-black rounded-lg p-2 ${errors.name ? 'border-red-500' : ''}`}
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-black mb-1" htmlFor="email">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                className={`w-full border border-gray-300 text-black rounded-lg p-2 ${errors.email ? 'border-red-500' : ''}`}
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-black font-medium mb-1" htmlFor="message">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                className={`w-full border border-gray-300 text-black rounded-lg p-2 ${errors.message ? 'border-red-500' : ''}`}
                                id="message"
                                name="message"
                                placeholder="Message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
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
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" type="submit">
                            SUBMIT
                        </button>
                    </form>
                </div>
                <div className="hidden md:flex md:w-2/5 opacity-100 bg-cover bg-center rounded-xl md:mb-20 relative" style={{ backgroundImage: "url('/img/Contactus/contact.png')" }}>
                    <div className="relative top-0 left-0 w-full h-full bg-black opacity-50 rounded-xl"></div>
                    <div className="absolute top-20 px-6 z-10">
                        <h3 className="text-lg font-semibold mb-2 text-white">CONTACT DETAILS</h3>
                        <p className="text-sm mb-4 w-3/4 text-white">Please find below contact details and contact us today!</p>
                        <ul className="text-sm">
                            <li className="mb-3 text-white flex gap-1 items-center">
                                <IoLocationOutline />
                                150 South Park Ave, USA
                            </li>
                            <li className="mb-3 text-white flex gap-1 items-center">
                                <GiRotaryPhone />
                                +45 670 392 258
                            </li>
                            <li className="mb-3 text-white flex gap-1 items-center">
                                <IoIosMail />
                                support@website.com
                            </li>
                            <li className="text-white flex gap-1 items-center">
                                <IoMdAlarm />
                                8:00 a.m - 9:00 p.m
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
