import axios from 'axios';

const fetcher = axios.create({
  baseURL: 'https://1miudhz7a9.execute-api.us-east-1.amazonaws.com/dev/forecast'
});

export default (latitude, longitude) => date => {
  const url = `/${latitude},${longitude},${date.unix()}`;
  return fetcher.get(url);
};
