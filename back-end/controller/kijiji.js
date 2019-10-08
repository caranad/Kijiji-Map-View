const kScraper = require('kijiji-scraper');
const locations = require('../locations');
const categories = require('../categories');
const kijijiItem = require('../models/kijiji');

class KijijiController {
    constructor() {

    }

    getKijijiItems(item, city, min, max, category, callback) {
        const params = {
            keywords: item,
            locationId: city,
            categoryId: category,
            minPrice: min,
            maxPrice: max
        };

        return kScraper.search(params, {}, callback);
    }

    filterList(results) {
        let marks = [];
        let used_urls = [];

        for (let i = 0; i < results.length; i++) {
            if (used_urls.indexOf(results[i].url) == -1) {
                marks.push(new kijijiItem(
                    i, results[i].title, results[i].image, results[i].attributes.location.latitude, 
                    results[i].attributes.location.longitude, results[i].description, results[i].attributes.price,
                    results[i].attributes.location.mapAddress, results[i].url
                ).getItem())
                used_urls.push(results[i].url);
            }
            else {
                break;
            }
        }

        return marks;
    }

    getLocations() {
        let z = [];
        const keys = Object.keys(locations);

        for (let i = 0; i < keys.length; i++) {
            let s = {};
            s['id'] = locations[keys[i]]['id']
            s['text'] = keys[i].replace(/_/g, " ")
            z.push(s);
        
            const m = Object.keys(locations[keys[i]]).splice(1);
            
            for (let j = 0; j < m.length; j++) {
                let t = {}
                t['id'] = locations[keys[i]][m[j]]['id'];
                t['text'] = m[j].replace(/_/g, " ");
                z.push(t);
            } 
        }

        return z;
    }

    getCategories() {
        let z = [];
        const keys = Object.keys(categories)

        for (let i = 0; i < keys.length; i++) {
            let s = {};

            s['id'] = categories[keys[i]]['id'];
            s['text'] = keys[i].replace(/_/g, " ");
            z.push(s);
        }

        return z;
    }
}

module.exports = KijijiController;