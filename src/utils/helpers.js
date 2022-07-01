export function simpleLocaleComparator(a, b) {
  return (a || '').localeCompare(b, 'en', {numeric: true, sensitivity: 'accent'});
}

export function yesNo(value) {
  if (value == null) {
    return 'N/A';
  }
  return value ? 'Yes' : 'No';
}

export const capitalizeFirstLetter = str => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '');
