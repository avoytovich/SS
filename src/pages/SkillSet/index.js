import React from 'react';

import {PagePanel} from 'components/PagePanel';
import PageHeader from 'components/Common/Layout/PageHeader';
import MySkills from 'components/SkillSet';

export default function SkillSet() {
  return (
    <>
      <PageHeader title="My skill set" />
      <PagePanel>
        <MySkills />
      </PagePanel>
    </>
  );
}
