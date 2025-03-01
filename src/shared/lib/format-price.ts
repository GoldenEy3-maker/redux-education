export function formatPrice(price: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
    ...options,
  }).format(price);
}
