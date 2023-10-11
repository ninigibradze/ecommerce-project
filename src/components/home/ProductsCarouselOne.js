import React from 'react'
import Slider from 'react-slick'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';


export const ProductsCarouselOne = ({data, title}) => {
  const push = useNavigate();

    const PrevArrow = ({ onClick }) => {
        return (
          <div className="products-arrow prevArr" onClick={onClick}>
            <ArrowBackIosNewIcon className='text-gray-400' />
          </div>
        );
      };
      
      const NextArrow = ({ onClick }) => {
        return (
          <div className="products-arrow nextArr" onClick={onClick}>
            <ArrowForwardIosIcon className='text-gray-400' />
          </div>
        );
      };

      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
              breakpoint: 1280,
              settings: {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 6,
                slidesToScroll: 1,
              }
            },
            {
                breakpoint: 960,
                settings: { 
                  dots: false,
                  infinite: true,
                  speed: 500,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                }
              },
            {
              breakpoint: 600,
              settings: {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480,
              settings: {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            }
          ]
        };

        const handleNavigateProduct = (id) => {
          push(`/ecommerce-project/product/${id}`);
        }

  return (
    <div className='py-[25px] grid grid-cols-1 font-titleFont place-items-center gap-4'>
        <div className='w-[97%] h-[250px] bg-white px-11 flex flex-col justify-evenly shadow-md'>
            <div className='flex flex-row w-auto gap-[15px] items-center justify-start'>
                <h2 className='tracking-wide text-2xl font-bold flex justify-start'>{title}</h2>
                <p className='text-sm text-blue-600 hover:text-red-500 hover:underline cursor-pointer flex justify-end'>See more</p>
            </div>
            <div>
                <Slider {...settings}>
                    {data.map((item, index) => (
                            <div key={index}>
                                <img className='ml-[15px] w-[140px] h-[140px] flex justify-center items-center cursor-pointer' 
                                src={item.images[0]} alt='ProductSlideImage'
                                onClick={() => handleNavigateProduct(item.id)} />                               
                            </div>
                        ))}  
                    {data.map((item, index) => (
                            <div key={index}>
                                <img className='ml-[15px] w-[140px] h-[140px] flex justify-center items-center cursor-pointer' 
                                src={item.images[0]} alt='ProductSlideImage'
                                onClick={() => handleNavigateProduct(item.id)} />                                
                            </div>
                    ))}                                       
                </Slider>
            </div>
        </div>
    </div>
  )
}
