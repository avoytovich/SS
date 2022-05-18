import {useState} from 'react';
import {defaultPage, pageParamName} from 'constants/dataGrid';

export const useDataGridPagination = (queryParams, updateURLParams) => {
  const [page, setPage] = useState(queryParams.get(pageParamName) || defaultPage);
  const [tablePage, setTablePage] = useState(page - 1);

  const onPageChange = newPage => {
    const nextPage = newPage + 1;

    setPage(nextPage);
    setTablePage(newPage);
    updateURLParams(nextPage, pageParamName);
  };

  return {
    page,
    tablePage,
    onPageChange
  };
};
