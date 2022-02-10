<template>
  <div class="weather_container" :class="$style.weather_container">
    <div class="weather__search" :class="$style.weather__search">
      <input v-model="place" type="text" :class="$style.weather__searchInput" placeholder="Enter city..." @keypress.enter="fetchWeather" />
      <button type="button" :class="$style.weather__searchBtn" @click="fetchWeather()">
        <span class="material-icons material-icons-outlined">search</span>
      </button>
    </div>
    <WeatherTabs />
  </div>
</template>
<script>
import axios from "axios"
import WeatherTabs from "./WeatherTabs.vue"

export default {
  data() {
    return {
      place: ""
    }
  },
  components: {
    WeatherTabs
  },
  methods: {
    async fetchWeather() {
      if (this.place.length > 1) {
        let codes = await this.getGeoCode()
        this.$store.dispatch("updateCurrentWeather", codes.data[0])
        this.$store.dispatch("updateForecastList", codes.data[0])
      }
    },
    getGeoCode() {
      return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${this.place}&appid=${this.$store.state.apiKey}`)
    }
  }
}
</script>
<style module lang="less">
@desktop: ~"only screen and (min-width: 960px) and (max-width: 1199px)";
@tablet: ~"only screen and (min-width: 720px) and (max-width: 959px)";
@phone: ~"only screen and (max-width: 719px)";

.weather {
  &_container {
    width: 80%;
    padding: 20px;
    margin: 0 auto;
    @media @phone {
      width: 100%;
    }
  }
  &__search {
    width: 60%;
    position: relative;
    display: flex;
    margin: 0 auto 30px;
    @media @phone {
      width: 100%;
    }
    &Input {
      width: 100%;
      border: 0.5px solid #ccc;
      box-shadow: 3px 3px 4px #ccc;
      border-right: none;
      padding: 5px 10px;
      height: 20px;
      outline: none;
      color: #aaaaaa;
      height: 24px;
      font-size: 16px;
      &:focus {
        color: #2c3e50;
      }
    }
    &Btn {
      width: 40px;
      height: 36px;
      border: 0.5px solid #ccc;
      border-left: none;
      box-shadow: 3px 3px 4px #ccc;
      background: #fff;
      text-align: center;
      color: #fff;
      cursor: pointer;
      font-size: 18px;
      padding-top: 5px;
      padding-bottom: 5px;
      span {
        color: #aaaaaad4;
      }
    }
  }
}
</style>
