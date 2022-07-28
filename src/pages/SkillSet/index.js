import React from 'react';

import PageLayout from 'components/Common/Layout/PageLayout';

import {ButtonContained} from '../../components/Button';

import SkillSetSeniority from './components/SkillSetSeniority';
import InputSkills from './components/InputSkills';

function SkillSet() {
  return (
    <PageLayout type="cardsLayout" title="My Skill Set" hiddenHeader>
      <InputSkills />
      <SkillSetSeniority />
      <ButtonContained>Finish</ButtonContained>
    </PageLayout>
  );
}

export default SkillSet;
