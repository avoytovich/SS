import {useEffect, useState} from 'react';
import {searchParamName} from 'constants/dataGrid';

export const useDataGridSearch = (queryParams, updateURLParams) => {
  const [search, setSearch] = useState(queryParams.get(searchParamName) || '');

  useEffect(() => {
    if (!queryParams.get(searchParamName)) {
      setSearch('');
    }
  }, [queryParams.get(searchParamName)]);

  const onSearchChange = (value, onPageChange) => {
    onPageChange(0);
    setSearch(value);
    updateURLParams(value, searchParamName);
  };

  return {
    search,
    onSearchChange
  };
};
