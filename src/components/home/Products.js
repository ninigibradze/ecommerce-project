import React, { useEffect, useState } from 'react'
import { ProductsCarouselOne } from './ProductsCarouselOne';
import SecondPromotions from './SecondPromotions';
import ElectronicsCategory from './ElectronicsCategory';
import getProducts from '../../services/getProducts';
import { ProductsBoxContainer } from './ProductsBoxContainer';
import getDemandedProducts from '../../services/getDemandedProducts';
import getLatestProducts from '../../services/getLatestProducts';
import { CircularProgress } from '@mui/material';
import getOffers from '../../services/getOffers';

const defaultdata={
    isLoading: true,
    data: [],
}

const Products = () => {
    

    const [products, setProducts] = useState(defaultdata);
    const [demandedProducts, setDemandedProducts] = useState(defaultdata);
    const [latestProducts, setLatestProducts] = useState(defaultdata);
    const [offers, setOffers] = useState(defaultdata)


    useEffect(() => {
        getProducts().then((res) => {
            setProducts({
                isLoading: false,
                data: res,
            })
        })
        getDemandedProducts().then((res) => {
            setDemandedProducts({
                isLoading: false,
                data: res,
            })
        })
        getLatestProducts().then((res) => {
            setLatestProducts({
                isLoading: false,
                data: res,
            })
        })     
        getOffers().then((res) => {
            setOffers({
                isLoading: false,
                data: res,
            })
        })        
           
    }, [])


    if( products.isLoading || demandedProducts.isLoading || latestProducts.isLoading || offers.isLoading) {
        return (
            <div className='flex justify-center items-center w-full h-screen'> 
                <CircularProgress />
            </div>)
    }
   
  return ( 
    <div>
        <div className='backdrop-blur-sm md:backdrop-blur-md max-w-screen-2xl mx-auto grid grid-cols lgl:grid-cols-2 
        xl:grid-cols-3 2xl:grid-cols-4 gap-5 xl:gap-10  px-4 pb-[23px] font-titleFont place-items-center
        items-stretch '>
            <ProductsBoxContainer data={products.data} firstNum = {0} secondNum = {4} title='Latest Products' />
            <ProductsBoxContainer data={demandedProducts.data} firstNum = {0} secondNum = {4} title='Most Demanded Products'/>
            <ProductsBoxContainer data={latestProducts.data} firstNum = {0} secondNum = {4} title='Latest Products' />
            <div className='flex flex-col h-[160px] w-[350px] gap-4 bg-white z-5 relative p-4
            border-gray-200 border-[1px]  hover:border-transparent shadow-xl duration-200'>
                <p className='font-bold text-xl'>FREE shipping</p>
                <p className='text-sm'>Choose from millions of items. Available on orders over $25 shipped by Amazon.</p>
                <p className='text-xs text-blue-600 cursor-pointer'><a href='https://www.amazon.com/freeshipping/?_encoding=UTF8&ref=gwrd_adtop_freeship&pf_rd_r=YCSK77SPCXEHYC11NNV1&pf_rd_p=4108889f-d390-49b4-9f9f-a9b93535ee49&pd_rd_r=b2ae375f-6d7d-4aac-b90b-5aeb59e8bbde&pd_rd_w=hspg1&pd_rd_wg=hok6F&ref_=pd_gw_unk'
                target="_blank" rel="noreferrer">Learn more</a></p>
            </div>  
        </div>

        {/* AMAZON PLAYER WITH PROMOTIONS */}
        <SecondPromotions data={products.data} dataTwo={latestProducts.data} />


        {/* PRODUCTS SLIDE */}
        <ProductsCarouselOne data={latestProducts.data} title='Inspired by your browsing history' pricetag={false}  />
        {/* <ProductsCarouselOne data={offers.data} title='Offers' pricetag={true}  /> */}
        <ProductsCarouselOne data={demandedProducts.data} pricetag={false} title='Top Deals' />

        {/* CATEGORIES */}
        <div className='grid grid-cols lgl:grid-cols-2 2xl:grid-cols-4 gap-5 xl:gap-10  px-4 pb-[23px] 
        font-titleFont place-items-center items-stretch'>
            <ProductsBoxContainer data={products.data} firstNum = {0} secondNum = {4} title='Wellness products, delivered today' />  
            <ElectronicsCategory data={latestProducts.data}  />
            <ProductsBoxContainer data={products.data} firstNum = {4} secondNum = {8} title='Keep shopping for' />            
            <ProductsBoxContainer data={demandedProducts.data} firstNum = {0} secondNum = {4} title='Most Demanded Products' />            
        </div>        
    </div>     
  )
}

export default Products