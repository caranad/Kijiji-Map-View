<template>
  <div class = "kijiji_map">
    <div class = "overlay"></div>
    <div class = "overlay_message">
      <h1>Please wait... this might take a while</h1>
    </div>
    <KijijiFilter 
      v-on:markers = "updateMarkers" 
      v-on:location = "updateLocation" 
      v-on:getLocation = "toggleInfoWindow"/>
    <div class = "kijiji_google_maps">
      <gmap-map :center="center" :zoom = "12" class = "map">
        <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen=false">
          <div class = "kijiji_info_window" v-html="infoContent"></div>
        </gmap-info-window>
        <gmap-marker 
          :key="m.id" 
          v-for="m in markers" 
          :position="m" 
          v-on:click="toggleInfoWindow(m, m.id)"/>
      </gmap-map>
    </div>
  </div>
</template>

<script>

import KijijiFilter from './components/KijijiFilter';

export default {
  name: 'app',
  components: {
    KijijiFilter
  },
  data() {
    return {
      center: { 
        lat: 43.6532, 
        lng: -79.3832 
      },
      markers: [],
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWinOpen: false,
      currentMidx: null
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });
  },
  methods: {
    updateMarkers(markers) {
      this.markers = markers;
    },

    updateLocation(location) {
      this.center = location;
    },

    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker;
      this.infoContent = (`
        <img src = '${marker.img}'/>
        <br/>
        <b>${marker.title}, for $${marker.price}</b>
        <p>${marker.description}</p>
        <button onclick = "window.open('${marker.url}', '_blank')">Message seller</a>
      `);

      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    }
  }
}
</script>

<style>

* {
  font-family: 'Open Sans', sans-serif; 
}

html, body {
  padding: 0;
  margin: 0;
  height: 100%;
}

.kijiji_map {
  display: flex;
  height: 100%;
  position: relative;
  z-index: 1;
}

.map {
  width: 100%;
  height: 100%;
}

.kijiji_info_window img {
  width: 200px;
  height: 200px;
}

.kijiji_google_maps {
  flex: 1 0 70%;
}

.overlay {
  background-color: black;
  opacity: 0.8;
}

.overlay_message h1 {
  color: white;
}

.overlay_message, .overlay {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
}

@media only screen and (max-width: 500px) {
  .kijiji_map {
    flex-direction: column;
  }

  body {
    background-color: #383373;
  }
}

@media only screen and (min-width: 501px) {
  .kijiji_map {
    flex-direction: initial;
  }
}

</style>
