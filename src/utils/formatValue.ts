const formatValue = (value: number): string =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value); // Formata no frontend, ex: R$ 17.400,00

export default formatValue;
