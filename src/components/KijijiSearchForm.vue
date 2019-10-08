<template>
<form v-on:submit = "getResults($event)">
    <section>
        <label for = "item">What are you looking for?</label>
        <br>
        <input type = "text" v-model = "item">
    </section>
    <section style = "display: flex; justify-content: center;">
        <section type = "flex: 1">
            <label for = "city">Location</label>
            <br>
            <input type = "text" v-model = "city.text" v-on:keyup = "filterResults($event)">
            <ul class = "locationSearchResults">
                <li 
                    v-for = "loc in validLocations" 
                    :key = "loc.id"
                    v-on:click = "selectLocation(loc)">
                    {{ loc.text }}
                </li>
            </ul>
        </section>
        <section stype = "flex: 1">
            <label for = "category">Category</label>
            <br>
            <select v-model = "category">
                <option :value = "0" selected>ALL CATEGORIES</option>
                <option 
                    :value = "cat.id" 
                    v-for = "cat in validCategories" 
                    :key = "cat.id">
                    {{ cat.text }}
                </option>
            </select>
        </section>
    </section>
    <section style = "display: flex; justify-content: center;">
        <section style = "flex: 1">
            <label for = "minPrice">Min Price</label>
            <br>
            <input type = "number" v-model = "minPrice">
        </section>
        <section style = "flex: 1">
            <label for = "maxPrice">Max Price</label>
            <br>
            <input type = "number" v-model = "maxPrice">
        </section>
    </section>
    <section>
        <button>Submit</button>
    </section>

    <div class = "errors" v-if = "errors.length > 0">
        <ul>
            <li v-for = "err in errors" :key = "err">
                {{ err }}
            </li>
        </ul>
    </div>
</form>
</template>

<style scoped>

form section {
    margin-bottom: 4px;
}

input, select {
    width: 90%;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 3px 3px gray;
    padding: 5px;
}

button {
    background-color: navy;
    color: white;
    border-radius: 10px;
    border: 0;
    padding: 10px;
    box-shadow: 2px 2px gray;
    cursor: pointer;
}

.locationSearchResults {
    margin: 0;
    padding: 0;
    position: absolute;
    height: 200px;
    overflow-y: auto;
    width: 28%;
    display: none;
}

.locationSearchResults li {
    background-color: white;
    padding: 2px;
    border: 1px solid black;
    color: black;
    cursor: pointer;
}

</style>

<script>
import KijijiService from '../services/kijiji';

export default {
    name: 'KijijiSearchForm',
    created() {
        this.kijiji.getCategories().then((response) => {
            this.validCategories = response.data.categories;
        })
    },
    data() {
        return {
            kijiji: new KijijiService(),
            validLocations: [],
            validCategories: [],
            item: '',
            city: { id: -1, text: '' },
            category: -1,
            minPrice: 0,
            maxPrice: 100,
            errors: [],
        }
    },
    methods: {
        filterResults() {
            this.kijiji.getLocations().then((response) => {
                const locations = response.data.locations;
                let filteredResults = locations.filter((loc) => {
                    return loc.text.toLowerCase().indexOf(this.city.text.toLowerCase()) !== -1;
                });

                this.validLocations = filteredResults;
                this.$el.querySelector(".locationSearchResults").style.display = "block";
            })
        },

        validateInput() {
            this.errors = [];
            
            if (this.item == '') {
                this.errors.push("Please specify an item.");
            }
            if (this.city.text == '') {
                this.errors.push("Please specify a location.");
            }
            if (this.category == -1) {
                this.errors.push("Please specify a category.");
            }
            if (this.minPrice > this.maxPrice) {
                this.errors.push("Min price must be smaller than max price.");
            }

            return this.errors.length == 0;
        },

        selectLocation(loc) {
            this.city = loc;
            this.validLocations = [];
            this.$el.querySelector(".locationSearchResults").style.display = "none";
        },

        getResults(event) {
            event.preventDefault();

            const isValid = this.validateInput();

            if (isValid) {
                this.$emit("attemptSubmit", {
                    city: this.city.id, 
                    category: this.category,
                    minPrice: this.minPrice,
                    maxPrice: this.maxPrice,
                    item: this.item
                })
            }
        }
    }
}
</script>