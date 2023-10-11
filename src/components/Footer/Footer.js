import React from 'react';
import SecontFooterElement from './SecontFooterElement';
import logo from './../../assets/logo.png'
import SecondFooterFirstCol from './SecondFooterFirstCol';
import SecondFooterSecondCol from './SecondFooterSecondCol';
import SecondFooterThirdCol from './SecondFooterThirdCol';
import SecondFooterFourCol from './SecondFooterFourCol';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth"
    });
  };

  return (
    <div>
      
      {/* firstFooter */}
      <button onClick={scrollToTop}
      className='w-full text-xs text-white font-titleFont hover:bg-[#36465ae0] hover:cursor-pointer bg-[#36465a] h-[50px]'>
       Back To Top
      </button>

      {/* secondFooter */}
      <div className='w-full bg-amazon_light grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-4 
      md:place-items-center md:items-start px-10 gap-6 py-[50px] lgl:px-[270px]'>
        <SecondFooterFirstCol />
        <SecondFooterSecondCol />
        <SecondFooterThirdCol />
        <SecondFooterFourCol />        
      </div>

      {/* third footer */}
      <div className='w-full bg-[#121b22] hidden md:flex justify-center py-[30px]'>
        <div className='width-[90%] lg:w-[70%] flex justify-evenly gap-10 lg:gap-2 flex-wrap'>
          <div className='flex flex-col gap-[10px]'>
            <SecontFooterElement title='Amazon Music' subTitle='Stream millions of songs' />
            <SecontFooterElement title='Amazon Business' subTitle='Everything For Your Business' />
            <SecontFooterElement title='Audible' subTitle='Listen to Books & Original Audio Performances	' />
            <SecontFooterElement title='Goodreads' subTitle='Book reviews & recommendations' />
            <SecontFooterElement title='Shopbop' subTitle='Designer Fashion Brands' />
          </div>
          <div className='flex flex-col gap-[10px]'>
             <SecontFooterElement title='eero WiFi' subTitle='Stream 4K Video in Every Room' />
            <SecontFooterElement title='Amazon Advertising' subTitle='Find, attract, and engage customers' />
            <SecontFooterElement title='Book Depository' subTitle='Books With Free Delivery Worldwide' />
            <SecontFooterElement title='IMDB' subTitle='Movies, TV & Celebrities' />   
            <SecontFooterElement title='Amazon Warehouse' subTitle='Great Deals on Quality Used Products' />
          </div>
          <div className='flex flex-col gap-[10px]'>
            <SecontFooterElement title='Blink' subTitle='Smart Security for Every Home' />
            <SecontFooterElement title='6pm' subTitle='Score deals on fashion brands' />
            <SecontFooterElement title='Amazon Music' subTitle='Stream millions of songs' />
            <SecontFooterElement title='AmazonGlobal' subTitle='Ship Orders Internationally' />
            <SecontFooterElement title='Box Office Mojo' subTitle='Find Movie Box Office Data' />
          </div>
          <div className='flex flex-col gap-[10px]'>
            <SecontFooterElement title='IMDbPro' subTitle='Get Info Entertainment Professionals Need' />
            <SecontFooterElement title='Neighbors App' subTitle='Real-Time Crime & Safety Alerts' />
            <SecontFooterElement title='ACX' subTitle='Audiobook Publishing Made Easy' />
            <SecontFooterElement title='Sell on Amazon' subTitle='Start a Selling Account' />   
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className='w-full bg-[#121b22] flex justify-center flex-col'>
        <div className='flex justify-center items-center text-xs text-gray-300 gap-4 pt-[20px]'>
          <a href='https://www.amazon.com/gp/help/customer/display.html?nodeId=508088&ref_=footer_cou'
          target="_blank" rel="noreferrer" className=' visited:text-gray-300'>
            <p className='hover:underline'>Conditions of Use</p>
          </a>
          <a href='https://www.amazon.com/gp/help/customer/display.html?nodeId=468496&ref_=footer_privacy'
          target="_blank" rel="noreferrer" className=' visited:text-gray-300'>
            <p className='hover:underline'>Privacy Notice</p>
          </a>
          <a href='https://www.amazon.com/privacyprefs?ref_=footer_iba'
          target="_blank" rel="noreferrer" className=' visited:text-gray-300'>
            <p className='hover:underline'>Your Ads Privacy Choices</p>
          </a>
        </div>
        <div className='flex justify-center items-center pb-[18px]'>
          <p className='text-xs text-gray-300'>
            © 1996-2023, Amazon.com, Inc. or its affiliates
          </p>
        </div>

      </div>

      <div className='w-full bg-amazon_blue flex justify-center items-center py-[20px]'>
        <img src={logo} alt='amazonLogo' className='w-[100px]' />
      </div>

    </div>
  )
}

export default Footer