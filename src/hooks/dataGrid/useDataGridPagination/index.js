import {useEffect, useState} from 'react';
import {defaultPage, pageParamName} from 'constants/dataGrid';

const useDataGridPagination = (queryParams, updateURLParams) => {
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

    if (nextPage !== page) {
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

export default useDataGridPagination;
