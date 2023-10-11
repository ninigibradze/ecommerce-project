import { baseAPI } from './baseApi';

const getProductById = async (id) => {  
    const response = await baseAPI.get(`/api/product/products/${id}`);
    return response.data;
}

export default getProductById