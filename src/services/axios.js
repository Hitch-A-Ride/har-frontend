import axios from 'axios';

let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://localhost:5000';
} else {
  baseURL = 'http://localhost:5000';
}

const instance = axios.create({
  baseURL
});

export default instance;
