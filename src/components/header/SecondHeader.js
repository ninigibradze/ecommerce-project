import React, { useEffect, useRef, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {motion} from 'framer-motion'
import SideNav from './SideNav';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import getCategories from '../../services/getCategories';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LiveSearch } from './LiveSearch';


const sideItemsOne = [
    {id: 1, title: 'Best Sellers', category: 'trending'},
    {id: 2, title: 'New Releases', category: 'trending'},
    {id: 3, title: 'Movers & Shakers', category: 'trending'},
];

const sideItemsTwo = [
    {id: 1, title: 'Prime Video', category: 'digital-content'},
    {id: 2, title: 'Amazon Music', category: 'digital-content'},
    {id: 3, title: 'Echo & Alexa', category: 'digital-content'},
    {id: 4, title: 'Fien Tablets', category: 'digital-content'},
    {id: 5, title: 'Fire TV', category: 'digital-content'},
    {id: 6, title: 'Kindle E-readers & Books', category: 'digital-content'},
    {id: 7, title: 'Audible Books & Originals', category: 'digital-content'},
    {id: 8, title: 'Amazon Photos', category: 'digital-content'},
    {id: 9, title: 'Amazon Appstore', category: 'digital-content'},
];

const sideItemsThree = [
    {id: 1, title: 'Clothing, Shoes, Jewelery & Watches', category: 'Shop-by-department'},
    {id: 2, title: 'Amazon Fresh', category: 'Shop-by-department'},
    {id: 3, title: 'Books', category: 'Shop-by-department'},
    {id: 4, title: 'Movies, Music & Games', category: 'Shop-by-department'},
];

const sideItemsFour = [
    {id: 1, title: 'Clothing, Shoes, Jewelery & Watches', category: 'Shop-by-department'},
    {id: 2, title: 'Amazon Fresh', category: 'Shop-by-department'},
    {id: 3, title: 'Books', category: 'Shop-by-department'},
    {id: 4, title: 'Movies, Music & Games', category: 'Shop-by-department'},
];

// const sideItemsFive = [
//     {id: 1, title: 'Your Account', category: 'help'},
//     {id: 1, title: 'English', category: 'help'},
//     {id: 1, title: 'United States', category: 'help'},
//     {id: 1, title: 'Sign Out', category: 'help'},
// ]

const SecondHeader = () => {
    const ref = useRef();
    const [showSideNav, setShowSideNav] = useState(false);
    const [categories, setCategories] = useState([])

    const push = useNavigate();
    const user = useSelector((state) => state.user);

    
    useEffect(() => {
        document.body.addEventListener('click', (e) => {
            if(e.target.contains(ref.current)) {
                setShowSideNav(false);
            }
        })
    }, [ref, showSideNav])

    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res)
        })
    }, [])

    const handleChangeCategory = (id) => {
        push(`/ecommerce-project/category/${id}`)
    }


  return (
    <div className='w-full h-[40px] bg-amazon_light px-4 text-white flex items-center '>
        <ul className='flex'>
        <li className='header-hover-effect py-[5px] flex items-center gap-1'
        onClick={() => setShowSideNav(!showSideNav)}>
            <MenuIcon />
            All
        </li>
        {
            categories.map((item)=> (
                <li key={item.id} className='header-hover-effect py-[5px] hidden xl:inline-flex text-xs xl:text-sm'
                onClick={() => handleChangeCategory(item.id)}>
                    {item.name}
                </li>                
            ))
        }
        </ul>

        {showSideNav && ( 
            <div className='top-layer-div w-full text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 h-screen z-7'>
                <div className='relative w-full h-full z-7'>
                    <motion.div ref={ref} initial={{x:-500, opacity: 0}} 
                    animate={{x:0, opacity:1}} 
                    transition={{duration: .4}}
                    className='bg-white border-x-black border-[1px] h-full w-[80%] md:w-[350px] z-7'>
                        <div className='w-full text-white bg-amazon_light py-2 px-6 flex items-center gap-5'>
                            <AccountCircleIcon /> 
                            <p className='font-bold text-xl font-titleFont tracking-wide'>Hello {user.isLoggedIn ? ` , ${user.unique_name}` : ''}</p>
                        </div>

                        {/* live search for screens smaller than md */}     
                        <LiveSearch closeNav={setShowSideNav} />                        

                        <div className='h-full overflow-scroll pb-9'>

                            {/* categori search from server - small screens */}
                            <div className='lgl:hidden py-3 border-b-[2px] border-b-gray-300 z-10'>
                                <h3 className='text-lg font-semibold font-titleFont mb-1 px-6'>Recommended for you</h3>
                                    <ul className='text-sm'>
                                    {
                                        categories.map((item)=> (
                                            <li key={item.id} 
                                            className='flex items-center justify-between px-6 py-2 cursor-pointer hover:bg-zinc-100'
                                            onClick={() => {
                                                handleChangeCategory(item.id)
                                                setShowSideNav(false)
                                                }}>
                                                {item.name} <span><KeyboardArrowRightIcon /></span>
                                            </li>                
                                        ))
                                    }
                                    </ul>
                            </div>

                            <SideNav title='Trending' sideItems={sideItemsOne} />
                            <SideNav title='Digital Content & Devices' sideItems={sideItemsTwo}/>
                            <SideNav  title='Shop By Department' sideItems={sideItemsThree}/>
                            <SideNav  title='Programs & Features' sideItems={sideItemsFour}/>
                            <div className='py-3 border-b-[2px] border-b-gray-300'>
                                <h3 className='text-lg font-semibold font-titleFont mb-1 px-6'>Help & Settings</h3>
                                <ul className='text-sm'>
                                    <li className='flex items-center px-6 py-2 cursor-pointer hover:bg-zinc-100'>
                                        Your Account
                                    </li>
                                    <li className='flex items-center justify-between px-6 py-2 cursor-pointer hover:bg-zinc-100'>
                                        <p className='flex gap-2'><LanguageIcon fontSize='medium'/>English</p>
                                    </li>
                                    <li className='flex items-center justify-between px-6 py-2 cursor-pointer hover:bg-zinc-100'>
                                        <div className='flex gap-2'>
                                            <img
                                            alt="United States"
                                            src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
                                            className='w-[20px]' />
                                            United States 
                                        </div>
                                    </li>
                                    <li className='flex items-center justify-between px-6 py-2 cursor-pointer hover:bg-zinc-100'>
                                        Sign Out
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <span className='absolute top-0 left-[82%] md:left-[360px] h-15 w-15 cursor-pointer flex
                        items-center justify-center text-white bg-gray-600 bg-opacity-50'
                        onClick={() => setShowSideNav(false)}>
                            <CloseIcon fontSize='large' />
                        </span>
                    </motion.div>
                    
                </div>
            </div>
        )}
    </div>
  );
}

export default SecondHeader