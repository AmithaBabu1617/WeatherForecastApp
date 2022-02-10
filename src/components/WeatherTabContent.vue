<template>
  <div class="tabs-details">
    <div v-if="tabType === 'currentWeatherTab'">
      <div v-if="weather.main">
        <div :class="$style.cursorPointer" @click="$emit('showWeatherModal', true)">
          {{ cityName }}
        </div>
        <p>{{ countryName }}</p>
        <div class="icon">
          <img :src="currentWeatherIcon" />
        </div>
        <p>{{ Math.round(weather.main.temp) }}°c</p>
        <p>{{ weather.weather[0].main }}</p>
      </div>
    </div>
    <div v-if="tabType === 'forecastTab'">
      <div v-if="forecastList.length">
        <p>{{ cityName }}</p>
        <p>{{ countryName }}</p>
        <ul :class="$style.tab__forecast_list">
          <li v-for="item in forecastList" :key="`weather_${item.dt}`">
            <div class="icon">
              <img :src="`${weather_icon}${item.weather[0].icon}${'.png'}`" />
            </div>
            <p>Average Temp: <br />{{ Math.round(item.temp.day.toFixed(0)) }}°c</p>
            <p>{{ item.weather[0].description }}</p>
            <p>{{ new Date(item.dt * 1000).toLocaleString() }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
      weather_icon: "http://openweathermap.org/img/wn/"
    }
  },
  props: {
    tabType: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapState({
      weather: "currentWeather",
      forecastList: "forecastList"
    }),
    cityName() {
      return this.weather.name
    },
    countryName() {
      let regionNames = new Intl.DisplayNames(["en"], { type: "region" })
      return regionNames.of(this.weather.sys.country)
    },
    currentWeatherIcon() {
      return `${this.weather_icon}${this.weather.weather[0].icon}${".png"}`
    }
  }
}
</script>
<style lang="less" module>
.cursorPointer {
  cursor: pointer;
}
.tab {
  &__forecast_list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: center;
    padding-left: 0px;
    li {
      padding: 10px;
    }
  }
}
</style>
