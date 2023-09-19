import axios from 'axios';
import { client } from '../server';

const apiUrl = process.env.API_URL ? process.env.API_URL : ''
const apiKey = process.env.API_KEY ? process.env.API_KEY : ''

const fetchCurrencyRates = async (): Promise<any> => {

  // Chave única para este tipo de dados no cache
  const cacheKey = 'currency_rates_' + process.env.NODE_ENV;

  // Verifique se os dados estão no cache
  const cachedData = await client.get(cacheKey);

  if (cachedData) {
    // Se os dados estão no cache, retorne-os
    console.log('Dados obtidos do cache.');
    return JSON.parse(cachedData) ;
  }

  // Se os dados não estão no cache, faça a chamada à API
  console.log('Dados não encontrados no cache. Buscando da API...');

  try {
    const response = await axios.get(apiUrl, {
      params: {
        access_key: apiKey,
      },
    });
    await client.setex(cacheKey, 86400, JSON.stringify(response.data))
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer requisição à API:', error);
    throw new Error('Falha ao obter as taxas de câmbio.');
  }
};

export { fetchCurrencyRates };