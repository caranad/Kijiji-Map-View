<template>
    <div class = "kijiji_search_results">
        <div v-if = "results && results.length > 0">
            <div class = "kijiji_item" v-for = "res in results" :key = "res.url" v-on:click = "emitId(res.id)">
                <div class = "kijiji_item_image_container">
                    <img :src = "require('../assets/logo.png')" v-if = "!res.img">
                    <img :src = "res.img" v-if = "res.img">
                </div>
                <div class = "kijiji_item_info_container">
                    <div class = "kijiji_item_title">{{res.title}}</div>
                    <p>{{res.mapAddress}}</p>
                </div>
            </div>
        </div>

        <div class = "kijiji_empty_results" v-if = "results && results.length === 0">
            <h3>No results were found for your search.</h3>
        </div>
    </div>
</template>

<style scoped>

.kijiji_search_results {
    text-align: center;
    padding: 5px;
    overflow-y: auto;
}

.kijiji_item {
    background-color: white;
    color: black;
    padding: 5px;
    border-radius: 5px;
    border-bottom: 10px;
    border: 1px solid gray;
    display: flex;
    cursor: pointer;
}

.kijiji_item_title {
    font-weight: bold;
}

.kijiji_item:hover {
    background-color: #2681d8;
    opacity: 0.7;
}

.kijiji_item .kijiji_item_image_container {
    flex: 1;
}

.kijiji_item .kijiji_item_info_container {
    flex: 3;
}

.kijiji_item_image_container img {
    width: 85px;
    height: 85px;
}

@media only screen and (max-width: 500px) {
  .kijiji_search_results {
      max-height: 125px;
  }
}

@media only screen and (min-width: 501px) {
  .kijiji_search_results {
      max-height: 300px;
  }
}

</style>

<script>
export default {
    name: 'KijijiResults',
    props: {
        results: Array
    },
    methods: {
        emitId(id) {
            this.$emit("emitLocation", id);
        }
    }
}
</script>