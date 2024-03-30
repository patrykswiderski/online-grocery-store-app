const axios = require('axios').default;

const axiosClient = axios.create({
  baseURL:'http://localhost:1337/api'
})

const getCategory = () => axiosClient.get('/categories?populate=*')

export default{
  getCategory
}