import React from 'react';

import {Box} from '@mui/material';
import SkillSetModal from 'components/SkillSet/SkillSetModal';
import {useModal} from 'hooks/useModal';
import {ButtonContained} from 'components/Button';

export default function MySkills() {
  const {isOpen, setIsOpen} = useModal();

  const onToggleModal = () => setIsOpen(value => !value);

  return (
    <Box data-testid="skill-set-container">
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
