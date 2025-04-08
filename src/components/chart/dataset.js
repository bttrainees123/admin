export const dataset = [
  {
    noida: 10,
    pune: 20,
    gurugram: 50,
    day: 'Sun',
  },
  {
    noida: Math.floor(Math.random() * 120),
    pune: Math.floor(Math.random() * 120),
    gurugram: Math.floor(Math.random() * 120),
    day: 'Mon',
  },
  {
    noida: Math.floor(Math.random() * 120),
    pune: Math.floor(Math.random() * 120),
    newYork: Math.floor(Math.random() * 120),
    day: 'Tue',
  },
  {
    noida: Math.floor(Math.random() * 120),
    pune: Math.floor(Math.random() * 120),
    gurugram: Math.floor(Math.random() * 120),
    day: 'Wed',
  },
  {
    noida: Math.floor(Math.random() * 120),
    pune: Math.floor(Math.random() * 120),
    newYork: Math.floor(Math.random() * 120),
    day: 'Thu',
  },
  {
    noida: Math.floor(Math.random() * 120),
    pune: Math.floor(Math.random() * 120),
    gurugram: Math.floor(Math.random() * 120),
    day: 'Fri',
  },
  {
    noida: Math.floor(Math.random() * 120),
    pune: Math.floor(Math.random() * 120),
    gurugram: Math.floor(Math.random() * 120),
    day: 'sat',
  },

];

export function valueFormatter(value) {
  return `${value}mm`;
}