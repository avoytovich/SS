import {renderHook} from '@testing-library/react-hooks';

import {useDataGridSearch} from 'hooks/dataGrid';

describe('Test search hook', () => {
  const updateURLParams = jest.fn();
  test('useDataGridSearch', () => {
    const paramName = 'search';
    const query = `?${paramName}=test`;
    const URLParams = new URLSearchParams(query);

    renderHook(() => {
      const {search, onSearchChange} = useDataGridSearch(URLParams, updateURLParams);

      onSearchChange('new test');
      expect(search).toEqual('new test');
    });
  });
});
