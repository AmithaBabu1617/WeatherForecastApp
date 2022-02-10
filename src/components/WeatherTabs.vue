<template>
  <div>
    <div :class="$style.tabs">
      <ul>
        <li v-for="tab in tabs" :key="tab.title" @click="setActiveTab(tab.id)" :class="{ [$style.active]: activeTab === tab.id }">
          {{ tab.title }}
        </li>
      </ul>
    </div>
    <div class="tabs-content" v-for="tab in tabs" :key="tab.title">
      <weather-tab-content :tab-type="activeTab" v-if="activeTab === tab.id" @showWeatherModal="showWeatherModal" />
    </div>
    <weather-detailed-modal v-if="isModalVisible" @close="closeModal" class="weather__modal">
      <p :class="$style.description">
        <img src="../assets/sunrise.png" width="55px" />
        Sunrises on {{ sunriseTime }}
      </p>
      <p :class="$style.description">
        <img src="../assets/sunset.png" width="50px" />
        SunSets on {{ sunsetTime }}
      </p>
    </weather-detailed-modal>
  </div>
</template>
<script>
import WeatherTabContent from "./WeatherTabContent"
import weatherDetailedModal from "./weatherDawnDetailModal.vue"
import { mapState } from "vuex"

export default {
  data() {
    return {
      activeTab: "currentWeatherTab",
      isModalVisible: false,
      tabs: [
        {
          id: "currentWeatherTab",
          title: "Current",
          isActive: true
        },
        {
          id: "forecastTab",
          title: "7 day forecast",
          isActive: false
        }
      ]
    }
  },
  components: {
    WeatherTabContent,
    weatherDetailedModal
  },
  computed: {
    ...mapState({
      weather: "currentWeather"
    }),
    sunriseTime() {
      return new Date(this.weather.sys.sunrise).toLocaleTimeString()
    },
    sunsetTime() {
      return new Date(this.weather.sys.sunset).toLocaleTimeString()
    }
  },
  methods: {
    closeModal() {
      this.isModalVisible = false
    },
    showWeatherModal(data) {
      this.isModalVisible = data
    },
    setActiveTab(tab) {
      this.activeTab = tab
    }
  }
}
</script>
<style lang="less" module>
.tabs ul {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  li {
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
.description {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 10px;
  }
}
</style>
