import { baseAPI } from './baseApi';

const getProductsById = async (id) => {  
    const response = await baseAPI.get(`/api/product/products/${id}`);
    return response.data;
}

export default getProductsById