import { baseAPI } from './baseApi';

const getLatestProducts = async () => {  
    const response = await baseAPI.get('/api/product/latestproducts');
    return response.data;
}

export default getLatestProducts