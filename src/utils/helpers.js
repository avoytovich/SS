export function yesNo(value) {
  if (value == null) {
    return 'N/A';
  }
  return value ? 'Yes' : 'No';
}

export const capitalizeFirstLetter = str => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '');

export const filterObjectArray = (arr, filterArr, filterParam = 'id') =>
  arr?.filter(el => filterArr.every(fa => fa[filterParam] !== el[filterParam]));

/**
 *Convert Arrays on the objects to array of the Ids
 * Input: [{id: 1, name: "name"}]
 * Output: [1]
 */
export const ArrayObjsToArrayIds = array => {
  const ids = [];

  array.forEach(item => {
    ids.push(item.id);
  });

  return ids;
};
