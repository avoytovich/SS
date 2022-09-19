import {filterGroupParamName} from 'constants/dataGrid';
import {getOptions} from 'utils/dataGridUtils';

export const updateFilterParam = (value, updateURLParams) => {
  updateURLParams(value.map(v => v.id).toString(), filterGroupParamName);
};

export const getFilterByQueryParams = (params, groups) => {
  const paramsArr = params.split(',').map(p => +p);
  const filteredGroups = groups.filter(t => paramsArr.includes(t.id));
  return getOptions(filteredGroups, 'id', 'name');
};
