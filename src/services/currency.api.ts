import axios from 'axios';

const apiUrl = process.env.API_URL ? process.env.API_URL : ''
const apiKey = process.env.API_KEY ? process.env.API_KEY : ''

const fetchCurrencyRates = async (): Promise<any> => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        access_key: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer requisição à API:', error);
    throw new Error('Falha ao obter as taxas de câmbio.');
  }
};

export { fetchCurrencyRates };