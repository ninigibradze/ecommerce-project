import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import { handleInputChange, handleLogin } from '../redux/userSlice';
import { updateUserData } from '../services/user/updateUserData';
import PasswordInput from '../components/PasswordInput';

const Account = () => {

  const {email, unique_name, nameid} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [passInput, setPassInput] = useState('');
  const [successMessage, setSuccessmessage] = useState('');

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if(name === 'password') {
      setPassInput(value)
    } else {
      dispatch(handleInputChange({ name, value })) 
    } 
  }

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if(passInput.length < 6 || passInput === "" || unique_name === "" || email === "") {   
      alert('All imput fields are required, Password minimum 6 symbols')        
    } else {
      //change redux
      const {data} = await updateUserData({userName: unique_name, id: nameid, email, newPassword: passInput});
        if(data.jwt) {
          localStorage.removeItem("token");
          localStorage.setItem("token", data.jwt);
          const decoded = jwt_decode(data.jwt);
          dispatch(handleLogin(decoded));
          setSuccessmessage('Successfully Saved')
        }           
    }
   
  }

  

  return (
    <form className='w-full'>
      <div className='w-[550px] bg-gray-100 py-10 px-4 my-5 flex flex-col gap-4 justify-center items-center mx-auto shadow-textShadow'>
        <p className='text-3xl font-bold text-black'>Your Account</p>

        {/* change name */}
        <div className='flex w-full gap-4'>
          <div className='w-[30%] flex justify-start'>
            <p className='text-md font-semibold'>Name:</p>
          </div>
          <div className='w-[60%] flex justify-start'>
            <input 
            name='unique_name'
            value={unique_name}
            type='name' 
            onChange={handleChangeInput}
            className='w-[200px] lowercase py-1 border border-zinc-400
            px-2 text-base rounded-sm outline-none focus-within:border-[#e77600]
            focus-within:shadow-amazonInput duration-100' />
          </div>          
        </div>

        {/* change email */}
        <div className='flex gap-4 w-full'>
          <div className='w-[30%] flex justify-start'>
            <p className='text-md font-semibold'>Email:</p>
          </div>
          <div className='w-[70%] flex justify-start'>
            <input 
            name='email'
            value={email}
            type='email' 
            onChange={handleChangeInput}
            className='w-[270px] lowercase py-1 border border-zinc-400
            px-2 text-base rounded-sm outline-none focus-within:border-[#e77600]
            focus-within:shadow-amazonInput duration-100' />
          </div>          
          
        </div>

        {/* change password */}
        <div className='flex gap-4 w-full'>
          <div className='w-[30%] flex justify-start'>
            <p className='text-md font-semibold'>Old/New Password:</p>
          </div>
          <div className='w-[70%] flex justify-start'>
            <PasswordInput passValue={passInput} handleChange={handleChangeInput} />
          </div>          
          
        </div>

        <p className='text-green-800 text-md font-semibold'>{successMessage}</p>

        <button 
        className="center-element w-[150px] py-1.5 rounded-md mt-3 font-titleFont font-sm text-base bg-gradient-to-tr from-yellow-400
        to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 
        active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200"
        onClick={(e) => handleSaveChanges(e)}>
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default Account