
import axios from "axios";

const YELP_API_KEY = "jvE1Svy7OHgKCxBroouI97d7ZlQTJQaXwboCu5OQvVaG2qYTyxduPzSTlfHmcb6R3t4TAstBzD-FmCKwl9UppebB6OVQA1-eNLcYxsTOyVKVk5EgnLm1Fb-KDCevXHYx";

const api = axios
    .create({
        baseURL: 'https://api.yelp.com/v3',
        headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
        }
    });

export const getCoffeeShops = (userLocation, filter = {}) => {
    console.log(userLocation)
    return api
        .get('/businesses/search', {
            params: {
                limit: 10,
                categories: 'Coffee',
                ...userLocation,
                ...filter
            }
        })
        .then(res => {
            console.log(res.data)
            res.data.businesses.map(business => {
                return {
                    name: business.name,
                    coords: business.coordinates,
                };
            })

        }

        )
        .catch(error => console.error(error))
}

export default {
    getCoffeeShops
}