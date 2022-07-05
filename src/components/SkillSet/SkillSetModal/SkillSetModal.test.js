import React from 'react';
import {fireEvent, render, screen, waitFor} from 'containers/TestProviderWrapper';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import SkillSetModal from 'components/SkillSet/SkillSetModal';

const onCloseMock = jest.fn();

describe('MySkills modal', () => {
  it('should close my skills modal', () => {
    render(<SkillSetModal isOpen onClose={onCloseMock} />);

    expect(screen.getByTestId('dialog-modal-wrap')).toBeVisible();
    expect(screen.getByTestId('confirm-modal-title')).toHaveTextContent('Propose new skill');
    expect(screen.getByTestId('skill-set-modal-cancel-btn')).toBeVisible();
    fireEvent.click(screen.getByTestId('skill-set-modal-cancel-btn'));
  });
  it('should render my skills modal', async () => {
    render(<SkillSetModal isOpen onClose={onCloseMock} />);

    expect(screen.getByTestId('dialog-modal-wrap')).toBeVisible();
    expect(screen.getByTestId('confirm-modal-title')).toHaveTextContent('Propose new skill');

    userEvent.type(screen.getByTestId('name'), 'Skill Test Name');
    userEvent.type(screen.getByTestId('description'), 'Skill Test Description');
    userEvent.type(screen.getByTestId('comment'), 'Skill Test Comment');

    await waitFor(() => {
      expect(screen.getByTestId('skill-set-modal-confirm-btn')).not.toBeDisabled();
      userEvent.click(screen.getByTestId('skill-set-modal-confirm-btn'));
    });
  });
});
