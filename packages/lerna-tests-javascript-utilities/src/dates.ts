export enum Weekdays {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

export interface Range {
  start: Date;
  end: Date;
}

export type Year = number;

export function getYearForRange({start, end}: Range) {
  if (start) {
    return start.getFullYear();
  }
  if (end) {
    return end.getFullYear();
  }
  return new Date().getFullYear();
}

export function getMonthForRange({start, end}: Range): Months {
  if (start) {
    return start.getMonth();
  }
  if (end) {
    return end.getMonth();
  }
  return new Date().getMonth();
}

export function abbreviationForWeekday(weekday: Weekdays) {
  return Weekdays[weekday].substring(0, 2);
}

export type Week = (Date | null)[];

const WEEK_LENGTH = 7;

export function getWeeksForMonth(month: Months, year: Year): Week[] {
  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay();
  const weeks: Week[] = [[]];

  let currentWeek = weeks[0];
  let currentDate = firstOfMonth;

  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  while (currentDate.getMonth() === month) {
    if (currentWeek.length === WEEK_LENGTH) {
      currentWeek = [];
      weeks.push(currentWeek);
    }

    currentWeek.push(currentDate);
    currentDate = new Date(year, month, currentDate.getDate() + 1);
  }

  while (currentWeek.length < 7) {
    currentWeek.push(null);
  }

  return weeks;
}

export function dateIsInRange(day: Date | null, range: Range) {
  if (day == null) {
    return false;
  }

  const {start, end} = range;

  return Boolean(start && day > start && (end && day < end));
}

export function dateIsSelected(day: Date | null, range: Range) {
  if (day == null) {
    return false;
  }
  const {start, end} = range;

  return Boolean(
    (start && isSameDay(start, day)) || (end && isSameDay(end, day)),
  );
}

export function isSameDay(day1: Date, day2: Date) {
  return (
    day1.getDate() === day2.getDate() &&
    day1.getMonth() === day2.getMonth() &&
    day1.getFullYear() === day2.getFullYear()
  );
}

export function getNewRange(range: Range | undefined, selected: Date): Range {
  if (range == null) {
    return {start: selected, end: selected};
  }

  const {start, end} = range;

  if (end && start !== end) {
    return {start: selected, end: selected};
  }

  if (start) {
    if (selected < start) {
      return {start: selected, end: selected};
    }
    return {start, end: selected};
  }

  if (end) {
    if (selected < end) {
      return {start: selected, end};
    }
    return {start: start || end, end: selected};
  }

  return {start: selected, end: selected};
}

export function getNextDisplayMonth(month: Months): Months {
  if (Months[month] === Months[11]) {
    return 0;
  }
  return (month as number) + 1;
}

export function getNextDisplayYear(month: Months, year: Year): Year {
  if (Months[month] === Months[11]) {
    return year + 1;
  }
  return year;
}

export function getPreviousDisplayMonth(month: Months): Months {
  if (Months[month] === Months[0]) {
    return 11;
  }
  return (month as number) - 1;
}

export function getPreviousDisplayYear(month: Months, year: Year): Year {
  if (Months[month] === Months[0]) {
    return year - 1;
  }
  return year;
}

export function isDateAfter(date: Date, dateToCompare: Date) {
  return date.getTime() > dateToCompare.getTime();
}

export function isDateBefore(date: Date, dateToCompare: Date) {
  return date.getTime() < dateToCompare.getTime();
}
