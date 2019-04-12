import axios from 'axios'

const YELP_API_KEY = 'AQNgK9mC7F4Jf8l2QBt3UchV8kuUJ9fJQuIVTQqcQQjm4qyhOR1tPcW_xHhdq_uxNySb0z3dQ5akkmairG0_AreoT41KJbneHkviAySb59WWrZboi4vUl9QZ6HWwXHYx'

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
})

const getCoffeeShops = userLocation => {
  return api
    .get('/businesses/search', {
      params: {
        limit: 10,
        categories: 'coffee,coffeeroasteries,coffeeshops',
        ...userLocation,
      },
    })
    .then(res =>
      res.data.businesses.map(business => {
        return {
          name: business.name,
          coords: business.coordinates,
        }
      })
    )
    .catch(error => console.error(error))
}

export default {
  getCoffeeShops,
}