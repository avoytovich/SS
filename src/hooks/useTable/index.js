import {useState} from 'react';

import {useURLParams} from '../dataGrid';

const ASC = 'asc';
const DESC = 'desc';
const defaultPage = 1;

const getSortDirection = sort => (sort && sort.includes('-') ? DESC : ASC);

const useTable = () => {
  const {queryParams, updateURLParams} = useURLParams();
  const sort = queryParams.get('sort') || '';
  const page = Number(queryParams.get('page')) || defaultPage;
  const search = queryParams.get('search') || '';
  const [sortDirection, setSortDirection] = useState(getSortDirection(sort));

  const onSortChange = ({direction, field}) => {
    const sortParam = sort && direction === ASC ? `-${field}` : field;
    updateURLParams(sortParam, 'sort');
    setSortDirection(sort && direction === ASC ? DESC : ASC);
  };

  const onPageChange = newPage => {
    if (newPage !== queryParams.get('page')) {
      updateURLParams(newPage, 'page');
    }
  };

  const onSearchChange = value => {
    onPageChange();
    updateURLParams(value, 'search');
  };

  const onFilterChange = (filterName, value) => {
    onPageChange(0);
    updateURLParams(value.toString(), filterName);
  };

  const getFilterValue = (filterName, isMultiple = true) => {
    const queryFilter = queryParams.get(filterName);

    if (queryFilter) {
      return isMultiple ? queryFilter.split(',').map(filter => +filter) : queryFilter.split(',');
    }

    return isMultiple ? [] : '';
  };

  return {
    page,
    search,
    sort,
    sortDirection,
    onSearchChange,
    onPageChange,
    onSortChange,
    onFilterChange,
    getFilterValue
  };
};

export default useTable;
