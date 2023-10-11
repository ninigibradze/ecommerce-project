import React, { useEffect, useState } from 'react'
import logo from './../../assets/amazonLogoDark.svg'
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getReduxCartItems } from '../../redux/userSlice';


const countryOptions = [
  { value: 'UnitedStates', label: 'United States'},
  { value: 'Switzerland', label: 'Switzerland' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Denmark', label: 'Denmark' },
];

const Checkout = () => {

  const {data} = useSelector(state => state.user.cartItems)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [selectedOption, setSelectedOption] = useState(null);
  const [successMessage, setSuccessMessage] = useState({
    addres: false,
    card: false,
  });
  const [formState, setFormState] = useState({
    userName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    country: '',
    cardNumber: '',
    code: '',
    expDate: '',
    errUserName: '',
    errPhone: '',
    errAddress: '',
    errCity: '',
    errState: '',
    errZip: '',
    errCardName: '',
    errCountry: '',
    errCardNumber: '',
    errCode: '',
    errExpDate: '',
});

    useEffect(() => {
      dispatch(getReduxCartItems());
    }, [])


  const handleChangeCountry = (selectedOption) => {
    setSelectedOption(selectedOption);
    setFormState((prevState) => ({
      ...prevState,
      country: selectedOption, 
      errCountry: '',
    }));
  }  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
        ...prevState,
        [name]: value,
        [`err${name.charAt(0).toUpperCase() + name.slice(1)}`]: '',
    }));
}

const handleCheckInput = (e) => {
  e.preventDefault()
  
  const {userName, phone, address, city, state, zip, cardName, country ,cardNumber, code, expDate} = formState;

  if (!userName) {
    setFormState((prevState) => ({
        ...prevState,
        errUserName: 'Enter your name'
    }));
  }

  if (!phone) {
    setFormState((prevState) => ({
        ...prevState,
        errPhone: 'Enter your phone number'
    }));
  }

  if (!address) {
    setFormState((prevState) => ({
        ...prevState,
        errAddress: 'Enter your address'
    }));
  }

  if (!city) {
    setFormState((prevState) => ({
        ...prevState,
        errCity: 'Enter your city'
    }));
  }

  if (!state) {
    setFormState((prevState) => ({
        ...prevState,
        errState: 'Enter the state'
    }));
  }

  if (!zip) {
    setFormState((prevState) => ({
        ...prevState,
        errZip: 'Enter your zip code'
    }));
  }

  if (!cardName) {
    setFormState((prevState) => ({
        ...prevState,
        errCardName: 'Enter your card name'
    }));
  }

  if (!cardNumber) {
    setFormState((prevState) => ({
        ...prevState,
        errCardNumber: 'Enter your card number'
    }));
  }

  if (!code) {
    setFormState((prevState) => ({
        ...prevState,
        errCode: 'Enter card code'
    }));
  }  

  if (!expDate) {
    setFormState((prevState) => ({
        ...prevState,
        errExpDate: 'Enter card exp.date'
    }));
  }

  if(userName && phone && address && city && state && zip && cardNumber 
    && code && expDate) {
    setSuccessMessage(prev => ({...prev, address:true}))
    alert('Your purchase was successful');
    navigate('/ecommerce-project');
  }
}

