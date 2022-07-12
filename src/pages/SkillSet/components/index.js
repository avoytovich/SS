import React from 'react';

import {Box} from '@mui/material';
import useModal from 'hooks/useModal';
import {ButtonContained} from 'components/Button';

import InputSkills from './InputSkills';
import SkillSetModal from './SkillSetModal';

export default function MySkills() {
  const {isOpen, setIsOpen} = useModal();

  const onToggleModal = () => setIsOpen(value => !value);

  return (
    <Box data-testid="skill-set-container">
      <InputSkills />
      <ButtonContained
        key="skill-set-propose-btn"
        data-testid="skill-set-propose-btn"
        onClick={onToggleModal}
      >
        Propose new skill
      </ButtonContained>
      <SkillSetModal isOpen={isOpen} onClose={onToggleModal} />
    </Box>
  );
}
