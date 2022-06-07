import React from 'react';

import {ErrorBoundary} from 'react-error-boundary';

import HelmetWrapper from 'components/HelmetWrapper';
import ErrorFallback from 'components/ErrorFallback';
import {PagePanel} from 'components/PagePanel';

import PageHeader from 'components/Common/Layout/PageHeader';
import EmployeeList from 'components/Employees/EmployeeList';

export default function Employees() {
  return (
    <>
      <HelmetWrapper title="Employees" />
      <PageHeader title="Employees" />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <EmployeeList />
        </PagePanel>
      </ErrorBoundary>
    </>
  );
}
