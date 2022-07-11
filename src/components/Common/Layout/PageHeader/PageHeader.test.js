import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PageHeader from './index';

import {ButtonText} from '../../../Button';

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
          <ButtonText key="test-btn" data-testid="page-header-button" onClick={onClickMock}>
            Button title
          </ButtonText>
        ]}
      />
    );

    expect(screen.getByTestId('page-header-main')).toBeVisible();
    expect(screen.getByTestId('page-header-title')).toBeVisible();
    expect(screen.getByTestId('page-header-button')).toBeVisible();
  });
});
