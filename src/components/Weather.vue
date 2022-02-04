<template>
  <div class="weather_container">
    <div class="weather__search">
      <input v-model="place" type="text" class="weather__search-input" placeholder="Enter city..." @keypress.enter="fetchWeather" />
      <button type="button" class="weather__search-btn" @click="fetchWeather()">
        <span class="material-icons material-icons-outlined">search</span>
      </button>
    </div>
    <div class="weather__tabs" id="weather__tabs">
      <a @click="activetab = '1'" :class="[activetab === '1' ? 'active' : '']">Current</a>
      <a @click="activetab = '2'" :class="[activetab === '2' ? 'active' : '']">7 day forecast</a>
    </div>
    <div class="content">
      <div v-if="activetab === '1'" class="weather__tab-content">
        <div v-if="typeof weather.main != 'undefined'">
          <div class="weather_details" @click="showModal = true">{{ weather.name }}</div>
          <p>{{ weather.sys.country }}</p>
          <div class="icon">
            <img :src="`${weather_icon}${weather.weather[0].icon}${'.png'}`" />
          </div>
          <p>{{ Math.round(weather.main.temp) }}°c</p>
          <p>{{ weather.weather[0].main }}</p>
        </div>
        <div v-else>
          <h4>City Not Found</h4>
        </div>
      </div>
      <div v-if="activetab === '2'" class="weather__tab-content">
        <div v-if="forecast && Object.keys(forecast).length > 0">
          <p>{{ forecast.city ? forecast.city.name : "" }}</p>
          <p>{{ forecast.city ? forecast.city.country : "" }}</p>
          <ul class="weather__forecast_list">
            <li v-for="temp of forecast.list" :key="`weather_${temp.dt_txt}`">
              <div class="icon">
                <img :src="`${weather_icon}${temp.weather[0].icon}${'.png'}`" />
              </div>
              <p>Average Temp: <br />{{ Math.round(temp.main.temp) }}°c</p>
              <p>{{ temp.weather[0].description }}</p>
              <p>{{ temp.dt_txt.split(" ")[0] }}</p>
            </li>
          </ul>
        </div>
        <div v-else>
          <h4>City Not Found</h4>
        </div>
      </div>
    </div>
    <Modal v-if="showModal" @close="closeModal">
      <h5>Sunrises on :{{ new Date(weather.sys.sunrise).toLocaleTimeString() }}</h5>
      <h5>SunSets on :{{ new Date(weather.sys.sunset).toLocaleTimeString() }}</h5>
    </Modal>
  </div>
</template>
<script>
import axios from "axios"
import Modal from "./weatherDawnDetailModal.vue"

export default {
  data() {
    return {
      activetab: "1",
      apiUrl: "https://api.openweathermap.org/data/2.5/",
      place: "",
      weather: {},
      weather_icon: "http://openweathermap.org/img/wn/",
      forecast: {},
      showModal: false
    }
  },
  components: {
    Modal
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
    async fetchWeather() {
      if (this.place.length > 1) {
        this.fetchCurrentWeather()
        this.fetchSevenDaysWeather()
      }
    },
    async fetchCurrentWeather() {
      await axios
        .get(`${this.apiUrl}weather?q=${this.place}&units=metric&APPID=27bcc252742830381afd6856832da01a`)
        .then(res => {
          this.weather = res.data
        })
        .catch(error => {
          console.log(error.response)
          this.weather = {}
        })
    },
    async fetchSevenDaysWeather() {
      await axios
        .get(
          `${this.apiUrl}forecast?q=${this.place}&cnt=7&units=metric&exclude=current,minutely,hourly,alerts&appid=27bcc252742830381afd6856832da01a`
        )
        .then(res => {
          this.forecast = res.data
        })
        .catch(error => {
          console.log(error.response)
          this.forecast = {}
        })
    }
  }
}
</script>
<style scoped lang="less">
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
  &__forecast_list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: center;
    li {
      padding: 10px;
    }
  }
  &__tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      cursor: pointer;
      padding: 12px 24px;
      transition: background-color 0.2s;
      border-right: none;
      background-color: #ffffff;
      font-size: 14px;
      text-transform: uppercase;
      width: 180px;
      &:hover {
        background-color: #aaa;
        color: #fff;
      }
      &.active {
        background-color: #f1f1f1;
        color: #484848;
        border-bottom: 4px solid #2196f3;
        cursor: default;
      }
    }
  }

  &__tab-content {
    padding: 10px 20px;
  }
  &__search {
    width: 60%;
    position: relative;
    display: flex;
    margin: 0 auto 30px;
    @media @phone {
      width: 100%;
    }
    &-input {
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
    &-btn {
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
