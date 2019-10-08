const express = require('express');
const kijiji = require('../controller/kijiji');
const router = express.Router();

const controller = new kijiji();

router.get('/locations', (req, res) => {
    res.send({
        locations: controller.getLocations()
    })
})

router.get('/categories', (req, res) => {
    res.send({
        categories: controller.getCategories()
    })
})

router.get('/:city/:item/:min/:max/:category', (req, res) => {
    const item = req.params.item;
    const city = parseInt(req.params.city);
    const min = Number(req.params.min);
    const max = Number(req.params.max);
    const category = parseInt(req.params.category);

    controller.getKijijiItems(item, city, min, max, category, (err, ads) => {
        if (err) {
            res.send({
                error: err
            });
        }
        else {
            const filteredList = controller.filterList(ads);
            res.send({
                results: filteredList
            });
        }
    });
})

module.exports = router;