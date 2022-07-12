import {renderHook} from '@testing-library/react-hooks';

import {useDataGridPagination} from 'hooks/dataGrid';

describe('Test pagination hook', () => {
  const updateURLParams = jest.fn();
  test('useDataGridPagination', () => {
    const paramName = 'page';
    const query = `?${paramName}=1`;
    const URLParams = new URLSearchParams(query);

    renderHook(() => {
      const {page, onPageChange} = useDataGridPagination(URLParams, updateURLParams);

      onPageChange(1);
      expect(page).toEqual(2);
    });
  });
});
