import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

const state = {
  currentWeather: {},
  forecastList: [],
  apiKey: "5fccd9095b0f55efa129c6ec9a717b04",
  apiUrl: "https://api.openweathermap.org/data/2.5"
}

const getters = {
  getCurrentWeather: state => {
    return state.currentWeather
  },
  getForecastList: state => {
    return state.forecastList
  }
}

const mutations = {
  setCurrentWeather(state, currentWeather) {
    state.currentWeather = currentWeather
  },
  setForecastList(state, forecastList) {
    state.forecastList = forecastList
  }
}

const actions = {
  async updateCurrentWeather({ commit }, data) {
    await axios
      .get(`${state.apiUrl}/weather?lat=${data.lat}&lon=${data.lon}&units=metric&APPID=${state.apiKey}`)
      .then(res => {
        commit("setCurrentWeather", res.data)
      })
      .catch(error => {
        commit("setCurrentWeather", {})
        console.error(error)
      })
  },
  updateForecastList({ commit }, data) {
    axios
      .get(`${state.apiUrl}/onecall?lat=${data.lat}&lon=${data.lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${state.apiKey}`)
      .then(res => {
        let list = res.data.daily.slice(1)
        commit("setForecastList", list)
      })
      .catch(error => {
        commit("setForecastList", [])
        console.error(error)
      })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
