import React, { useState } from 'react'
import amazonLogoDark from './../assets/amazonLogoDark.svg'
import { ArrowRightOutlined } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userSignIn } from '../services/user/userSignIn'
import jwt_decode from "jwt-decode";
import { handleLogin } from '../redux/userSlice'

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errEmail: '',
    errPassword: '',
  });

  const dispach = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      [`err${name.charAt(0).toUpperCase() + name.slice(1)}`]: '',
    }));
  };

  const logIn = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setFormData((prevData) => ({
        ...prevData,
        errEmail: 'Enter your email',
      }));
    }

    if (!formData.password) {
      setFormData((prevData) => ({
        ...prevData,
        errPassword: 'Enter your password',
      }));
    }

    try {
    if (formData.email && formData.password) {            
      // sign in   
      const user = await userSignIn({email: formData.email, password: formData.password})
      if(user.data.jwt) {
        localStorage.setItem("token", user.data.jwt);
        const decoded = jwt_decode(user.data.jwt);
        dispach(handleLogin(decoded))
        setFormData({
          email: '',
          password: '',
          errEmail: '',
          errPassword: '',
        });
        navigate('/ecommerce-project')
      }      
    }
    } catch(error) {
      if (error.response.status === 400) {
        alert('Wrong password, try again')
      }
    }
    
  };

  return (
    <div className='w-full'>
      <div className='w-full bg-gray-100 pb-10'>
        <form className='w-[350px] mx-auto flex flex-col items-center'>
          <Link to='/ecommerce-project'>
            <img src={amazonLogoDark} alt='amazonLogoImg' className='w-32' />
          </Link>
          <div className='w-full border border-zinc-300 p-6'>
            <h2 className='font-titleFont text-3xl font-medium mb-4'>Sign in</h2>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium'>Email</p>
                <input 
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                type='email' className='w-full lowercase py-1 border border-zinc-400
                px-2 text-base rounded-sm outline-none focus-within:border-[#e77600]
                focus-within:shadow-amazonInput duration-100' />
                {
                  formData.errEmail && (
                    <p className='text-red-600 text-xs font-semibold
                    tracking-wide flex items-center gap-2 -mt-1.5'>
                     <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formData.errEmail}
                    </p>
                  )
                }
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm font-medium'>Password</p>
                <input 
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                type='password' className='w-full lowercase py-1 border border-zinc-400
                px-2 text-base rounded-sm outline-none focus-within:border-[#e77600]
                focus-within:shadow-amazonInput duration-100' />
                {
                  formData.errPassword && (
                    <p className='text-red-600 text-xs font-semibold
                    tracking-wide flex items-center gap-2 -mt-1.5'>
                    <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formData.errPassword}
                    </p>
                  )
                }
              </div>
              <button className='w-full py-1.5 text-sm rounded-sm bg-gradient-to-t 
              from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-t border 
              border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'
              onClick={(e) => logIn(e)}>
                Continue
              </button>
              
            </div>
            <p className='text-xs text-black leading-4 mt-4'>By Continuing, you agree to Amazon's
            <span className='text-blue-600'> Conditions of Use </span>
            and<span className='text-blue-600'> Privancy Notice.</span></p>

            <p className='text-xs flex items-center -ml-2 text-gray-600 mt-4 cursor-pointer group'><ArrowRightOutlined />
            <span className='text-blue-60 group-hover:text-red-500 group-hover:underline'>Need help?</span></p>
          </div>

          <div className='w-full text-xs text-gray-600 mt-4 flex items-center'>
            <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
            <span className='w-1/3 text-center'>New to Amazon?</span>
            <span className='w-1/3 h-[1px] bg-zinc-400 inline-flex'></span>
          </div>

          <Link to='/ecommerce-project/registration' className='w-full'>
            <button className='w-full py-1 text-sm mt-4 font-normal rounded-lg 
            bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b
            border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'
            >Create your Amazon account</button>
          </Link>
        </form>
      </div>

      {/* FOOTER */}
      <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center'>
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

export default Signin 