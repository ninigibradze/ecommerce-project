import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import noItemImg from './../assets/noitem.png';
import getProductsById from '../services/getProductsById';
import { Pagination, Skeleton } from '@mui/material';

const priceArr = [
    // {
    //     name: 'Select price (any)',
    //     queryLink: '',
    // },
    {
        name: 'under $10',
        queryLink: 'PriceTo=10',
    },
    {
        name: '$10 to $20',
        queryLink: 'PriceFrom=10&PriceTo=20',
    },
    {
        name: '$20 to $30',
        queryLink: 'PriceFrom=20&PriceTo=30',
    },
    {
        name: '$30 to $50',
        queryLink: 'PriceFrom=30&PriceTo=50',
    },
    {
        name: '$50 and above',
        queryLink: 'PriceFrom=50',
    },
]

const CategorySearch = () => {
    const { id } = useParams();
    const push = useNavigate();
    const location = useLocation();    

    const [products, setProducts] = useState({
        data: [],
        isLoading: true,
        isLoaded: false,
        isError: false,
    })
    const [selectedPriceBox, setSelectedPriceBox] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [page, setPage] = useState(1);

    // GETTING BRAND FILTER ARRAY
    const brandArr = products.data.map(item => item.brand);
    const uniqueBrands = [...new Set(brandArr)];

    const handleChangePage = (_event, value) => {        
		setPage(value);
	};

    useEffect(() => {
        const queryParams = location.search.slice(1)
        getProductsById(`?categoryId=${id}&${queryParams}&PageNumber=${page}&PageSize=5`).then((res) => {
            try{
                setProducts({
                    data: res,
                    isLoading: false,
                    isLoaded: true,
                    isError: false
                })
            } catch(err) {
                setProducts({
                    data: [],
                    isLoading: false,
                    isLoaded: true,
                    isError: true,
                })
            }
        })
        const parseQuery = () => {   
           for(let i=0; i< priceArr.length; i++){
            if(location.search.includes(priceArr[i].queryLink)){
                setSelectedPriceBox(priceArr[i].queryLink);
                break;
            }
           }
        }
        parseQuery()

        const parseQueryBrand = () => {   
            for(let i=0; i< uniqueBrands.length; i++){
             if(location.search.includes(uniqueBrands[i])){
                 setSelectedPriceBox(uniqueBrands[i]);
                 break;
             }
            }
         }
         parseQueryBrand()

    }, [selectedPriceBox, id, selectedBrand, page])

  
    const handleNavigateProduct = (id) => {
        push(`/ecommerce-project/product/${id}`);
    }

    const handlePush = (q) => {         
        const loc = location.search.split("&").filter(item => !item.includes("Price"));
        let queryParamsText = q;
        
        if(loc.length){
            queryParamsText += `&${loc.join("&")}`;
        }
        push(`?${queryParamsText}`)        
    }
 
    
    const handlePushBrand = (q) => {
        const loc = location.search.split("&").filter(item => !item.includes("Brand"));
        let queryParamsText = q;

        if(loc.length){
            queryParamsText += `&${loc.join("&")}`;
        }
        push(`?BrandName=${queryParamsText}`)
    }


    if(products.isLoading) {
        return (
            <div className='flex justify-between  w-full h-screen py-3'>
                <Skeleton variant="rounded" style={{ width: '13%', height: '50%' }}  />
                <Skeleton variant="rounded" style={{ width: '25%', height: '50%' }} />
                <Skeleton variant="rounded" style={{ width: '25%', height: '50%' }} />
                <Skeleton variant="rounded" style={{ width: '25%', height: '50%' }} />      
            </div>)
    }

    if(products.isError) {
        return (
            <div>Error...</div>
        )
    }

  return (
    <>
        <div className='w-full flex flex-col-reverse justify-start md:flex-row h-auto'>
            <div className='w-[270px] h-auto bg-gray-100 p-2 flex flex-col gap-2  md:border-r-[1px] md:order-gray-400'>
                <div className='flex flex-col'>
                    <p className='font-semibold text-md'>Filer by price</p>

                    {/* filter by price */}
                    {
                        priceArr.map((item) => {
                            return (
                                <label key={item.name}>
                                    <input type='radio'  
                                    value={item.queryLink} 
                                    name='price'
                                    checked={selectedPriceBox === item.queryLink}
                                    onChange={() => {
                                        handlePush(item.queryLink); 
                                        setSelectedPriceBox(item.queryLink);
                                    }}
                                    className='mr-1' /> 
                                    {item.name}
                                </label>
                            )
                        })
                    }
                </div>

                {/* filter by brands */}
                <div className='flex flex-col'>
                    {
                        uniqueBrands.length > 0 && (
                            <p className='font-semibold text-md'>Filer by brand</p>
                        )
                    }           
                    {
                        uniqueBrands.map((item, index) => {
                            return (
                                <label key={index} >
                                    <input type='radio'
                                    value={item}
                                    name='brand'
                                    onChange={() => {
                                        handlePushBrand(item);
                                        setSelectedBrand(item);
                                    }}
                                    className='mr-1' />
                                    {item}
                                </label>
                            ) 
                        })
                    }
                </div>
            </div>

            {/* mapping products data */}
            {   
                products.data.length === 0 ? 
                (                
                    <img src={noItemImg} alt='noProductsFound' className='w-[400px] md:w-[530px] mx-auto ' />                
                ) :         
                (
                <div className="flex flex-wrap gap-4 px-4 py-[30px]"> {
                    products.data.map((item) => (
                    <div key={item.id}
                        className="bg-white h-auto border-[1px] border-gray-200 py-6 hover:border-transparent shadow-none 
                        hover:shadow-testShadow duration-200  flex flex-col gap-4 w-[350px]">
                            <div className="w-full h-auto flex items-center justify-center ">
                                <img className="w-48 h-64 object-contain cursor-pointer"
                                src={item.images[0] || item.image}
                                alt="ProductImg"
                                onClick={() => handleNavigateProduct(item.id)}
                                />
                            </div>                
                            <div className="px-4 bg-white flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium cursor-pointer"
                                    onClick={() => handleNavigateProduct(item.id)}>
                                        {item.name.substring(0, 20)}...
                                    </h2>
                                    <p className="text-sm text-gray-600 font-semibold">
                                        ${item.price}
                                    </p>
                                </div>
                                <p className="text-sm">{item.description.substring(0, 100)}...</p>                       
                                <button onClick={() => handleNavigateProduct(item.id)}
                                className="w-full py-1.5 rounded-md mt-3 font-titleFont font-medium text-base bg-gradient-to-tr 
                                from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 
                                to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200">
                                    See more
                                </button>
                            </div>                                   
                    </div>
                    ))}                
                </div>
                )
            }       
        </div>
        
        {/* pagination. if more than 5, pages will appear */}
        {products.data>5 && (
            <div className='flex justify-center items-center py-4'>
                <Pagination count={4} page={page} onChange={handleChangePage} />   
            </div>   
        )}
           
    </>
  ) 
}

export default CategorySearch