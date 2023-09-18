const valorProdutoNasMoeda =  (moedasNoValorDaBase: Record<string, number>, valorPorduto: number ) :  Record<string, string> => {
    const translatedValues: Record<string, string> = {};
  
    Object.entries(moedasNoValorDaBase).forEach(([key, value]) => {
      translatedValues[key] = (value * valorPorduto).toFixed(2);
    });
  
    return translatedValues;
}

export { valorProdutoNasMoeda }