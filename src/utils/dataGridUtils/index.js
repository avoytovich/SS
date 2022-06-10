import {ASC, DESC} from 'constants/dataGrid';

export const setURLSearchParams = (prevParams, value, paramName) => {
  if (value) {
    prevParams.set(paramName, value);
  } else {
    prevParams.delete(paramName);
  }
};

export const getSortParamsFromModel = model => {
  if (!model) {
    return '';
  }
  return model.sort === ASC ? `${model.field}` : `-${model.field}`;
};

export const getSortModel = sortParam => {
  const sortParams = sortParam.split('-');
  const isASC = sortParams.length === 1;
  return {field: isASC ? sortParams[0] : sortParams[1], sort: isASC ? ASC : DESC};
};

export const convertSortParamToGridSortModel = param => (param ? [getSortModel(param)] : []);

export const getOptions = (values, idParam, labelParam) =>
  values.map(value => ({id: value[idParam], label: value[labelParam]}));
