import {render, screen} from 'containers/TestProviderWrapper';

import InputSkills from '..';

describe('InputSkills test', () => {
  it('should render input skills section', async () => {
    render(<InputSkills />);
    expect(screen.getByTestId('input-skills-box')).toBeVisible();
    expect(screen.getByTestId('input-skills-box-autocomplete')).toBeVisible();
    expect(screen.getByTestId('input-skills-recommendation-box')).toBeVisible();
    expect(screen.getByTestId('input-skills-recommendation-title')).toHaveTextContent(
      'Recommendations based on your profile'
    );
  });
});
