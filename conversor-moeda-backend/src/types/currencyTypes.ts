import { ParsedQs } from 'qs';

export interface CurrencyConversionRequest extends ParsedQs {
    from?: string;
    to: string;
    amount: string;
}

export interface CurrencyConversionRequest {
    from?: string;
    to: string;
    amount: string;
}

export interface CurrencyConversionResult {
    moeda_origem: string;
    moeda_destino: string;
    cotacao: number;
    valor_original: number;
    valor_convertido: number;
}

export interface AvailableCurrenciesResponse {
    success: boolean;
    data?: {
        available_currencies: string[];
    };
    error?: string;
}