export const currencyFormatter = (value: number) => {
  return new Intl.NumberFormat("de", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};
