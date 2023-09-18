import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { valorProdutoNasMoeda } from '../logics/convert';
import { Moeda } from '../interfaces/moeda';
import { moedaProcessor } from '../processors/convert';
import { BALANCA_MOEDAS } from '../constants/balanco';


 
const getConvert = async (req: Request, res: Response, next: NextFunction) => {
    const pais: string = req.params.id
    const valor: number = Number(req.params.value)

    //TODO: aqui vai ser o cache, pensar em uma forma dinamica que possa escalar
    const moedasArray: Moeda = BALANCA_MOEDAS
   
    try {
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
    
    // let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    // let posts: [Post] = result.data;
    // return res.status(200).json({
    //     message: posts
    // });
};


export default { getConvert};