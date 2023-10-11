import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const SideNav = ({title, sideItems}) => {

  return (
    <div className='py-3 border-b-[2px] border-b-gray-300 z-10'>
        <h3 className='text-lg font-semibold font-titleFont mb-1 px-6'>{title}</h3>
            <ul className='text-sm'>
                {                   
                    sideItems.map(item => (
                        <li key={item.id} className='flex items-center justify-between px-6 py-2 cursor-pointer hover:bg-zinc-100'>
                          {item.title}<span><KeyboardArrowRightIcon /></span>
                        </li>
                    ))
                }
            </ul>
    </div>
  )
}

export default SideNav