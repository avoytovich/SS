import React from 'react';

import {render, screen} from 'containers/TestProviderWrapper';

import SkillSet from '..';

describe('SkillSet page', () => {
  it('should render skill set page', async () => {
    render(<SkillSet />);
    expect(screen.getByTestId('page-header-title-text')).toBeVisible();
  });

  it('should render input skills section', async () => {
    render(<SkillSet />);
    expect(screen.getByTestId('input-skills-box')).toBeVisible();
    expect(screen.getByTestId('input-skills-box-autocomplete')).toBeVisible();
    expect(screen.getByTestId('input-skills-recommendation-box')).toBeVisible();
    expect(screen.getByTestId('input-skills-recommendation-title')).toHaveTextContent(
      'Recommendations based on your profile'
    );
  });
});
