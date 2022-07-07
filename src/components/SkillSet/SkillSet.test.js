import React from 'react';
import {fireEvent, render, screen} from 'containers/TestProviderWrapper';
import MySkills from 'components/SkillSet';

describe('MySkills', () => {
  it('should render my skills', async () => {
    render(<MySkills />);
    expect(screen.getByTestId('skill-set-container')).toBeVisible();
    expect(screen.getByTestId('skill-set-propose-btn')).toBeVisible();
    fireEvent.click(screen.getByTestId('skill-set-propose-btn'));
  });
});