const totalprice= Object.values(data).reduce((accumulator, product) => {
  return accumulator + product.price;
}, 0);

  
  return (
    <form className='w-full h-auto flex flex-col justify-start items-center pb-10'>
      <div className='flex justify-evenly items-center w-[100%] md:w-[80%] h-[100px] 
      bg-gradient-to-t from-blue-200 to-transparent rounded-sm my-5'> 
        <Link to='/ecommerce-project'>
          <img src={logo} alt='amazonLogo' className='w-[150px]' />
        </Link>        
        <div className='lg:flex gap-4'>
          <p className='text-2xl font-rubikFont font-semibold'>Checkout ({Object.values(data).length} item)</p>
          <p className='text-2xl font-rubikFont font-semibold'>${totalprice.toFixed(2)}</p>
        </div>
      </div>

      <div className='flex w-[80%] lg:w-[45%] flex-col gap-2 rounded-sm'>
        <p className='font-bold text-md'>1 Choose a shipping address</p>
        <div className='border border-gray-500 p-5 flex flex-col gap-2 rounded-md'>
          <p className='font-bold text-lg'>Your addresses</p>
          <p className='h-[1px] w-[80%] bg-gray-600'></p>

          {/* country */}
          <div>
            <p className='text-sm font-bold'>Country/Region</p>
            <Select
              value={selectedOption}
              onChange={handleChangeCountry}
              options={countryOptions}
              placeholder="Select a country"
            />    
            {
              formState.errCountry && (
                <p className='text-red-600 text-xs font-semibold
                  tracking-wide flex items-center gap-2 -mt-1.5'>
                  <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errCountry}
                </p>
                )
                } 
          </div>

          {/* user name */}
          <div>
            <p className='font-bold text-sm'>Full name(First and Last name)</p>
            <input
            name='userName'
            value={formState.userName}
            onChange={handleInputChange}     
            type='text' 
            className='w-[100%] md:w-[70%] py-1 border border-zinc-400
                px-2 text-base rounded-sm outline-none focus-within:border-gray-400
                focus-within:shadow-md duration-100	' />
                {
                  formState.errUserName && (
                    <p className='text-red-600 text-xs font-semibold
                    tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errUserName}
                    </p>
                )
                }
          </div>

          {/* phone num */}
          <div>
            <p className='font-bold text-sm'>Phone number</p>
            <input 
            name='phone'
            value={formState.phone}
            onChange={handleInputChange}    
            type='text' 
            className='w-[100%] md:w-[70%] py-1 border border-zinc-400
                px-2 text-base rounded-sm outline-none focus-within:border-gray-400
                focus-within:shadow-md duration-100' />
                {
                  formState.errPhone && (
                    <p className='text-red-600 text-xs font-semibold
                    tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errPhone}
                    </p>
                )
                }
            <p className='text-xs'>May be used to assist delivery</p>
          </div>

          {/* address */}
          <div>
            <p className='font-bold text-sm'>Address</p>
            <input 
            name='address'
            value={formState.address}
            onChange={handleInputChange}    
            type='text' 
            className='w-[100%] md:w-[70%] py-1 border border-zinc-400
                px-2 text-base rounded-sm outline-none focus-within:border-gray-400
                focus-within:shadow-md duration-100'
                placeholder='Streed address pr P.O. Box' />
                {
                  formState.errAddress && (
                    <p className='text-red-600 text-xs font-semibold
                    tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errAddress}
                    </p>
                )
                }
           <input type='text' className='w-[100%] md:w-[70%] py-1 border border-zinc-400
                px-2 text-base rounded-sm outline-none focus-within:border-gray-400
                focus-within:shadow-md duration-100 mt-1'
                placeholder='Apt suite, unit, building, floor, etc. (optional)' />
          </div>

          {/* city */}
          <div className='flex flex-row justify-between flex-wrap'>
            <div className='w-[100%] md:w-[40%]'>
              <p className='font-bold text-sm'>City</p>
              <input 
              name='city'
              value={formState.city}
              onChange={handleInputChange}    
              type='text' 
              className='py-1 border border-zinc-400
                  px-2 text-base rounded-sm outline-none focus-within:border-gray-400
                  focus-within:shadow-md duration-100 w-full' />
                  {
                  formState.errCity && (
                    <p className='text-red-600 text-xs font-semibold
                    tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errCity}
                    </p>
                )
                }
           </div>
           <div className='w-[50%] md:w-[30%]'>
              <p className='font-bold text-sm'>State</p>
              <input 
              name='state'
              value={formState.state}
              onChange={handleInputChange}    
              type='text' 
              className='py-1 border border-zinc-400
                  px-2 text-base rounded-sm outline-none focus-within:border-gray-400
                  focus-within:shadow-md duration-100 w-full' />
                  {
                  formState.errState && (
                    <p className='text-red-600 text-xs font-semibold
                    tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errState}
                    </p>
                )
                }
           </div>
           <div className='w-[40%] md:w-[20%]'>
              <p className='font-bold text-sm'>Zip</p>
              <input 
              name='zip'
              value={formState.zip}
              onChange={handleInputChange}    
              type='text' 
              className='py-1 border border-zinc-400
                  px-2 text-base rounded-sm outline-none focus-within:border-gray-400
                  focus-within:shadow-md duration-100 w-full' />
                  {
                  formState.errZip && (
                    <p className='text-red-600 text-xs font-semibold
                    tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errZip}
                    </p>
                )
                }
           </div>
          </div>

          <button className='w-[80%] md:w-[30%] py-1.5 text-sm rounded-sm bg-gradient-to-t 
          from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-t border 
          border-zinc-400 active:border-yellow-800'
          onClick={handleCheckInput}>
            Use this address
          </button>
          {
            successMessage.addres && (
              <p className='text-green-800 text-md font-semibold'>Succesfully saved</p>
          )
          }
        </div>

        {/* section two. payment method */}
        <p className='font-bold text-md'>2 Payment method</p>
        <div className='border border-gray-500 p-5 flex flex-col gap-2 rounded-md'>
          <p className='font-bold text-lg'>Credit or Debit card</p>
          <p className='h-[0.5px] w-[80%] bg-gray-600'></p>

          {/* card name */}
          <div>
            <p className='font-bold text-sm'>Name on card</p>
            <input 
            name='cardName'
            value={formState.cardName}
            onChange={handleInputChange}    
            type='text' 
            className='w-[70%] py-1 border border-zinc-400
              px-2 text-base rounded-sm outline-none focus-within:border-gray-400
              focus-within:shadow-md duration-100	'
              placeholder='Ex: John Mccann' />
              {
                  formState.errCardName && (
                    <p className='text-red-600 text-xs font-semibold
                    tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errCardName}
                    </p>
                )
                }
          </div>

          {/* card number */}
          <div>
            <p className='font-bold text-sm'>Card Number</p>
              <input 
              type='number'
              name='cardNumber'
              value={formState.cardNumber}
              onChange={handleInputChange}
              className='w-[45%] py-1 border border-zinc-400
              px-2 text-base rounded-sm outline-none focus-within:border-gray-400
              focus-within:shadow-md duration-100 noArrowInput	'
              placeholder='Enter card number'    />
              {
                  formState.errCardNumber && (
                    <p className='text-red-600 text-xs font-semibold
                    tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errCardNumber}
                    </p>
                )
                }
          </div>

          {/* exp. date & code */}
          <div className='flex flex-col xl:flex-row justify-start flex-wrap w-[80%]'>
            <div className='w-[70%] xl:w-[50%]'>
              <p className='font-bold text-sm'>Exp. date</p>              
                <input 
                name='code'
                value={formState.code}
                onChange={handleInputChange}
                className='w-[30%] py-1 border border-zinc-400
                px-2 text-base rounded-sm outline-none focus-within:border-gray-400
                focus-within:shadow-md duration-100 noArrowInput' />   
                {
                  formState.errExpDate && (
                    <p className='text-red-600 text-xs font-semibold
                    tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errExpDate}
                    </p>
                )
                }               
           </div>

           <div className='w-[70%] xl:w-[50%]'>
              <p className='font-bold text-sm'>Security code(CVC/CVV)</p>              
                <input 
                name='expDate'
                value={formState.expDate}
                onChange={handleInputChange}  className='w-[30%] py-1 border border-zinc-400
                px-2 text-base rounded-sm outline-none focus-within:border-gray-400
                focus-within:shadow-md duration-100 noArrowInput' />   
                {
                  formState.errCode && (
                    <p className='text-red-600 text-xs font-semibold
                    tracking-wide flex items-center gap-2 -mt-1.5'>
                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errCode}
                    </p>
                )
                }      
           </div>
          </div>

          <button className='w-[30%] py-1.5 text-sm rounded-sm bg-gradient-to-t 
          from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-t border 
          border-zinc-400 active:border-yellow-800'
          onClick={handleCheckInput}>          
            Proceed
          </button>
        </div>        

      </div>      
    </form>
  )
}

export default Checkout