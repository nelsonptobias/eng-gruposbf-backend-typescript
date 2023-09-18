import { moedaProcessor } from './convert'; 
import { Moeda } from '../interfaces/moeda';

describe('moedaProcessor', () => {
  const mockRates: Moeda = {
    'USD': 1.2,
    'EUR': 0.9,
    'GBP': 0.8,
  };

  it('deve processar as moedas corretamente', () => {
    const resultado = moedaProcessor(mockRates, 'USD');
    expect(resultado).toEqual({
      'USD': 1.00,
      'EUR': 0.75,
      'GBP': 0.67,
    });
  });

  it('deve lançar um erro para uma moeda inexistente', () => {
    expect(() => {
      moedaProcessor(mockRates, 'JPY');
    }).toThrowError('Nome da moeda nao existe!');
  });
});
