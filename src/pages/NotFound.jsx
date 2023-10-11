import React from 'react'
import notFound from './../assets/notFound.png'

const NotFound = () => {
  return (
    <div className='blue_bg w-full flex flex-col py-10 justify-center items-center gap-2'>
        <img src={notFound} alt='pagenotfound' className='w-[370px]' />
        <p className='text-3xl font-bold mx-auto'>This Page is Lost in Space</p>        
        <p className='w-[50%] text-md mx-auto'>
            You thought this mission to the moon would be a quick six month thing. 
            Your neighbor offered to look after your dog. Your high school math teacher was impressed. 
            He once said you wouldn’t amount to anything.You sure showed him. But now here you are, fifty feet 
            from your spaceship with no way to get back. Your dog will be so sad. Your math teacher will be so smug. 
            Pretty devastating.
        </p>
        
    </div >
  )
}

export default NotFound