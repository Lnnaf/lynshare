import moment from "moment";

export function formatDate(rawDate: Date) {
  return moment(rawDate).format("LL");
}

export function isEnoughDaysPassed(date: Date, days?: number): boolean {
  if (!days) {
    days = 30
  }
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const daysInMilliseconds = days * millisecondsInADay;
  return Date.now() - new Date(date).getTime() > daysInMilliseconds;
}
