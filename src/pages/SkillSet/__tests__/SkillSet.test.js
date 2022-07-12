import React from 'react';

import {render, screen} from 'containers/TestProviderWrapper';

import SkillSet from '..';

describe('SkillSet page', () => {
  it('should render skill set page', async () => {
    render(<SkillSet />);
    expect(screen.getByTestId('page-header-title-text')).toBeVisible();
  });
});
