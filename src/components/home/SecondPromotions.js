import React from 'react';
import playerAdd from './../../assets/playerAdd.jpg'
import { useNavigate } from 'react-router-dom';

const SecondPromotions = ({data, dataTwo}) => {
  const push = useNavigate();

  const handleNavigateProduct = (id) => {
    push(`/ecommerce-project/product/${id}`);
  }

  return (
    <div className='max-w-screen-2xl mx-auto w-[97%] grid grid-col 2xl:grid-cols-2 2xl:justify-start justify-center  '> 
        <div className='w-[100%]'>
            <div className='w-[100%] h-auto relative'>
                <img src={playerAdd} alt='playerAddvertisment' className='object-contain' />
                <div className='absolute top-5 left-5 text-white cursor-text '>
                  <p className='text-2xl font-bold'>Video: Recommended for you</p>
                  <p className='text-md'>SpongeBob SquarePants Season 1</p>
                </div>
                <div className='absolute bottom-5 left-5 text-white text-sm cursor-pointer'>
                  <p><a href='https://www.amazon.com/gp/video/detail/amzn1.dv.gti.46a9f736-6880-98bb-e01b-7396e214ab5b/?ie=UTF8&ref_=dvm_us_api_cs_hud_pr_DW&pf_rd_r=SW3ARGJVDX4WZ267B922&pf_rd_p=5af45aa7-715b-4ed8-811b-7f9befef5ba2&pd_rd_r=3a13b4c0-faad-49fe-b7b2-a659a68f96af&pd_rd_w=PQo14&pd_rd_wg=inGjx'
                  target="_blank" rel="noreferrer"
                  className='hover:underline'>Start watching</a></p>
                </div>
                <div className='absolute bottom-5 right-10 text-white text-xs'>
                  <p className='border-white border-[1px] px-[8px] py-[5px] rounded-[20px] font-bold cursor-pointer hover:backdrop-blur-2xl'>
                    <a href='https://www.amazon.com/gp/video/detail/amzn1.dv.gti.46a9f736-6880-98bb-e01b-7396e214ab5b/?ie=UTF8&ref_=dvm_us_api_cs_hud_pr_DW'
                     target="_blank" rel="noreferrer">
                      Add to Watchlist</a>
                  </p>
                </div>
            </div>
        </div>

        <div className='2xl:flex hidden 2xl:justify-between pl-16 gap-4'>
          <div className='flex flex-col justify-evenly items-center flex-wrap w-[70%] lg:w-[300px] h-auto gap-4 bg-white z-5 p-2
              border-gray-200 border-[1px]  hover:border-transparent shadow-xl'>
                  <p className='font-semibold text-[20px] tracking-wide leading-none w-full flex justify-start'>Deals related to items in your wishlist</p>
                  <div className='grid grid-cols-2 gap-4 px-4'>
                      {
                          data.slice(5, 9).map((item) => (
                              <img key={item.id} src={item.images[0]} alt="productImage"
                              className=' h-[150px] w-[150px] object-contain cursor-pointer'
                              onClick={() => handleNavigateProduct(item.id)}  /> 
                          ))
                      }
                  </div>
                  <p className='w-full text-xs text-blue-600 flex justify-start cursor-pointer'>See all deals</p>
            </div>
            <div className='flex flex-col justify-evenly items-center flex-wrap w-[70%] lg:w-[300px] h-auto gap-4 bg-white z-5  p-2
              border-gray-200 border-[1px]  hover:border-transparent shadow-xl'>
                  <p className='font-semibold text-[20px] tracking-wide leading-none w-full flex justify-start'>Deals related to your views</p>
                  <div className='grid grid-cols-2 gap-10 px-4'>
                      {
                          dataTwo.slice(0, 4).map((item) => (
                            <img key={item.id} src={item.images[0]} alt="productImage"
                            className=' h-[150px] w-[150px] object-contain cursor-pointer'
                            onClick={() => handleNavigateProduct(item.id)}  /> 
                          ))
                      }
                  </div>
                  <p className='w-full text-xs text-blue-600 flex justify-start cursor-pointer'>See all deals</p>
            </div>
        </div>
    </div>
  )
}

export default SecondPromotions