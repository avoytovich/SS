import {useEffect, useState} from 'react';

export const useDataGridFilter = (
  queryParams,
  updateURLParams,
  updateFilterParams,
  filterParamName,
  filterData,
  getFilterByQueryParams
) => {
  const filterParams = queryParams.get(filterParamName);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (!filterParams) {
      setFilter([]);
    }
  }, [filterParams]);

  useEffect(() => {
    if (filter.length === 0 && filterParams && filterData.length > 0) {
      setFilter(getFilterByQueryParams(filterParams, filterData));
    }
  }, [filterData]);

  const onFilterChange = (value, onPageChange) => {
    onPageChange(0);
    setFilter(value);
    updateFilterParams(value, updateURLParams);
  };

  return {
    filter,
    onFilterChange
  };
};
