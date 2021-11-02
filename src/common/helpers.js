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
  return (a || '').localeCompare(b, 'en', { numeric: true, sensitivity: 'accent' });
}

function descendingLocaleComparator(a, b, orderBy) {
  return a[orderBy].localeCompare(b[orderBy], 'en', { numeric: true, sensitivity: 'accent' });
}

function stringFieldComparator(a, b, orderBy) {
  const A = (a[orderBy] || '').toUpperCase();
  const B = (b[orderBy] || '').toUpperCase();

  let comparison = 0;
  if (A > B) {
    comparison = 1;
  } else if (A < B) {
    comparison = -1;
  }
  return comparison;
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
    ? (a, b) => descendingLocaleComparator(b, a, orderBy)
    : (a, b) => descendingLocaleComparator(a, b, orderBy);
}

export function getStringFieldComparator(order, orderBy) {
  return order === DESC
    ? (a, b) => stringFieldComparator(b, a, orderBy)
    : (a, b) => stringFieldComparator(a, b, orderBy);
}

export function decodeQueryParam(p) {
  return decodeURIComponent(p.replace(/\+/g, ' '));
}
