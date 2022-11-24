/**
 * Функция принимает дату - timestamp, обрезает её до ГГГГ.ММ.ДД
 * и приводит к виду: 1 Января 2022 и возвращает строкой
 */

import { SlowBuffer } from 'buffer';

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

export function countAndFormatMonth(dbDate: string | undefined) {
  if (dbDate) {
    const currentDate = new Date();

    dbDate = dbDate.slice(0, 10);
    let arrDate: string[] = dbDate.split('-');

    const month =
      (Number(arrDate[0]) - Number(currentDate.getFullYear())) * 12 +
      (Number(currentDate.getMonth() + 1) - Number(arrDate[1]));

    if (month !== 0) {
      if (month % 10 === 1) {
        return month + ' месяц';
      } else {
        if (month % 10 === 2 || month % 10 === 3 || month % 10 === 4) {
          return month + ' месяца';
        } else {
          return month + ' месяцев';
        }
      }
    } else {
      const day = Number(currentDate.getDate()) - Number(arrDate[2]);

      return day + ' дней';
    }
  }
}

export function dbFormatChatDate(dbDate: string | undefined, month: object) {
  if (dbDate) {
    let date: string | string[] = dbDate.slice(5, 10);
    let time: string | any[] = dbDate.slice(11, 16);
    date = date.split('-');
    time = time.split(':');
    date[1][0] === '0' && (date[2] = date[2][1]);
    date[0] = month[date[0] as keyof object];
    time[0] = Number(time[0]) - (new Date().getTimezoneOffset() + 180) / 60;
    date = date.reverse();
    return `${date.join(' ')} ${time[0]}:${time[1]}`;
  } else {
    return '';
  }
}
