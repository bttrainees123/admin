export const dataset = [
  {
    noida: 10,
    pune: 20,
    gurugram: 50,
    day: 'Sun',
  },
  {
    noida: 20,
    pune: 30,
    gurugram: 60,
    day: 'Mon',
  },
  {
    noida: 30,
    pune: 40,
    gurugram: 70,
    day: 'Tue',
  },
  {
    noida: 40,
    pune: 50,
    gurugram: 80,
    day: 'Wed',
  },
  {
    noida: 50,
    pune: 60,
    gurugram: 90,
    day: 'Thu',
  },
  {
    noida: 60,
    pune: 70,
    gurugram: 100,
    day: 'Fri',
  },
  {
    noida: 70,
    pune: 80,
    gurugram: 110,
    day: 'sat',
  },

];

export function valueFormatter(value) {
  return `${value}mm`;
}