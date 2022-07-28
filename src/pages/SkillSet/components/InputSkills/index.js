import React from 'react';
import {useDispatch} from 'react-redux';

import useModal from 'hooks/useModal';
import {setBasicSkills} from 'store/skills';
import Card from 'components/Card';
import Paragraph from 'components/Typography/components/Paragraph';

import SkillSetModal from '../SkillSetModal';

import RecommendationSkills from './Recommendations';
import SkillsAutocomplete from './SkillsAutocomplete';

function InputSkills() {
  const dispatch = useDispatch();
  const {isOpen, setIsOpen} = useModal();

  const onToggleModal = () => setIsOpen(value => !value);

  const onSelectSkill = skill => dispatch(setBasicSkills(skill));

  return (
    <Card title="Input skills" data-testid="input-skills-box">
      <Paragraph>Type skill name or click on recomended skill below</Paragraph>
      <SkillsAutocomplete onSelectSkill={onSelectSkill} onProposeSkill={onToggleModal} />
      <RecommendationSkills onSelectSkill={onSelectSkill} />
      <SkillSetModal isOpen={isOpen} onClose={onToggleModal} />
    </Card>
  );
}

export default InputSkills;
