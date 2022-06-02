/**
 * Function that implement extended sort method
 * @param a
 * @param b
 * @param orderBy
 * @returns {number}
 */

import {employeeSkillLevels} from '../constants/common';

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
  return (a || '').localeCompare(b, 'en', {numeric: true, sensitivity: 'accent'});
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
  if (Array.isArray(order)) {
    return (a, b) => {
      for (let i = 0; i < orderBy.length; i += 1) {
        const r = descendingComparator(a, b, orderBy[i]) * (order[i] === DESC ? 1 : -1);
        if (r !== 0) {
          return r;
        }
      }
      return 0;
    };
  }
  return order === DESC
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function getStringFieldComparator(order, orderBy) {
  return order === DESC
    ? (a, b) => stringFieldComparator(b, a, orderBy)
    : (a, b) => stringFieldComparator(a, b, orderBy);
}

export function decodeQueryParam(p) {
  return decodeURIComponent(p.replace(/\+/g, ' '));
}

export function yesNo(value) {
  if (value == null) {
    return 'N/A';
  }
  return value ? 'Yes' : 'No';
}

export function stringToColor(string = '') {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const transformLevelForSort = item => {
  item.level = employeeSkillLevels.get(item.level);
  return item;
};

export function getValueByKeyFromMap(map, searchValue) {
  return [...map].find(([, val]) => val === searchValue)[0];
}
