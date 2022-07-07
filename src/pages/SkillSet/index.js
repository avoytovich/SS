import React from 'react';

import MySkills from 'components/SkillSet';
import PageLayout from 'components/Common/Layout/PageLayout';
import Card from 'components/Common/Card';

export default function SkillSet() {
  return (
    <PageLayout title="My Skill Set" hiddenHeader>
      <MySkills />
      <Card title="Set skills seniority">test</Card>
    </PageLayout>
  );
}
