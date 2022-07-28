import {fireEvent, render, screen} from 'containers/TestProviderWrapper';

import SkillsAutocompletePaper from '..';

const mockOnClick = jest.fn();

describe('SkillsAutocompletePaper test', () => {
  it('should render paper', async () => {
    render(
      <SkillsAutocompletePaper onClick={mockOnClick}>
        <span>Skills Paper</span>
      </SkillsAutocompletePaper>
    );
    expect(screen.getByTestId('skills-autocomplete-paper')).toBeVisible();
    expect(screen.getByTestId('skill-set-propose-btn')).toBeVisible();

    fireEvent.click(screen.getByTestId('skill-set-propose-btn'));
    fireEvent.mouseDown(screen.getByTestId('skill-set-propose-btn'));
    expect(mockOnClick).toBeCalled();
  });
});
