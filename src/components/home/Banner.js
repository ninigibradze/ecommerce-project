import React, { useState } from 'react';
import Slider from 'react-slick';
import bannerImgOne from './../../assets/banner/bannerImgOne.jpg';
import bannerImgTwo from './../../assets/banner/bannerImgTwo.jpg';
import bannerImgThree from './../../assets/banner/bannerImgThree.jpg';
import bannerImgFour from './../../assets/banner/bannerImgFour.jpg';
import bannerImgFive from './../../assets/banner/bannerImgFive.jpg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Banner = () => {

  const sliderImages = [
    {url: bannerImgOne},
    {url: bannerImgTwo},
    {url: bannerImgThree},
    {url: bannerImgFour},
    {url: bannerImgFive},
  ]

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <ArrowBackIosNewIcon className='text-gray-700' />
      </div>
    );
  };
  
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <ArrowForwardIosIcon className='text-gray-700' />
      </div>
    );
  };

  const [activeDot, setActiveDot] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    beforeChange: (prev, next) => {
      setActiveDot(next);
    },
    appendDots: dots => (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '0',
          right: '0',
          margin: '0 auto',
          width: '210px',
          transform: 'translate(-50% -50%)',
        }}
      >
        <ul style={{ display: 'flex', 
        justifyContent: 'space-between', 
        alignItem: 'center',
        width: '100%', 
        }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === activeDot ? 
          {
            background: '#131921',
            width: "30px",
            height: '30px',
            borderRadius: '50%',
            color: "white",
            border: "1px blue #f3a847",
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px 0',
          } : {
            background: '#232F3E',
            width: "30px",
            height: '30px',
            borderRadius: '50%',
            color: "white",
            border: "1px blue #f3a847",
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',            
            padding: '8px 0',
           }
          }
      >
        {i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "55%",
                left: "38%",
                // right: "50%",
                transform: "translate(-50% -50%)",
                width: "120px",
              }}
            >
              <ul
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {dots}
              </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === activeDot
                  ? {
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      background: "#131921",
                      padding: "8px 0",
                      fontSize: "10px",
                      cursor: "pointer",
                      border: "1px solid #f3a847",
                    }
                  : {
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#232F3E",
                      color: "white",
                      padding: "8px 0",
                      fontSize: "10px",
                      cursor: "pointer",
                      border: "1px solid white",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className='w-full'>
      <div className='w-full h-full relative cursor-pointer'>
        <Slider {...settings} >
          {sliderImages.map((image, index) => (
            <div key={index}>
              <img src={image.url} alt='bannerImage' />
            </div>
          ))}
      </Slider>
      </div>
    </div>
  )
}

export default Banner