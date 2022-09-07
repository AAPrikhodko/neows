import axios from "axios";

const API_URL = "https://neowsapp.com"
axios.defaults.baseURL = API_URL

export const ObjectsService = {
    async getTodayObjects(){
        return axios.get('/rest/v1/feed/today')
    },

    async getObjectsByDates(dateFrom: string, dateTo: string) {
        return axios.get(`/rest/v1/feed?start_date=${dateFrom}&end_date=${dateTo}`)
    },

    async browseObjects(page: number, size: number) {
        return axios.get(`/rest/v1/neo/browse?page=${page}&size=${size}`)
    }
}