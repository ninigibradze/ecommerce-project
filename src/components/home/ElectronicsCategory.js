import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ElectronicsCategory = ({data}) => {
    const push = useNavigate();
   
    const [bigImage, setBigImage] = useState(data[0] || {});

    const handleChangeBigImage = (index) => {
        setBigImage(data[index]);
    }

    const handleNavigateProduct = (id) => {
        push(`/ecommerce-project/product/${id}`);
    }

  return (
    <div className='flex flex-col flex-wrap justify-between items-center w-[90%] lg:w-[350px] h-auto gap-4 bg-white z-5 relative p-4
    border-gray-200 border-[1px] hover:border-transparent shadow-xl'>
        <div className='h-full flex flex-col justify-between items-center'>
            <p className='font-bold text-[21px] w-full flex justify-start'>Best sellers in Laptop Computers</p>
            <div className='flex flex-col justify-evenly items-center h-[90%]'>
                <img src={bigImage.image || data[0]?.image} alt='Laptopmages'
                className='w-[180px] h-[180px] cursor-pointer' onClick={() => handleNavigateProduct(bigImage.id || data[0]?.id)} />
                <p className='text-sm px-4'>{bigImage?.description?.substring(0,100) || data[0]?.description?.substring(0,100)}...</p>
                <div className='flex flex-row gap-2'>
                    {data?.slice(0, 4).map((item, index) => (
                        <img key={index} src={item.image} alt='LeptopImage' className='x-[60px] h-[60px] cursor-pointer' 
                        onClick={() => handleChangeBigImage(index)}/>
                    ))}     
                </div>   
            </div>           
        </div>
    </div>
  )
}

export default ElectronicsCategory