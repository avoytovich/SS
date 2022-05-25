import {useEffect, useState} from 'react';
import {defaultPage, pageParamName} from 'constants/dataGrid';

export const useDataGridPagination = (queryParams, updateURLParams) => {
  const [page, setPage] = useState(queryParams.get(pageParamName) || defaultPage);
  const [tablePage, setTablePage] = useState(page - 1);

  useEffect(() => {
    if (!queryParams.get(pageParamName) && page !== defaultPage) {
      setPage(defaultPage);
      setTablePage(0);
    }
  }, [queryParams.get(pageParamName)]);

  const onPageChange = newPage => {
    const nextPage = newPage + 1;

    if (newPage !== page) {
      setPage(nextPage);
      setTablePage(newPage);
      updateURLParams(nextPage, pageParamName);
    }
  };

  return {
    page,
    tablePage,
    onPageChange
  };
};
