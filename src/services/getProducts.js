import { baseAPI } from './baseApi';

const getProducts = async () => {  
    const response = await baseAPI.get('/api/product/products');
    return response.data;
}

export default getProducts