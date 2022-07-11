import React from 'react';

import {ErrorBoundary} from 'react-error-boundary';

import PageLayout from 'components/Common/Layout/PageLayout';
import ErrorFallback from 'components/ErrorFallback';
import EmployeeList from 'components/Employees/EmployeeList';

export default function Employees() {
  return (
    <PageLayout title="Employees">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EmployeeList />
      </ErrorBoundary>
    </PageLayout>
  );
}
