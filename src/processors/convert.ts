import { Moeda } from "../interfaces/moeda";

const moedaProcessor = (rates: Moeda, nomeMoeda: string): Record<string, number> => {
    const baseValues: Record<string, number> = {};

    if (!(nomeMoeda.toUpperCase() in rates)) {
      throw new Error('Nome da moeda nao existe!')
    }

    Object.entries(rates).forEach(([currency, rate]) => {
      const tupla = parseFloat((rate / rates[nomeMoeda.toUpperCase()]).toFixed(2));
      baseValues[currency] = tupla
    });
    return baseValues
}

export {moedaProcessor}