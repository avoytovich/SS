import React from 'react';

import MySkills from 'components/SkillSet';
import PageLayout from 'components/Common/Layout/PageLayout';

export default function SkillSet() {
  return (
    <PageLayout title="My Skill Set">
      <MySkills />
    </PageLayout>
  );
}
