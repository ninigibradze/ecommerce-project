import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

export const LiveSearch = ({closeNav}) => {

    const prods = useSelector((state) => state.products);
    const push = useNavigate();

    const [liveSearch, setLiveSearch] = useState({
        value: '',
        data: [],
        result: [],
        isLoading: true,
    });

    const handleInputChange = (e) => {
        const { value } = e.target;

        const filteredResults = prods.data?.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setLiveSearch(prevData => ({
            ...prevData,
            value,
            result: filteredResults 
        }));
      };

    const handleNavigateProduct = (id) => {
        setLiveSearch({value: ''})
        closeNav(false)
        push(`/ecommerce-project/product/${id}`);
    }
  return (
    <div className='flex lgl:hidden h-10 relative border-b-[2px] border-b-gray-300 rounded-br-md'>
                            <input type='text' 
                            className='text-amazon_blue flex-grow border-none outline-none px-2 h-full 
                            text-base relative' 
                            placeholder='Search Amazon'
                            value={liveSearch.value}
                            onChange={handleInputChange} />
                            { 
                                liveSearch?.value?.length > 0 && 
                                (
                                    <ul className='absolute top-10 bg-white z-10 pl-2 py-1 rounded-sm w-full shadow-xl'>
                                        {liveSearch?.result?.map(product => (
                                            <li key={product.id} className='text-black text-md font-semibold pt-1 cursor-pointer' 
                                            onClick={() => handleNavigateProduct(product.id)}>
                                                {product.name.substring(0, 100)}
                                            </li>
                                        ))  
                                        }
                                    </ul>
                                )
                            }
                            <span className='bg-amazon_yellow flex items-center justify-center w-12 h-full text-base
                            hover:bg-[#f3a847] transition text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md'>
                                <SearchIcon />
                            </span>
                        </div>
  )
}
