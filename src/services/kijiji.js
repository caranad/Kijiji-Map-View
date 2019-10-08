import axios from 'axios';
const url = require('../../options.json');

export default class KijijiService {
    constructor() {

    }

    getResults(city, item, min, max, category) {
        return axios.get(
            url["local"] + city + 
            "/" + item + "/" + min + "/" + max + "/" + category
        )
    }

    getLocations() {
        return axios.get(url["local"] + "locations");
    }

    getCategories() {
        return axios.get(url["local"] + "categories");
    }
}