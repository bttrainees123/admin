import axios from '../utils/middlewares'

const API_URL = "https://jsonplaceholder.typicode.com/users"

export const fetchUserData = async () => {
    const response = await axios(API_URL)
    return response
}

const PRODUCTS_API = "https://fakestoreapi.com/products";

export const fetchProductsData = async () => {
    const response = await axios(PRODUCTS_API)
    return response;
}

const COMMENT_API = "https://dummyjson.com/comments";

export const fetchCommentData = async () => {
    const response = await axios(COMMENT_API)
    return response;
}

const COMPANY_API = 'https://fake-json-api.mock.beeceptor.com/companieshttps://fake-json-api.mock.beeceptor.com/companies'

export const fetchCompanyData = async () => {
    const response = await axios(COMPANY_API)
    return response;
}
