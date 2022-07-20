import {filterTagParamName} from 'constants/dataGrid';
import {getOptions} from 'utils/dataGridUtils';

export const updateFilterParam = (value, updateURLParams) => {
  updateURLParams(value.map(v => v.id).toString(), filterTagParamName);
};

export const getFilterByQueryParams = (params, tags) => {
  const paramsArr = params.split(',').map(p => +p);
  const filteredTags = tags.filter(t => paramsArr.includes(t.id));
  return getOptions(filteredTags, 'id', 'name');
};
