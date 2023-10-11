import { baseAPI } from './baseApi';

const getOffers = async () => {  
    const response = await baseAPI.get('/api/product/offers');
    return response.data;
}

export default getOffers