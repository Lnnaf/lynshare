import moment from "moment"
export function formatDate (rawDate: Date) {
  return moment(rawDate).format('LL');
}