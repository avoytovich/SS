import {useState} from 'react';
import {
  convertSortParamToGridSortModel,
  getSortParamsFromModel
} from '../../../utils/dataGridUtils';
import {sortParamName} from '../../../constants/dataGrid';

export const useDataGridSort = (queryParams, updateURLParams) => {
  const [sort, setSort] = useState(queryParams.get(sortParamName) || '');
  const [sortModel, setSortModel] = useState(convertSortParamToGridSortModel(sort));

  const onSortChange = newModel => {
    const sortParamValue = getSortParamsFromModel(newModel[0]);

    setSortModel(newModel);
    setSort(sortParamValue);
    updateURLParams(sortParamValue, sortParamName);
  };

  return {
    sort,
    sortModel,
    setSortModel,
    onSortChange
  };
};
