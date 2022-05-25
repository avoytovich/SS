import {useHistory, useLocation} from 'react-router-dom';
import {setURLSearchParams} from 'utils/dataGridUtils';

export const useURLParams = () => {
  const history = useHistory();
  const {pathname, search} = useLocation();

  const queryParams = new URLSearchParams(search);

  const updateHistory = params => {
    history.push({
      pathname,
      search: params
    });
  };

  const isAllParamsEmpty = () => Array.from(queryParams.values()).length === 0;

  const clearQueryParams = () => {
    updateHistory('');
  };

  const updateURLParams = (value, paramName) => {
    setURLSearchParams(queryParams, value, paramName);
    updateHistory(queryParams.toString());
  };

  return {
    pathname,
    search,
    queryParams,
    updateURLParams,
    clearQueryParams,
    isAllParamsEmpty
  };
};
