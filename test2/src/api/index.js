import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);

// axios.defaults.baseURL = "http://127.0.0.1:8000/"; // 后端接口的地址
const API_ROOT = ''; //后端接口的地址
const TEST_ROOT = '/api';


const APIS = {
  API_ROOT,
};

export default APIS;
