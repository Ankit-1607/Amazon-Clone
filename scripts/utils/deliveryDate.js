export function getDeliveryDate(days) {
  const today = new Date();
  today.setDate(today.getDate() + days);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayName = daysOfWeek[today.getDay()];
  const monthName = months[today.getMonth()];
  const date = today.getDate();
  const year = today.getFullYear();

  return `${dayName} - ${monthName} ${date}, ${year}`;
}