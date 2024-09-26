// Maybe i'll use it later

// has utilities related to money
export function formatCurrency(priceCents){
  // using round function because for some values it gives wrong values
  return (Math.round(priceCents) / 100).toFixed(2);
}