import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Rating } from '@mui/material';
import getLatestProducts from '../services/getLatestProducts';
import getProductById from '../services/getProductById';
import { handleAddProduct } from '../redux/userSlice';
import { addToCart } from '../services/cart/addToCart';
import { ProductsCarouselOne } from '../components/home/ProductsCarouselOne';
import CloseIcon from '@mui/icons-material/Close';

const productDefault = {
	data: [],
	isLoading: true,
	isLoaded: false,
	isError: false,
};

const defaultdata={
  isLoading: true,
  data: [],
}

const ProductDetails = () => {
  const [selectedProduct, setSelectedProduct] = useState(productDefault);
  const [bigImage, setBigImage] = useState('');
  const [modalPicture, setModalPicture] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('Delivery');
  const [productQuantity, setProductQuantity] = useState(1);
  const [latestProducts, setLatestProducts] = useState(defaultdata);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const { id } = useParams();  
  const user = useSelector((state) => state.user);

  const handleOptionClick = (option) => {
    setSelectedDeliveryOption(option);
  };      
  
  useEffect(() => {
    getProductById(id).then((res) => {      
      try {
        setSelectedProduct({
        data: res,
        isLoading: false,
        isLoaded: true,
        isError: false,
      })
      } catch(err) {
        setSelectedProduct({
          data: [],
          isLoading: false,
          isLoaded: true,
          isError: true,
          })
      }      
    })      
    window.scrollTo({
      top: 0,
    });

    const parseQuery = () => {  
      if(!Object.keys(selectedProduct.data).length){
       getProductById(id).then((res) => {      
         try {
           setSelectedProduct({
           data: res,
           isLoading: false,
           isLoaded: true,
           isError: false,
         })
         } catch(err) {
           setSelectedProduct({
             data: [],
             isLoading: false,
             isLoaded: true,
             isError: true,
             })
         }      
       })      
      }
   }
   parseQuery()

   getLatestProducts().then((res) => {
    setLatestProducts({
        isLoading: false,
        data: res,
    })
})    

  }, [id])

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
        if(e.target.contains(ref.current)) {
          setModalPicture(false);
        }
    })
    if (selectedProduct.data && selectedProduct.data.images && selectedProduct.data.images.length > 0) {
      setBigImage(selectedProduct.data.images[0]);
    }
}, [ref, modalPicture, selectedProduct]);

  
  const handleChangeBigImage = (index) => {
    if (selectedProduct.data && selectedProduct.data.images) {
      setBigImage(selectedProduct.data.images[index]);
    }
  }

  const handleQuantityChange = (event) => {
    setProductQuantity(parseInt(event.target.value, 10));
  };

  const handleAddToCart = async () => {
    if(user.isLoggedIn) {
      dispatch(handleAddProduct(selectedProduct.data));
      addToCart(selectedProduct.data); 
    } else {
      navigate('/ecommerce-project/signin')
    }
	};
  
  if(selectedProduct.isLoading || latestProducts.isLoading) {
    return (<div className='flex justify-center items-center w-full h-screen'>
      <CircularProgress />
    </div>)
  }

  if(selectedProduct.isError) {
    return (
      <div className='flex justify-center items-center w-full h-screen'>
        <p className='text-2xl text-red-950'>Error loading, try again later.</p>
      </div>
    )
  }
  
  const { name, description, price, images, brand } = selectedProduct.data;

  

  return (
    <div className='bg-white'>
      <div className='flex flex-col gap-3 lg:flex-row justify-normal lg:justify-between py-[40px] mx-auto w-[95%]  relative'>
        
        {/* product images  */}
        <div className='flex flex-col mx-auto lg:mx-0 lg:justify-start lg:items-start w-[70%] lg:w-[30%]'>    
          <div className='mx-auto lg:mx-0 h-[300px] w-[300px]'>
            <img src={bigImage || images[0]} className='mx-auto h-[250px] w-[250px] cursor-pointer' 
            onClick={() => setModalPicture(true)} alt='productimage'/>
          </div>
          <div className='flex flex-col gap-2 justify-center items-center py-[10px]'>
            <p className='text-gray-500 pt-[5px]'>Roll over image to zoom in</p>
            <div className='flex flex-row gap-2 justify-evenly'>

              {images.slice(0, 3).map((img, index) => (
                <img key={index} src={img} alt='productImage' 
                className='h-[65px] w-[65px] border border-gray-600 rounded-lg cursor-pointer p-[5px]'
                onMouseEnter={() => handleChangeBigImage(index)} />
              ))}

              {images.length > 4 && (
                <div className='relative'>
                  <img src={images[images.length-1]} alt='productImage' className='h-[65px] w-[65px]  p-[5px] border border-gray-600 rounded-lg' />
                  <div className='absolute top-0 left-0 h-[100%] w-[100%] backdrop-blur-[2px] 
                  flex justify-center items-center cursor-pointer' onClick={() => setModalPicture(true)} >
                    <p className='font-bold text-lg text-black'>
                      +{images.length-4}                   
                    </p>
                  </div>
                </div>
              )}
              

            </div>
          </div>
        </div>

        {/* PRODUCTS INFO */}
        <div className='flex flex-col w-[90%] lg:w-[50%] pr-2 mx-auto lg:justify-start items-start'>
          <div>
            <p className='text-2xl font-bold'>{name}</p>
            <p className='text-sm font-titleFont'>by <span className='text-blue-600'><a href='https://www.amazon.com/Ram-Dass/e/B001HCS3GS/ref=dp_byline_cont_book_1' 
            target="_blank" rel="noreferrer" className='hover:text-red-500 hover:underline'>{brand}</a></span></p>
          </div>
          <div className='border-b border-gray-400 w-[58%] lg:w-[65%] xl:w-[40%] pt-[10px] flex gap-2'>
            <p className='text-md'>4</p>
            <Rating name="half-rating-read" defaultValue={4} readOnly />
            <p className='text-md'>120 Ratings</p>
          </div>
          <div className='flex flex-row gap-3 pt-[20px]'>
            <p className='text-gray-600 text-md '>Price:</p>
            <p className='text-2xl text-red-700 '>${price}</p>
          </div>
          <div className='pt-[30px]'>
            <p className='text-md font-bold'>About this item</p>
            <p>{description}</p>
          </div>
        </div>

        {/* ADD TO CART COLUMN */}
        <div className='flex flex-col gap-5 mx-auto w-[60%] md:w-[40%] lg:w-[20%] justify-start items-center'>
          <div className='flex flex-row gap-1 bg-[#d9f2fb] p-2 mt-2 lg:mt-0'>
            <input type='checkbox' className='mt-0 lg:-mt-4' />
            <p className='text-sm'>Add your 30-day FREE trial of Prime and get <span className='font-semibold'>fast, free delivery</span></p>
          </div>
        
          <div className=' gray-border' >
            <div className='options'>
              <p  className={selectedDeliveryOption === 'Delivery' ? 'active delivery' : 'inactive'}
            onClick={() => handleOptionClick('Delivery')}>
                Delivery
              </p>
              <p className={selectedDeliveryOption === 'Pick Up' ? 'active pickup' : 'inactive'}
            onClick={() => handleOptionClick('Pick Up')}>
                Pick Up
              </p>
            </div>

            {/* product delivery options */}
            {/* Delivery */}
            {selectedDeliveryOption === 'Delivery' && (
              <div className='py-2 px-3 font-titleFont text-md flex flex-col gap-3 w-full'>
                <div>
                  <p>Save 10% now and up to 15% on repeat deliveries.</p>
                  <p>• No fees</p>
                  <p>• Cancel any time</p>
                  <a href='https://www.amazon.com/Lions-Mane-Brain-Focus-Supplements/dp/B078SZX3ML/ref=pd_ci_mcx_mh_mcx_views_0?pd_rd_w=Zlrij&content-id=amzn1.sym.0250fb24-4363-44d0-b635-ac15f859c3b5%3Aamzn1.symc.40e6a10e-cbc4-4fa5-81e3-4435ff64d03b&pf_rd_p=0250fb24-4363-44d0-b635-ac15f859c3b5&pf_rd_r=XP3VSSHMNXW1MW6MZN2C&pd_rd_wg=SbGl3&pd_rd_r=c1850aba-b8f5-4562-a0b6-d7b80df7eda4&pd_rd_i=B078SZX3ML#'
                  className='text-blue-600 hover:underline' target="_blank" rel="noreferrer">
                    Learn More
                  </a>
                </div>
                <p className='text-md text-green-600 font-semibold'>Get it Wednesday, Jul 26</p>
                {/* if in stock */}
                <p className='text-lg text-green-600 font-semibold'>In Stock</p>
                <input type='number' placeholder='Qty: 1' value={productQuantity}
                onChange={handleQuantityChange}
                className='w-[50px] bg-white text-black border border-black rounded-md text-center' />
                <button className="center-element w-[60%] py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400
                to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 
                active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200"
                onClick={() => handleAddToCart()}>
                    Add to cart
                </button>
              </div>
            )}

            {/* Pickup */}
            {selectedDeliveryOption === 'Pick Up' && (
              <div className='py-2 px-3 font-titleFont flex flex-col gap-3 w-full'>
                <div className='flex flex-col'>
                  <p className='text-3xl font-medium flex items-start'>
                    <span className='text-sm font-medium'>$</span>{price}
                  </p>
                  <p className='text-sm'>FREE pickup 
                    <span className='font-semibold'> Wednesday, July 26</span>
                  </p>
                </div>
                <p>Or fastest pickup<span className='font-semibold'> Tomorrow, July 22.</span> 
                Order within<span className='text-green-600'> 20 hrs 59 mins</span>
                </p>
                <div className='text-sm'>
                  <a className='text-blue-500' href='https://www.amazon.com/Lions-Mane-Brain-Focus-Supplements/dp/B078SZX3ML/ref=pd_ci_mcx_mh_mcx_views_0?pd_rd_w=Zlrij&content-id=amzn1.sym.0250fb24-4363-44d0-b635-ac15f859c3b5%3Aamzn1.symc.40e6a10e-cbc4-4fa5-81e3-4435ff64d03b&pf_rd_p=0250fb24-4363-44d0-b635-ac15f859c3b5&pf_rd_r=XP3VSSHMNXW1MW6MZN2C&pd_rd_wg=SbGl3&pd_rd_r=c1850aba-b8f5-4562-a0b6-d7b80df7eda4&pd_rd_i=B078SZX3ML#'
                  target="_blank" rel="noreferrer">
                  Amazon Hub Locker - Belief</a> 
                  <p>3.26 mi | New Castle 19720</p>
                </div>
                <a href='https://www.amazon.com/Lions-Mane-Brain-Focus-Supplements/dp/B078SZX3ML/ref=pd_ci_mcx_mh_mcx_views_0?pd_rd_w=Zlrij&content-id=amzn1.sym.0250fb24-4363-44d0-b635-ac15f859c3b5%3Aamzn1.symc.40e6a10e-cbc4-4fa5-81e3-4435ff64d03b&pf_rd_p=0250fb24-4363-44d0-b635-ac15f859c3b5&pf_rd_r=XP3VSSHMNXW1MW6MZN2C&pd_rd_wg=SbGl3&pd_rd_r=c1850aba-b8f5-4562-a0b6-d7b80df7eda4&pd_rd_i=B078SZX3ML#'
                target="_blank" rel="noreferrer" className='text-blue-500 text-sm'>How pickup works</a>
                {/* if in stock */}
                <p className='text-lg text-green-600 font-semibold'>In Stock</p>
                <input type='number' placeholder='Qty:1'  value={productQuantity}
                onChange={handleQuantityChange}
                className='w-[50px] bg-white text-black border border-black rounded-md text-center' />
                <button className="center-element w-[60%] py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr from-yellow-400
                to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 
                active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200"
                onClick={() => handleAddToCart()}>
                    Add to cart
                </button>
              </div> 
            )}         
          </div>
        </div>          

        {modalPicture && (
        <div  className='top-layer-div w-full fixed top-0 left-0 bg-amazon_blue bg-opacity-50 h-screen'>
          <div className='relative w-full h-full'>
            <div ref={ref} className='absolute top-[10%] md:top-[20%] left-[5%] border border-gray-600 rounded-xl
            bg-white w-[90%] h-[80%] md:h-[60%] z-5 flex flex-col lg:justify-center items-center overflow-scroll overflow-x-hidden'>
              <p className='w-[90%] text-2xl text-gray-600 flex md:justify-start items-center pl-10
              border-b-gray-400 border-b mb-[10px]'>Images</p>
              <div className='w-full flex flex-col md:flex-row gap-2 items-center md:justify-evenly'>
                <img src={bigImage.length > 0 ? bigImage : images[0]} alt='productImage' 
                className='h-[250px] md:h-[350px] w-[250px] md:w-[350px]' />
                <div className='flex flex-col w-[50%]'>
                  <p className='text-xl text-gray-400 py-5'>{name}</p>
                  <div className='flex flex-row gap-2 justify-start flex-wrap w-[80%] pt-[10%] '>

                    {
                      images.map((img, index) => (
                        <img key={index} src={img} alt='productImage' 
                        className='h-[65px] w-[65px] border border-gray-500 rounded-lg cursor-pointer p-[5px]'
                        onClick={() => handleChangeBigImage(index)} />
                      ))
                    }

                  </div>
                </div>
              </div>
            </div>
            <span className='absolute top-[10%] md:top-[20%] right-[5%] rounded-tr-xl h-15 w-15 cursor-pointer flex
            items-center justify-center text-white bg-gray-600 bg-opacity-50'
            onClick={() => setModalPicture(false)}>
                            <CloseIcon fontSize='large' />
            </span>
          </div>
        </div>
      )}      
      
      </div>    

      {/* similar products */}
      <ProductsCarouselOne data={latestProducts.data} pricetag={false} title='Inspired by your browsing history'  />      
    </div>
  )
}

export default ProductDetails