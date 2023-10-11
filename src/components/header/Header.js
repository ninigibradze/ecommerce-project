import React, { useEffect, useRef, useState } from 'react';
import logo from './../../assets/logo.png'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { ArrowDropDownOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import SecondHeader from './SecondHeader';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getCategories from '../../services/getCategories';
import { getRedProducts } from '../../redux/productsSlice';
import { getReduxCartItems, handleLogout } from '../../redux/userSlice';
import { Skeleton } from '@mui/material';


const Header = () => {
    const push = useNavigate();
    const dispatch = useDispatch();
    const ref = useRef();
    const prods = useSelector((state) => state.products);
    const user = useSelector((state) => state.user);
    const items = useSelector(state => state.user.cartItems.data)
    const cartAmount = Object.values(items).length;

    const [category, setCategory] = useState({
        showCategories: false,
        searchCategory: 'All',
        data: [],
        isLoading: true,
    })  
    const [language, setLanguage] = useState({
        lang: 'EN',
        visible: false,
    })
    const [showAccount, setShowAccount] = useState(false);
    const [liveSearch, setLiveSearch] = useState({
        value: '',
        data: [],
        result: [],
        isLoading: true,
    });
   

    const handleChangeSearchCat = (value) => {
        setCategory(prevstate => ({
            ...prevstate,
            showCategories: false,
            searchCategory: value,
        }))
    }

    const handleChangeLanguage = () => {
        if(language.lang === 'GEO') {
            setLanguage({lang: 'EN', visible: false});
        } else {
            setLanguage({lang: 'GEO', visible: false});
        }
    }    

    useEffect(() => {
        getCategories().then((res) => {
            setCategory({
                ...category,
                data: res,
                isLoading: false,
            })
        });
        
        dispatch(getRedProducts());
        
        if(user.isLoggedIn) {
            dispatch(getReduxCartItems());
        }        
    }, [])

    useEffect(() => {
        document.body.addEventListener('click', (e) => {
            if(e.target.contains(ref.current)) {
                setShowAccount(false);
            }
        })
    }, [ref, showAccount])

    const handleInputChange = (e) => {
        const { value } = e.target;

        const filteredResults = prods.data?.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setLiveSearch(prevData => ({
            ...prevData,
            value,
            result: filteredResults 
        }));
      };

      const handleNavigateProduct = (id) => {
        setLiveSearch({value: ''})
        push(`/ecommerce-project/product/${id}`);
    }

    const signOut = () => {
        dispatch(handleLogout())
    }

    if(prods.isLoading){
        return (
            <>
                <Skeleton variant="rectangular"
                sx={{ width: '100%', bgcolor: '#131921' }} height={60} animation="wave" />
                <Skeleton variant="rectangular"
                sx={{ width: '100%', bgcolor: '#232F3E' }} height={45} animation="wave" />
            </>
        )
    }

  return (
    <div id='top' className='w-full'>
        <div className='flex items-center gap-3 w-full bg-amazon_blue text-white px-4 py-3'>
            {/* logo */}
            <Link to='/ecommerce-project'>
                <div className='header-hover-effect'>
                    <img src={logo} className='w-24 mt-2' alt='logoimage' />
                </div> 
            </Link>

            {/* delivery */}
            <div className='header-hover-effect pb-[4px] hidden mdl:inline-flex'>
                <LocationOnOutlinedIcon />
                <p className='text-gray-200 font-light flex flex-col text-sm'>
                    Deliver to {user.isLoggedIn ? user.unique_name : ''}
                    <span className='font-semibold text-white text-sm -m-[2px]'>
                        Tbilisi 0183
                    </span>
                </p>                
            </div>

            {/* search */}
            <div className='hidden lgl:flex flex-grow rounded-md h-10 relative'>
                <span className='bg-gray-100 hover:bg-gray-300 border-2 cursor-pointer
                transition text-xs text-amazon_blue font-titleFont flex items-center
                pl-1 justify-center rounded-tl-md rounded-bl-md w-auto h-full'
                onClick={() => setCategory(prevstate => ({
                    ...prevstate, showCategories: !category.showCategories,
                }))}>{category.searchCategory}
                    <span></span>
                    <ArrowDropDownIcon />
                </span>
                {
                    category.showCategories && (
                        <div className='top-layer-div' 
                        onMouseLeave={() => setCategory(prevstate => ({...prevstate, showCategories: false,}))}>
                            <ul className='absolute top-10 left-0 overflow-scroll overflow-x-hidden
                            w-[200px] h-80 bg-white border-[1px] text-black border-amazon_blue
                            flex flex-col gap-1 z-3 '>
                                <li className='search-category-li' onClick={() => handleChangeSearchCat('All Departments')}>All Departments</li>
                                {category.data.map((item) => (
                                    <li key={item.id} className='search-category-li' onClick={() => handleChangeSearchCat(item.name)}>{item.name}</li>
                                ))}
                            </ul>
                        </div>
                    )
                }
                <input type='text' className='text-amazon_blue flex-grow border-none outline-none px-2 h-full text-base relative' 
                placeholder='Search Amazon'
                value={liveSearch.value}
                onChange={handleInputChange} />
                { 
                    liveSearch?.value?.length > 0 && 
                    (
                        <ul className='absolute top-10 bg-white z-10 pl-2 py-1 rounded-sm w-full shadow-xl'>
                            {liveSearch?.result?.map(product => (
                                <li key={product.id} className='text-black text-md font-semibold pt-1 cursor-pointer' 
                                onClick={() => handleNavigateProduct(product.id)}>
                                    {product.name.substring(0, 100)}
                                </li>
                            ))  
                            }
                        </ul>
                    )
                }
                <span className='bg-amazon_yellow flex items-center justify-center w-12 h-full text-base
                hover:bg-[#f3a847] transition text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md'>
                    <SearchIcon />
                </span>
            </div>

            {/* language */}
            <div className='w-[100px] header-hover-effect hidden lgl:flex justify-center items-center relative' 
            onMouseEnter={() => setLanguage(prevstate => ({...prevstate, visible: !language.visible}))} 
            onMouseLeave={() => setLanguage(prevstate => ({...prevstate, visible: false}))}>
                <div className='w-[20px]'>
                    {language.lang === 'EN' ? (
                        <img
                        alt="United States"
                        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                        /> 
                    ) : (
                        <img
                            alt="United States"
                            src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GE.svg"
                            className='border-[1px] border-black'
                        />
                    )}                    
                </div>
                <p className='flex ml-[1px]'>{language.lang}<span><ArrowDropDownOutlined /></span></p>     

                {
                    language.visible && (
                        <div className='top-layer-div' 
                        onMouseLeave={() => setLanguage(prevstate => ({...prevstate, visible: false}))}>
                            <ul className='absolute top-7 left-0 w-[150px] bg-white border-[1px] text-black border-amazon_blue
                            p-2 z-3'>
                                <li className='text-xs pb-1'>Change Language</li>
                                <li className='language-li' onClick={handleChangeLanguage}>
                                     <div className='w-[25px]'>
                                     {language.lang === 'GEO' ? (
                                        <img
                                        alt="United States"
                                        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                                        /> 
                                    ) : (
                                        <img
                                            alt="United States"
                                            src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GE.svg"
                                            className='border-[1px] border-black'
                                        />
                                    )}
                                    </div>
                                    <p className='flex'>{language.lang === 'EN' ? 'GEO' : 'EN'}</p>
                                </li>
                            </ul>
                        </div>
                    )
                }           
            </div>

            {/* signin */}
            <div ref={ref} className='flex flex-col justify-center items-start header-hover-effect'
            onMouseEnter={() => setShowAccount(true)} onMouseLeave={() => setShowAccount(false)}>
                <p className='text-sm mdl:text-xs text-white mdl:text-gray-200 font-light'>Hello, {user.isLoggedIn ? user.unique_name : 'sign in'}</p>
                <p className='text-sm text-white -mt-1 font-semibold hidden mdl:inline-flex'>Accounts & List<span><ArrowDropDownOutlined /></span></p>
                {
                    showAccount && (
                        <div  className='top-layer-div w-full h-full text-black fixed top-[68px] left-0 bg-amazon_blue bg-opacity-50'>
                            <div className='relative w-full h-full'>
                                <div className='relative -top-[13px] xs:left-[30%] sm:left-[25%] sml:left-[20%] md:left-[20%] 
                                mdl:left-[30%] lg:left-[28%] lgl:left-[70%] xl:left-[76%] 
                                top-layer-div w-[170px] bg-white border-[1px] text-black border-amazon_blue p-1 z-3 duration-200'
                                onMouseLeave={() => setShowAccount(false)} >
                                    <div className='flex flex-col justify-center items-center'>
                                        {
                                            user.isLoggedIn ?  
                                            <button onClick={signOut}
                                            className='px-2.5 rounded-md mt-3 font-titleFont font-sm text-base bg-gradient-to-tr from-yellow-400
                                            to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 
                                            active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200'>
                                                Sign out
                                            </button> 
                                            : 
                                             <Link to='/ecommerce-project/signin'
                                             className='px-2.5 rounded-md mt-3 font-titleFont font-sm text-base bg-gradient-to-tr from-yellow-400
                                             to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 
                                             active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200'>
                                                 Log In
                                             </Link>
                                        }
                                       
                                       {!user.isLoggedIn && (
                                            <p className='text-xs mt-3'>New Costumer?
                                                <Link to='/ecommerce-project/registration'>
                                                    <span className='text-blue-500'> Start Here</span>
                                                </Link>
                                            </p>
                                       )}  

                                       {user.isLoggedIn && (                                            
                                            <Link to='/ecommerce-project/account'>
                                                <span className='text-black text-md'>Account</span>
                                            </Link>                                            
                                       )}                                        
                                        <Link to='/ecommerce-project/about'>
                                            <span className='text-sm text-blue-500'>About</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }           
            </div>

            {/* returns */}
            <div className='flex-col justify-center items-start header-hover-effect hidden lgl:flex'>
                <p className='text-xs text-gray-200 font-light'>Returns</p>
                <p className='text-sm text-white -mt-1 font-semibold'>& Orders</p>
            </div>

            {/* cart  */}
            <Link to='/ecommerce-project/cart'>
                <div className='header-hover-effect flex justify-center items-center relative'>
                    <ShoppingCartOutlined />
                    <p className='text-gray-200 text-s font-semibold mt-3'>Cart
                        <span className='absolute top-0 left-5 flex justify-center items-center text-xs  font-semibold
                        p-1 h-4 bg-amazon_yellow text-amazon_blue rounded-full '>
                            {cartAmount}
                        </span>
                    </p>
                </div>
            </Link>

        </div>
        <SecondHeader />
    </div>
  )
}

export default Header