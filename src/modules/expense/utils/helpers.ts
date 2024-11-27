export const moneyMask = (value: string): string => {
  if (!value) return "R$ 0,00";

  const isDecimal = Number(value) % 1 != 0

  const numericValue = value.replace(/\D/g, "");

  if (!numericValue) return "R$ 0,00";  

  const numberValue = isDecimal ? parseInt(numericValue, 10) / 100 : parseInt(numericValue, 10);

  console.log(numberValue)

  const formattedValue = numberValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return "R$ " + formattedValue;
};
