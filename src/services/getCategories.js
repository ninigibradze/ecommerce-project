import { baseAPI } from './baseApi';

const getCategories = async () => {  
    const response = await baseAPI.get('/api/product/categories');
    return response.data;
}

export default getCategories