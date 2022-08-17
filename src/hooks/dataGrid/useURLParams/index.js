import {useHistory, useLocation} from 'react-router-dom';

import {setURLSearchParams} from 'utils/dataGridUtils';

const useURLParams = () => {
  const history = useHistory();
  const {pathname, search} = useLocation();

  let queryParams = new URLSearchParams(search);

  const updateHistory = params => {
    history.push({
      pathname,
      search: params
    });
  };

  const isAllParamsEmpty = () => Array.from(queryParams.values()).length === 0;

  const hasOnlyOneParam = paramName => {
    const isOneParam = Array.from(queryParams.values()).length === 1;
    return isOneParam ? queryParams.has(paramName) : false;
  };

  const isParamEqualTo = (name, value) => {
    const param = queryParams.get(name);
    return param === value;
  };

  const clearQueryParams = () => {
    updateHistory('');
    queryParams = new URLSearchParams();
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
    isAllParamsEmpty,
    hasOnlyOneParam,
    isParamEqualTo
  };
};

export default useURLParams;
