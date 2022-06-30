import React from 'react';

import {ErrorBoundary} from 'react-error-boundary';

import {PagePanel} from 'components/PagePanel';
import ErrorFallback from 'components/ErrorFallback';
import PageHeader from 'components/Common/Layout/PageHeader';
import MySkills from 'components/SkillSet';

export default function SkillSet() {
  return (
    <>
      <PageHeader title="My skill set" />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <MySkills />
        </PagePanel>
      </ErrorBoundary>
    </>
  );
}
