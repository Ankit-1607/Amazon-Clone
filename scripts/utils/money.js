// Maybe i'll use it later

// has utilities related to money
export function formatCurrency(priceCents){
  return (Math.round(priceCents) / 100).toFixed(2);
}