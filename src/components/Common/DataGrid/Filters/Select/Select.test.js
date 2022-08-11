import React from 'react';

import {fireEvent, render, within} from 'containers/TestProviderWrapper';
import {GridSelect} from 'components/Common/DataGrid';

const onChangeMock = jest.fn();
const onClearMock = jest.fn();

const options = [
  {id: '1', label: 'label 1'},
  {id: '2', label: 'label 2'},
  {id: '3', label: 'label 3'}
];

describe('Grid Select test', () => {
  it('should render select without params', () => {
    const {queryByTestId} = render(<GridSelect />);
    expect(queryByTestId('grid-select-control')).toBeVisible();
    expect(queryByTestId('grid-select-select')).toBeVisible();
  });
  it('should render select', () => {
    const {queryByTestId, getByRole, getAllByRole} = render(
      <GridSelect options={options} value="1" />
    );
    expect(queryByTestId('grid-select-control')).toBeVisible();
    expect(queryByTestId('grid-select-select')).toBeVisible();

    fireEvent.mouseDown(getAllByRole('button')[0]);

    const listbox = within(getByRole('listbox'));

    fireEvent.click(listbox.getByText(/label 2/i));
  });
  it('should render multiple select', () => {
    const {queryByTestId, getByRole, getAllByRole} = render(
      <GridSelect
        multiple
        options={options}
        value={[1]}
        onChange={onChangeMock}
        onClear={onClearMock}
      />
    );

    expect(queryByTestId('grid-select-control')).toBeVisible();
    expect(queryByTestId('grid-select-select')).toBeVisible();

    fireEvent.mouseDown(getAllByRole('button')[0]);

    const listbox = within(getByRole('listbox'));

    fireEvent.click(listbox.getByText(/label 2/i));
  });
  it('should render clear multiple select', () => {
    const {queryByTestId, getAllByRole} = render(
      <GridSelect
        multiple
        options={options}
        value={[1, 2]}
        onChange={onChangeMock}
        onClear={onClearMock}
      />
    );

    expect(queryByTestId('grid-select-control')).toBeVisible();
    expect(queryByTestId('grid-select-select')).toBeVisible();

    fireEvent.mouseDown(getAllByRole('button')[0]);

    expect(queryByTestId('grid-select-select-remove-icon')).toBeVisible();
    fireEvent.click(queryByTestId('grid-select-select-remove-icon'));
  });
});
