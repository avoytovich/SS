import React from 'react';

import MySkills from 'components/SkillSet';
import PageLayout from 'components/Common/Layout/PageLayout';
import Card from 'components/Common/Card';

export default function SkillSet() {
  return (
    <PageLayout type="cardsLayout" title="My Skill Set" hiddenHeader>
      <MySkills />
      <Card title="Set skills seniority">test</Card>
    </PageLayout>
  );
}
