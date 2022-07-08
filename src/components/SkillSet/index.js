import React from 'react';

import {Box, Button} from '@mui/material';
import SkillSetModal from 'components/SkillSet/SkillSetModal';
import {useModal} from 'hooks/useModal';

export default function MySkills() {
  const {isOpen, setIsOpen} = useModal();

  const onToggleModal = () => setIsOpen(value => !value);

  return (
    <Box data-testid="skill-set-container">
      <Button
        key="skill-set-propose-btn"
        sx={{borderRadius: '40px'}}
        variant="contained"
        data-testid="skill-set-propose-btn"
        onClick={onToggleModal}
      >
        Propose new skill
      </Button>
      <SkillSetModal isOpen={isOpen} onClose={onToggleModal} />
    </Box>
  );
}
