import {onChangeEmployeeFilter, getFilterByQueryParams} from 'components/Employees/utils';
import {
  filterBenchParamName,
  filterCompetencyParamName,
  filterSeniorityParamName,
  filterSpecializationParamName
} from 'constants/dataGrid';

describe('Employees utils', () => {
  describe('onChangeEmployeeFilter', () => {
    const onPageChangeMock = jest.fn();
    const onCompetenciesChangeMock = jest.fn();
    const onSpecializationChangeMock = jest.fn();
    const onSeniorityChangeMock = jest.fn();
    const onBenchChangeMock = jest.fn();
    const value = 'test value';

    it('should call competency', () => {
      onChangeEmployeeFilter(
        filterCompetencyParamName,
        value,
        onPageChangeMock,
        onCompetenciesChangeMock,
        onSpecializationChangeMock,
        onSeniorityChangeMock,
        onBenchChangeMock
      );
      expect(onCompetenciesChangeMock).toHaveBeenCalled();
    });

    it('should call specialization', () => {
      onChangeEmployeeFilter(
        filterSpecializationParamName,
        value,
        onPageChangeMock,
        onCompetenciesChangeMock,
        onSpecializationChangeMock,
        onSeniorityChangeMock,
        onBenchChangeMock
      );
      expect(onSpecializationChangeMock).toHaveBeenCalled();
    });
    it('should call seniority', () => {
      onChangeEmployeeFilter(
        filterSeniorityParamName,
        value,
        onPageChangeMock,
        onCompetenciesChangeMock,
        onSpecializationChangeMock,
        onSeniorityChangeMock,
        onBenchChangeMock
      );
      expect(onSeniorityChangeMock).toHaveBeenCalled();
    });
    it('should call bench', () => {
      onChangeEmployeeFilter(
        filterBenchParamName,
        value,
        onPageChangeMock,
        onCompetenciesChangeMock,
        onSpecializationChangeMock,
        onSeniorityChangeMock,
        onBenchChangeMock
      );
      expect(onBenchChangeMock).toHaveBeenCalled();
    });
  });
  describe('getFilterByQueryParams', () => {
    it('should return query params', () => {
      const params = '1,2';
      const result = [1, 2];

      expect(getFilterByQueryParams(params)).toEqual(result);
    });
  });
});
