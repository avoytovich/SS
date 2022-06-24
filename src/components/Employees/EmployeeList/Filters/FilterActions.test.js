import React from 'react';
import {fireEvent, render} from 'utils/test-utils';
import FilterActions from 'components/Employees/EmployeeList/Filters/FilterActions';

const setIsFiltersOpenMock = jest.fn();
const onClearFiltersMock = jest.fn();

describe('FilterActions test', () => {
  it('should render close filter', () => {
    const {queryByTestId} = render(
      <FilterActions
        isFiltersOpen={false}
        isFilterSelected={false}
        setIsFiltersOpen={setIsFiltersOpenMock}
        onClearFilters={onClearFiltersMock}
      />
    );
    expect(queryByTestId('closed-filter-container')).toBeVisible();
    expect(queryByTestId('filters-open-btn')).toBeVisible();
    expect(queryByTestId('opened-filter-clean-btn')).toBeNull();
    expect(queryByTestId('opened-filter-container')).toBeNull();
  });
  it('should render close and selected filter', () => {
    const {queryByTestId} = render(
      <FilterActions
        isFiltersOpen={false}
        isFilterSelected={true}
        setIsFiltersOpen={setIsFiltersOpenMock}
        onClearFilters={onClearFiltersMock}
      />
    );
    expect(queryByTestId('closed-filter-container')).toBeVisible();
    expect(queryByTestId('filters-open-btn')).toBeVisible();
    expect(queryByTestId('closed-filter-clean-btn')).toBeVisible();
    expect(queryByTestId('opened-filter-container')).toBeNull();
  });
  it('should render open filter', () => {
    const {queryByTestId} = render(
      <FilterActions
        isFiltersOpen={true}
        isFilterSelected={false}
        setIsFiltersOpen={setIsFiltersOpenMock}
        onClearFilters={onClearFiltersMock}
      />
    );
    expect(queryByTestId('opened-filter-container')).toBeVisible();
    expect(queryByTestId('opened-filter-clean-btn')).toBeVisible();
    expect(queryByTestId('close-icon')).toBeVisible();

    expect(queryByTestId('closed-filter-container')).toBeNull();

    fireEvent.click(queryByTestId('close-icon'));
  });
});
