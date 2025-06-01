// src/services/currencyService.ts
import axios from 'axios';

// Função existente (mantenha)
export async function convertCurrency(from: string, to: string, amount: number) {
  // ... implementação atual que você já tem
}

// Adicione esta nova função
export async function getAvailableCurrencies() {
  try {
    const response = await axios.get('https://economia.awesomeapi.com.br/json/available');
    const pairs = Object.keys(response.data);
    const currencies = new Set<string>();
    
    pairs.forEach(pair => {
      const [from, to] = pair.split('-');
      currencies.add(from);
      currencies.add(to);
    });

    return Array.from(currencies).sort();
  } catch (error) {
    console.error('Erro ao obter moedas:', error);
    throw new Error('Falha ao carregar moedas disponíveis');
  }
}