import {renderHook} from '@testing-library/react-hooks';

import {useURLParams} from 'hooks/dataGrid';

const mockedPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockedPush
  }),
  useLocation: () => ({
    pathname: '/test'
  })
}));

describe('URL test', () => {
  test('useURLParams', () => {
    renderHook(() => {
      const {queryParams, updateURLParams, clearQueryParams} = useURLParams();

      updateURLParams('page', 1);
      expect(queryParams.get('page')).toEqual(1);
      clearQueryParams();
      expect(queryParams.get('page')).toEqual(null);
    });
    expect(mockedPush).toHaveBeenCalled();
  });
});
