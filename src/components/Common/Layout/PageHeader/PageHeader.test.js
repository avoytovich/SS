import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {Button} from '@mui/material';
import PageHeader from './index';

describe('PageHeader', () => {
  it('should be rendered without crashes', () => {
    render(<PageHeader title="Test title" />);

    expect(screen.getByTestId('page-header-main')).toBeVisible();
    expect(screen.getByTestId('page-header-title')).toBeVisible();
  });
  it('should render extra button', () => {
    const onClickMock = jest.fn();
    render(
      <PageHeader
        title="Test title"
        extra={[
          <Button key="test-btn" data-testid="page-header-button" onClick={onClickMock}>
            Button title
          </Button>
        ]}
      />
    );

    expect(screen.getByTestId('page-header-main')).toBeVisible();
    expect(screen.getByTestId('page-header-title')).toBeVisible();
    expect(screen.getByTestId('page-header-button')).toBeVisible();
  });
});
