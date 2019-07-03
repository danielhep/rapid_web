import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { DateTime } from 'luxon'
import Qs from 'querystring'

Vue.use(Vuex)

let apiURL = process.env.VUE_APP_API_URL

export default new Vuex.Store({
  state: {
    stops: [],
    routes: [],
    departures: [],
    agencies: [],
    currentAgency: {}
  },
  mutations: {
    setStops (state, stops) {
      state.stops = stops
    },
    setRoutes (state, routes) {
      state.routes = routes
    },
    setDepartures (state, departures) {
      state.departures = departures
    },
    setAgencies (state, agencies) {
      state.agencies = agencies
    },
    setCurrentAgency (state, agency) {
      state.currentAgency = agency
    }
  },
  actions: {
    async getStops ({ commit }) {
      let res = await Axios.get(`${apiURL}/stops`)
      commit('setStops', res.data)
    },
    async getAgencies ({ commit }) {
      let res = await Axios.get(`${apiURL}/agencies`)
      commit('setAgencies', res.data)
    },
    async getRoutes ({ commit }) {
      let res = await Axios.get(`${apiURL}/routes`)
      commit('setRoutes', res.data)
    },
    async getDepartures ({ commit }, { routes, date, stop }) {
      console.log({
        routes, date, stop
      })
      let res = await Axios.get(`${apiURL}/schedule`, {
        params: {
          routes, date, stop
        },
        paramsSerializer: function (params) {
          return Qs.stringify(params)
        }
      })
      res.data.forEach((departure, ind) => {
        res.data[ind]['datetime'] = DateTime.fromISO(departure.time)
        res.data[ind]['time'] = res.data[ind]['datetime'].toLocaleString(DateTime.TIME_SIMPLE)
        res.data[ind]['spacing'] = Math.round(10 * (departure.spacing) / 60) / 10 // spacing is in seconds, change to minutes
        res.data[ind]['hourAlternate'] = res.data[ind]['datetime'].hour % 2
        res.data[ind]['frequentService'] = res.data[ind]['spacing'] < 16
      })
      commit('setDepartures', res.data)
    }
  }
})
