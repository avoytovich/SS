/**
 * Function that implement extended sort method
 * @param a
 * @param b
 * @param orderBy
 * @returns {number}
 */

export const ASC = 'asc';
export const DESC = 'desc';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function simpleLocaleComparator(a, b) {
  return a.localeCompare(b, 'en', { numeric: true, sensitivity: 'accent' });
}

function descendingLocaleComparator(a, b, orderBy) {
  return a[orderBy].localeCompare(b[orderBy], 'en', { numeric: true, sensitivity: 'accent' });
}

/**
 * Define direction of sorting
 * @param order
 * @param orderBy
 * @returns {{(*=, *=): number, (*=, *=): number}}
 */
export function getComparator(order, orderBy) {
  return order === DESC
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function getLocaleComparator(order, orderBy) {
  return order === DESC
    ? (a, b) => descendingLocaleComparator(a, b, orderBy)
    : (a, b) => descendingLocaleComparator(b, a, orderBy);
}

export function decodeQueryParam(p) {
  return decodeURIComponent(p.replace(/\+/g, ' '));
}
