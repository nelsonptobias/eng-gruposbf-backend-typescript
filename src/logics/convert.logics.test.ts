import { valorProdutoNasMoeda } from "./convert";

describe('valorProdutoNasMoeda', () => {
  it('deve calcular o valor do produto em várias moedas', () => {
    const moedasNoValorDaBase = {
      'USD': 1.2,
      'EUR': 0.9,
    };
    const valorProduto = 100;
    const resultado = valorProdutoNasMoeda(moedasNoValorDaBase, valorProduto);

    expect(resultado).toEqual({
      'USD': '120.00',
      'EUR': '90.00',
    });
  });
});
