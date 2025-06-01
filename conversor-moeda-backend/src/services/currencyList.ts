import axios from 'axios';

export async function getAvailableCurrencies() {
  const response = await axios.get('https://economia.awesomeapi.com.br/json/available');
  return Object.keys(response.data).map(pair => pair.split('-')[1]);
}