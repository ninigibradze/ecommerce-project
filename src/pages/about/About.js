import React from 'react'
import SimpleMap from './SimpleMap'

const aboutAmazonText = `Amazon is guided by four principles: customer obsession rather than competitor focus, 
passion for invention, commitment to operational excellence, and long-term thinking. Amazon strives to be Earth’s 
most customer-centric company, Earth’s best employer, and Earth’s safest place to work. Customer reviews, 1-Click 
shopping, personalized recommendations, Prime, Fulfillment by Amazon, AWS, Kindle Direct Publishing, Kindle, 
Career Choice, Fire tablets, Fire TV, Amazon Echo, Alexa, Just Walk Out technology, Amazon Studios, and The Climate 
Pledge are some of the things pioneered by Amazon.`

const About = () => {
  return (
    <div className='flex flex-col gap-3 pb-8 pt-[2px]'>
      <div className='w-full h-auto py-20 font-titleFont flex flex-col lg:flex-row 
      gap-3 lg:gap-0 justify-evenly items-center'>
        <div className=' w-[30%] flex justify-center items-center'>
          <p className='text-xl font-semibold text-amazon_blue'>Who we are</p>
        </div>
        <div className='w-[70%] flex justify-center items-center'>
          <p className='text-amazon_blue text-xl '>
            {aboutAmazonText}          
          </p>
        </div>
      </div>
        
      <div className='flex flex-col gap-3 justify-center items-center'>
        <SimpleMap />
        <p className='text-lg'>
          <span className='font-semibold'>Address: </span>Chavchavadze str. 37M (Axis Towers Tbilisi, 0165)
        </p>
        <p className='text-lg'>
          <span className='font-semibold'>Phone: </span>032 212 10 15
        </p>
      </div>
    </div>
  )
}

export default About