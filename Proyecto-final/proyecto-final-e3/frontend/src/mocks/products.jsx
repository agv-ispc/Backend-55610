import axios from "axios";

export const fetchProducts = async () => {
    try {
        const response = await axios.get(
            'http://localhost:8000/api/products'
        )
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching products:', error);
        throw(error)
    }
}

