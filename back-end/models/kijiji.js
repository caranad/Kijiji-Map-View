class KijijiItem {
    constructor(
        id, title, img, lat, lng, description, price, mapAddress, url
    ) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.lat = lat;
        this.lng = lng;
        this.description = description;
        this.price = price;
        this.mapAddress = mapAddress;
        this.url = url;
    }

    getItem() {
        return {
            id: this.id,
            title: this.title,
            img: this.img,
            lat: this.lat,
            lng: this.lng,
            description: this.description,
            price: this.price,
            mapAddress: this.mapAddress,
            url: this.url
        }
    }
}

module.exports = KijijiItem;