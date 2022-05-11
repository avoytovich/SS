import {useHistory, useLocation} from 'react-router-dom';
import {setURLSearchParams} from '../../../utils/dataGridUtils';

export const useURLParams = () => {
  const history = useHistory();
  const {pathname, search} = useLocation();

  const queryParams = new URLSearchParams(search);

  const updateHistory = () => {
    history.push({
      pathname,
      search: queryParams.toString()
    });
  };

  const updateURLParams = (value, paramName) => {
    setURLSearchParams(queryParams, value, paramName);
    updateHistory();
  };

  return {
    pathname,
    search,
    queryParams,
    updateURLParams
  };
};
