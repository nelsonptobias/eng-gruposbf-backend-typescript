import { Request, Response, NextFunction } from 'express';
import { valorProdutoNasMoeda } from '../logics/convert';
import { Moeda } from '../interfaces/moeda';
import { moedaProcessor } from '../processors/convert';
import { fetchCurrencyRates } from '../services/currency.api';
import CounterMetric from '../metrics/metrics';

 
const getConvert = async (req: Request, res: Response) => {
    const pais: string = req.params.id
    const valor: number = Number(req.params.value)
    try {
      // Metrica para o Prometheus
      CounterMetric.inc({ currency: pais });

      let apiCurrencyResposta = await fetchCurrencyRates()
      const moedasArray: Moeda = apiCurrencyResposta.rates
      const retornoApiProcessado = moedaProcessor(moedasArray, pais) 
      const valorDoProdutoEmTodasMoedas = valorProdutoNasMoeda(retornoApiProcessado, valor) 

      return res.status(200).json(valorDoProdutoEmTodasMoedas)   
    } catch (error) {
      if (error instanceof Error) {
          console.error('Erro:', error.message);
          return res.status(404).json({ error: error.message });
      } else {
        console.error('Erro desconhecido:', error);
        return res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
};

export default { getConvert};