export const moneyFormat = (number: number) => {
  const convert = new Intl.NumberFormat("pt-AO");
  return convert.format(number);
};
