import React, { useState } from 'react'
import amazonLogoDark from './../assets/amazonLogoDark.svg'
import { ArrowRightOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { baseAPI } from '../services/baseApi'

export const Registration = () => {

    const [formState, setFormState] = useState({
        userName: '',
        email: '',
        password: '',
        cPassword: '',
        errUserName: '',
        errEmail: '',
        errPassword: '',
        errCPassword: ''
    });

    const [successMessage, setSuccessMessage] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
            [`err${name.charAt(0).toUpperCase() + name.slice(1)}`]: '',
        }));
    }

    const emailValidation = (email) => {
        return String(email)
            .toLocaleLowerCase()
            .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        const { userName, email, password, cPassword } = formState;

        if (!userName) {
            setFormState((prevState) => ({
                ...prevState,
                errUserName: 'Enter your name'
            }));
        }

        if (!email) {
            setFormState((prevState) => ({
                ...prevState,
                errEmail: 'Enter your email'
            }));
        } else {
            if (!emailValidation(email)) {
                setFormState((prevState) => ({
                    ...prevState,
                    errEmail: 'Enter a valid email'
                }));
            }
        }

        if (!password) {
            setFormState((prevState) => ({
                ...prevState,
                errPassword: 'Enter your password'
            }));
        } else {
            if (password.length < 6) {
                setFormState((prevState) => ({
                    ...prevState,
                    errPassword: 'Password must be at least 6 characters'
                }));
            }
        }

        if (!cPassword) {
            setFormState((prevState) => ({
                ...prevState,
                errCPassword: 'Confirm your password'
            }));
        } else {
            if (cPassword !== password) {
                setFormState((prevState) => ({
                    ...prevState,
                    errCPassword: "Password doesn't match"
                }));
            }
        }

       
        try { 
            if (userName && email && emailValidation(email) && password && password.length >= 6
            && cPassword && cPassword === password) {
                await baseAPI.post("/api/user/registerUser", {
                userName,
                password,
                email,
            });
            setSuccessMessage(true);
            setFormState({
                userName: '',
                email: '',
                password: '',
                cPassword: '',
                errUserName: '',
                errEmail: '',
                errPassword: '',
                errCPassword: ''
            })}
        } catch(err) {
            console.log(err);
        }
            
        
    }

  return (
    <div className='w-full'>
        <div className='w-full bg-gray-100 pt-6'>
            <form className='w-[370px] mx-auto flex flex-col items-center'>
                <Link to='/ecommerce-project'>
                    <img src={amazonLogoDark} alt='amazonLogoImg' className='w-32' />
                </Link>
                <div className='w-full border border-zinc-200 p-6 rounded-lg'>
                    <h2 className='font-titleFont text-3xl font-medium mb-4'>
                        Create Account
                    </h2>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-medium'>Your name</p>
                            <input 
                            name='userName'
                            value={formState.userName}
                            onChange={handleInputChange}                           
                            type='text' className='w-full py-1 border border-zinc-400
                            px-2 text-base rounded-sm outline-none focus-within:border-[#e77600]
                            focus-within:shadow-amazonInput duration-100'  />
                            {
                                formState.errUserName && (
                                    <p className='text-red-600 text-xs font-semibold
                                    tracking-wide flex items-center gap-2 -mt-1.5'>
                                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errUserName}
                                    </p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-medium'>Enter your email</p>
                            <input 
                            name='email'
                            value={formState.email}
                            onChange={handleInputChange}                            
                            type='email' className='w-full lowercase py-1 border border-zinc-400
                            px-2 text-base rounded-sm outline-none focus-within:border-[#e77600]
                            focus-within:shadow-amazonInput duration-100'  />
                            {
                                formState.errEmail && (
                                    <p className='text-red-600 text-xs font-semibold
                                    tracking-wide flex items-center gap-2 -mt-1.5'>
                                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errEmail}
                                    </p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-medium'>Password</p>
                            <input 
                            name='password'
                            value={formState.password}
                            onChange={handleInputChange}                            
                            type='password' className='w-full py-1 border border-zinc-400
                            px-2 text-base rounded-sm outline-none focus-within:border-[#e77600]
                            focus-within:shadow-amazonInput duration-100'  />
                            {
                                formState.errPassword && (
                                    <p className='text-red-600 text-xs font-semibold
                                    tracking-wide flex items-center gap-2 -mt-1.5'>
                                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errPassword}
                                    </p>
                                )
                            }
                        </div>
                        {
                            !formState.errPassword && (
                                <p className='text-xs text-gray-700 -mt-2'>Passwords must be at least 6 characters.</p>
                            )
                        }                        
                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-medium'>Re-enter password</p>
                            <input 
                            name='cPassword'
                            value={formState.cPassword}
                            onChange={handleInputChange}                            
                            type='password' className='w-full py-1 border border-zinc-400
                            px-2 text-base rounded-sm outline-none focus-within:border-[#e77600]
                            focus-within:shadow-amazonInput duration-100'  />
                            {
                                formState.errCPassword && (
                                    <p className='text-red-600 text-xs font-semibold
                                    tracking-wide flex items-center gap-2 -mt-1.5'>
                                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errCPassword}
                                    </p>
                                )
                            }
                        </div>
                        <button className='w-full py-1.5 text-sm rounded-sm bg-gradient-to-t 
                        from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-t border 
                        border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'
                        onClick={handleRegistration}> 
                            Continue
                        </button>

                        {
                            successMessage && (
                                <div className='flex gap-4'>
                                    <p className='text-green-800 text-md font-semibold'>Succesfully registered</p>
                                    <Link to='/ecommerce-project/signin'><span className='text-sm text-blue-600'>Sign in</span></Link>
                                </div>
                            )
                        }

                        <p className='text-xs text-black leading-4 mt-4'>By creating, you agree to Amazon's
                        <span className='text-blue-600'> Conditions of Use </span>
                        and<span className='text-blue-600'> Privancy Notice.</span></p>

                        <span className='w-[70%] mx-auto h-[1px] bg-zinc-300 inline-flex mt-2'></span>

                        <div>
                            <p className='text-xs'>Already have an account? 
                                <Link to='/ecommerce-project/signin'><span className='text-blue-600 hover:text-red-500 hover:underline
                                    underline-offset-1 cursor-pointer transition-100'> Sign in <ArrowRightOutlined className='-ml-2 ' /></span>
                                </Link>
                            </p>
                            <p className='text-xs'>Buying for work? <span className='text-blue-600 hover:text-red-500 hover:underline
                            underline-offset-1 cursor-pointer transition-100'>Create a free business account <ArrowRightOutlined className='-ml-2 ' /></span></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        
        {/* FOOTER */}
        <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center pb-10'>
            <div className='flex gap-10 items-center pt-10'>
            <p className='text-xs text-blue-600 hover:text-red-500 hover:underline
            underline-offset-1 cursor-pointer transition-100'>Conditions of Use</p>
            <p className='text-xs text-blue-600 hover:text-red-500 hover:underline
            underline-offset-1 cursor-pointer transition-100'>Privancy Notive</p>
            <p className='text-xs text-blue-600 hover:text-red-500 hover:underline
            underline-offset-1 cursor-pointer transition-100'>Help</p>
            </div>
            <p className='text-xs text-gray-600'>© 1996-2023, Amazon.com, Inc. or its affiliates</p>
        </div>
    </div>
  )
}
