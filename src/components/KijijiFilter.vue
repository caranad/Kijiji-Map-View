<template>
    <div class = "kijiji_filter">
        <div class = "openSearchFilter" v-on:click = "openSearchFilter()">
            <div>
                >
            </div>
        </div>
        <div class = "kijiji_search">
            <KijijiSearchForm v-on:attemptSubmit = "getResults"/>
            <KijijiResults v-bind:results = "results" v-on:emitLocation = "getLocation"/>
        </div>
    </div>
</template>

<style scoped>

.errors {
    text-align: left;
    background-color: red;
}

.errors ul {
    padding: 0;
    text-align: center;
}

.errors ul li {
    border: 1px solid white;
    padding: 3px;
}

.openSearchFilter {
    background-color: #383373;
    width: 40px;
    height: 40px;
    font-size: 40px;
    top: 50px;
    left: 30%;
    z-index: 1;
    cursor: pointer;
    margin-left: 10px;
}

.kijiji_filter { 
    flex: 1 0 30%;
    background-color: #383373;
    color: white;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.kijiji_logo {
    text-align: center;
    padding: 5px;
}

img {
    width: 70%;
    height: 70%;
}

.kijiji_search {
    text-align: center;
    padding: 10px;
    width: 90%;
}

</style>

<script>
import KijijiResults from './KijijiResults';
import KijijiSearchForm from './KijijiSearchForm';
import KijijiService from '../services/kijiji';
import{ TweenMax, TimelineMax } from 'gsap';

export default {
    name: 'KijijiFilter',
    components: {
        KijijiResults, KijijiSearchForm
    },
    data() {
        return {
            kijiji: new KijijiService(),
            results: null,
            limitResults: 10,
            isSearchFilterOpen: true
        }
    },
    methods: {
        getResults(data) {
            document.querySelector(".overlay").style.display = "block";
            document.querySelector(".overlay_message").style.display = "block";

            this.kijiji.getResults(data.city, data.item, 
                data.minPrice, data.maxPrice, data.category).then((response) => {
                this.results = [];

                if (response.data.error) {
                    alert("Sorry, an exception occured.");
                }
                else {
                    this.results = response.data.results;
                        
                    if (this.results.length > 0) {
                        this.$emit('location', {
                            lat: this.results[0].lat,
                            lng: this.results[0].lng
                        })
                    }

                    this.$emit('markers', this.results);
                }

                document.querySelector(".overlay").style.display = "none";
                document.querySelector(".overlay_message").style.display = "none";
            });
        },

        openSearchFilter() {
            let kf_options, sf_options;
            const timeline = new TimelineMax();

            if (this.isSearchFilterOpen) {
                kf_options = {
                    flex: "0 0 5%", width: "0%"
                };
                sf_options = {
                    display: "none"
                };
            }
            else {
                kf_options = {
                    flex: "1 0 30%", width: "100%"
                };
                sf_options = {
                    display: "block"
                };
            }

            this.isSearchFilterOpen = !this.isSearchFilterOpen;
            
            timeline.add(TweenMax.to(".kijiji_search", 0, sf_options))
            timeline.add(TweenMax.to(".kijiji_filter", 1, kf_options))

            timeline.play();
        },

        getLocation(id) {
            let marker;

            for (let i = 0; i < this.results.length; i++) {
                if (this.results[i].id == id) {
                    marker = this.results[i];
                    this.$emit("getLocation", marker, marker.id)
                }
            }
        }
    }
}
</script>