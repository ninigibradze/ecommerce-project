import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ProductsBoxContainer = ({data, firstNum, secondNum, title}) => {
    const push = useNavigate();

    const handleNavigateProduct = (id) => {
        push(`/ecommerce-project/product/${id}`);
    }


  return (
    <div className='flex flex-col flex-wrap justify-between items-center w-[90%] lg:w-[350px] h-auto bg-white z-5 relative p-4
            border-gray-200 border-[1px]  hover:border-transparent shadow-xl'> 
                <p className='font-bold text-[23px] tracking-wide w-full flex justify-start'>{title}</p>
                <div className='grid grid-cols-2 gap-10 px-1'>
                    {
                        data.slice(firstNum, secondNum).map((item) => (
                            <div key={item.id}>
                                <img src={Array.isArray(item.images) ? item.images[0] : item.image} alt="productImage"
                                className=' h-[130px] w-[130px] object-contain cursor-pointer'
                                onClick={() => handleNavigateProduct(item.id)} /> 
                                <p className='text-sm text-gray-500'>{item.name.substring(0, 13)}...</p>
                            </div>
                        ))
                    }
                </div>
            <p className='w-full text-xs text-blue-600 flex justify-start cursor-pointer'>View your browsing history</p>
        </div>
  )
}
