import {useEffect, useState} from 'react';

const useDataGridFilter = (
  queryParams,
  updateURLParams,
  updateFilterParams,
  filterParamName,
  filterData,
  getFilterByQueryParams,
  isMultiple = true
) => {
  const filterParams = queryParams.get(filterParamName);
  const [filter, setFilter] = useState(isMultiple ? [] : '');

  useEffect(() => {
    if (!filterParams && (isMultiple ? filter.length : filter)) {
      setFilter(isMultiple ? [] : '');
    }
  }, [filterParams, filter, isMultiple, setFilter]);

  useEffect(() => {
    if (filterParams && filterData.length > 0 && (isMultiple ? filter.length === 0 : !filter)) {
      setFilter(getFilterByQueryParams(filterParams, filterData));
    }
  }, [filterData, filter, setFilter]);

  const onFilterChange = (value, onPageChange) => {
    onPageChange(0);
    setFilter(value);
    updateFilterParams(value, updateURLParams, isMultiple, filterParamName);
  };

  return {
    filter,
    onFilterChange
  };
};

export default useDataGridFilter;
