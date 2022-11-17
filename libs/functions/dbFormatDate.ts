/**
 * Функция принимает дату - timestamp, обрезает её до ГГГГ.ММ.ДД
 * и приводит к виду: 1 Января 2022 и возвращает строкой
 */

export function dbFormatDate(dbDate: string | undefined, month: object) {
  if (dbDate) {
    dbDate = dbDate.slice(0, 10);
    let date: string[] = dbDate.split('-');
    date[2][0] === '0' && (date[2] = date[2][1]);
    date[1] = month[date[1] as keyof object];
    date = date.reverse();
    return date.join(' ');
  } else {
    return '';
  }
}

export const month = {
  '01': 'Января',
  '02': 'Февраля',
  '03': 'Марта',
  '04': 'Апреля',
  '05': 'Мая',
  '06': 'Июня',
  '07': 'Июля',
  '08': 'Августа',
  '09': 'Сентября',
  '10': 'Октября',
  '11': 'Ноября',
  '12': 'Декабря',
};
