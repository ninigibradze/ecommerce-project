import React from 'react'

const SecontFooterElement = ({title, subTitle}) => {
  return (
    <div className='w-[105px]'>
        <a className=' visited:text-white text-xs'  
        href='https://www.amazon.jobs/' target="_blank" rel="noreferrer">
            <p  className='hover:underline text-white font-semibold '>
            {title} <br />
            <span className='text-gray-400 font-light'>{subTitle}</span>
            </p>
        </a>
    </div> 
  )
}

export default SecontFooterElement