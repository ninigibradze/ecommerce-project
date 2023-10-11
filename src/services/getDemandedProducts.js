import { baseAPI } from './baseApi';

const getDemandedProducts = async () => {  
    const response = await baseAPI.get('/api/product/mostdemandproducts');
    return response.data;
}

export default getDemandedProducts