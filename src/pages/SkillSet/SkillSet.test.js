import React from 'react';
import {render, screen} from 'utils/test-utils';
import SkillSet from 'pages/SkillSet';

describe('SkillSet page', () => {
  it('should render skill set page', async () => {
    render(<SkillSet />);
    expect(screen.getByTestId('page-header-title-text')).toBeVisible();
    expect(screen.getByTestId('page-header-title-text')).toHaveTextContent('My skill set');
  });
});
