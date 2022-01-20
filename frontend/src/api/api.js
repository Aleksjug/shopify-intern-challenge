import axios from "axios";

const url = 'http://localhost:8080';

axios.defaults.baseURL = `${url}/api`;

const api = {
    getAllInventory() {
      return axios.get(`${axios.defaults.baseURL}/inventory`);
    },
  
    postNewInventoryItem(preferences) {
        return axios.post(`${axios.defaults.baseURL}/inventory`, preferences);
    },
  
    postUpdateInventoryItem(id, params) {
      return axios.put(`${axios.defaults.baseURL}/inventory/${id}`, params);
    },

    deleteInventoryItem(id) {
        return axios.delete(`${axios.defaults.baseURL}/inventory/${id}`)
    },

    getFormattedCSV() {
      return axios.get(`${axios.defaults.baseURL}/exportcsv`)
    }
  };
  
  export default api;