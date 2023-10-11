import React from 'react'

const SecondFooterFirstCol = () => {
  return (
    <div className='w-full'>
    <p className='font-titleFont font-semibold text-md text-white'>Get to Know Us</p>
    <ul className='text-white text-sm font-light pt-[8px]'>
      <li className='py-[3px]'>
        <a className='hover:border-b-white hover:border-b-[1px] visited:text-white' 
        href='https://www.amazon.jobs/' target="_blank" rel="noreferrer" >Careers</a>
      </li>
      <li className='py-[3px]'>
        <a className='hover:border-b-white hover:border-b-[1px] visited:text-white' 
        href='https://email.aboutamazon.com/l/637851/2020-10-29/pd87g?Traffic_Source=Blog&Module=hat'
        target="_blank" rel="noreferrer" >Amazon Newsletter</a>
      </li>
      <li className='py-[3px]'>
        <a className='hover:border-b-white hover:border-b-[1px] visited:text-white' 
        href='https://www.aboutamazon.com/?utm_source=gateway&utm_medium=footer&token=about'
        target="_blank" rel="noreferrer"  >About Amazon</a>
      </li>
      <li className='py-[3px]'>
        <a className='hover:border-b-white hover:border-b-[1px] visited:text-white' 
        href='https://www.amazon.com/b?node=15701038011&ie=UTF8'
        target="_blank" rel="noreferrer" >Accessibility</a>
      </li>
      <li className='py-[3px]'>
        <a className='hover:border-b-white hover:border-b-[1px] visited:text-white' 
        href='https://sustainability.aboutamazon.com/?utm_source=gateway&utm_medium=footer&ref_=susty_footer'
        target="_blank" rel="noreferrer" >Press Center</a>
      </li>
      <li className='py-[3px]'>
        <a className='hover:border-b-white hover:border-b-[1px] visited:text-white' 
        href='https://www.amazon.com/ir'
        target="_blank" rel="noreferrer" >Investor Relations</a>
      </li>
    </ul>
  </div>
  )
}

export default SecondFooterFirstCol