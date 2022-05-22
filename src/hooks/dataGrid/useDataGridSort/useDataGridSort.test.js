import {renderHook} from '@testing-library/react-hooks';
import {ASC} from 'utils/helpers';
import {useDataGridSort} from 'hooks/dataGrid';

describe('Test sort hook', () => {
  const updateURLParams = jest.fn();
  test('useDataGridSort', () => {
    const paramName = 'sort';
    const query = `?${paramName}=${ASC}`;
    const URLParams = new URLSearchParams(query);
    const model = [{field: 'name', sort: ASC}];

    renderHook(() => {
      const {sort, onSortChange} = useDataGridSort(URLParams, updateURLParams);

      onSortChange(model);
      expect(sort).toEqual('sort=name');
    });
  });
});
