import {
  setURLSearchParams,
  getSortParamsFromModel,
  getSortModel,
  convertSortParamToGridSortModel,
  getOptions
} from 'utils/dataGridUtils';
import {ASC, DESC} from 'constants/dataGrid';

describe('GroupList utils', () => {
  describe('setURLSearchParams', () => {
    const paramName = 'search';
    const query = `?${paramName}=test`;
    const queryParams = new URLSearchParams(query);

    it('should return empty query params', () => {
      const result = new URLSearchParams('');

      setURLSearchParams(queryParams, '', paramName);
      expect(queryParams).toEqual(result);
    });

    it('should update query params', () => {
      const value = 'new query value';
      const result = new URLSearchParams(`?${paramName}=${value}`);

      setURLSearchParams(queryParams, value, paramName);
      expect(queryParams).toEqual(result);
    });
  });
  describe('getSortParamsFromModel', () => {
    it('should return empty sort value', () => {
      expect(getSortParamsFromModel(null)).toEqual('');
    });

    it('should return sort asc value', () => {
      const model = {
        field: 'name',
        sort: ASC
      };
      const result = 'name';

      expect(getSortParamsFromModel(model)).toEqual(result);
    });

    it('should return sort desc value', () => {
      const model = {
        field: 'name',
        sort: DESC
      };
      const result = '-name';

      expect(getSortParamsFromModel(model)).toEqual(result);
    });
  });

  describe('getSortModel', () => {
    it('should return asc sort model', () => {
      const result = {
        field: 'name',
        sort: ASC
      };

      expect(getSortModel('name')).toEqual(result);
    });

    it('should return desc sort model', () => {
      const result = {
        field: 'name',
        sort: DESC
      };

      expect(getSortModel('-name')).toEqual(result);
    });
  });

  describe('convertSortParamToGridSortModel', () => {
    it('should return empty data grid model', () => {
      expect(convertSortParamToGridSortModel(null)).toEqual([]);
    });

    it('should return data grid sort model', () => {
      const result = {
        field: 'name',
        sort: DESC
      };

      expect(convertSortParamToGridSortModel('-name')).toEqual([result]);
    });
  });
  describe('getOptions', () => {
    it('should return options', () => {
      const data = [{id: 1, name: 'test'}];
      const result = [{id: 1, label: 'test'}];

      expect(getOptions(data, 'id', 'name')).toEqual(result);
    });
  });
});
