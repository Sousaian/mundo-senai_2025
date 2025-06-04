import { Request, Response } from 'express';
import { convertCurrency, getAvailableCurrencies } from '../services/currencyService';
import { CurrencyConversionRequest } from '../types/currencyTypes';

export class CurrencyController {
    /**
     * Converte valores entre moedas
     */
    async convert(req: Request, res: Response) {
        const { from = 'BRL', to, amount } = req.query as CurrencyConversionRequest;

        try {
            // Validações
            if (!to || !amount) {
                return res.status(400).json({ 
                    success: false,
                    error: 'Parâmetros "to" e "amount" são obrigatórios.' 
                });
            }

            if (isNaN(Number(amount)) || Number(amount) <= 0) {
                return res.status(400).json({ 
                    success: false,
                    error: '"amount" deve ser um número positivo.' 
                });
            }

            // Conversão
            const resultado = await convertCurrency(
                from.toUpperCase(),
                to.toUpperCase(),
                parseFloat(amount.toString())
            );

            return res.json({
                success: true,
                data: resultado
            });

        } catch (error: any) {
            console.error('Erro no controller:', error);
            
            return res.status(500).json({ 
                success: false,
                error: error.message || 'Erro interno no servidor' 
            });
        }
    }

    /**
     * Lista moedas disponíveis para conversão
     */
    async listCurrencies(req: Request, res: Response) {
        try {
            const moedas = await getAvailableCurrencies();
            
            return res.json({
                success: true,
                data: {
                    available_currencies: moedas
                }
            });
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: 'Falha ao obter lista de moedas'
            });
        }
    }
}