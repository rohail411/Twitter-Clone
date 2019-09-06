
import axios from "axios";

const instance = axios.create({
  baseURL: "https://asia-east2-socialapp-d8c8c.cloudfunctions.net/api",
  headers: {'X-Requested-With': 'XMLHttpRequest'}
});

export default instance;
