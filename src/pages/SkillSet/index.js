import React from 'react';

import PageLayout from 'components/Common/Layout/PageLayout';
import Card from 'components/Common/Card';

import MySkills from './components';

export default function SkillSet() {
  return (
    <PageLayout type="cardsLayout" title="My Skill Set" hiddenHeader>
      <MySkills />
      <Card title="Set skills seniority">test</Card>
    </PageLayout>
  );
}
