// src/services/awesomeApiService.ts
import axios from 'axios';

const BASE_URL = 'https://economia.awesomeapi.com.br';

/**
 * Retorna a lista de todas as moedas disponíveis (retorno bruto da API).
 * Ex.: GET https://economia.awesomeapi.com.br/json/available
 */
export async function listarMoedasDisponiveis(): Promise<Record<string, string>> {
  const url = `${BASE_URL}/json/available`;
  const response = await axios.get<Record<string, string>>(url);
  return response.data;
}

/**
 * Retorna as informações de cotação para um ou vários pares de moeda.
 * O parâmetro `par` deve ser algo como "USD-BRL" ou "EUR-BRL" etc.
 * A AwesomeAPI devolve um objeto em que a chave é "USDBRL" ou "EURBRL", por exemplo.
 * Ex.: GET https://economia.awesomeapi.com.br/json/last/USD-BRL
 */
export async function obterCotacao(par: string): Promise<any> {
  // Exige que o par seja no formato "USD-BRL" (upper case) ou similar
  const url = `${BASE_URL}/json/last/${par}`;
  const response = await axios.get<any>(url);
  return response.data;
}
