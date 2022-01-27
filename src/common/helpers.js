/**
 * Function that implement extended sort method
 * @param a
 * @param b
 * @param orderBy
 * @returns {number}
 */

import { employeeSkillLevels } from './constants';

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
  if (Array.isArray(order)) {
    return (a, b) => {
      for (let i = 0; i < orderBy.length; i += 1) {
        const r = descendingComparator(a, b, orderBy[i]) * (order[i] === 'DESC' ? 1 : -1);
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

// export const transformSkillGroupsToArray = skillGroups => {
//   let skills = [];

//   const pushSkillToArray = s => {
//     Object.entries(s).forEach(([key, value]) => {
//       skills.push({ name: key, level: value });
//     });
//   };

//   skillGroups
//     .map(({ Skills }) => [...Skills])
//     .flat()
//     .forEach(i => {
//       pushSkillToArray(i);
//     });

//   skills = skills
//     .map(item => transformLevelForSort(item))
//     .sort(getComparator('desc', 'level'))
//     .map((item, index) => {
//       item.key = index;
//       item.level = getValueByKeyFromMap(employeeSkillLevels, item.level);
//       return item;
//     });

//   return skills;
// };

export const getSkillsFromCurrentData = data => {
  const skills = new Set();
  data.forEach(employee => employee.Skills.forEach(skill => skills.add(Object.keys(skill)[0])));
  return [...skills.values()];
};
