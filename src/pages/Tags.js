import React from 'react';

import {Typography} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';

import PageTitle from 'components/PageTitle';
import ErrorFallback from 'components/ErrorFallback';
import TagList from 'components/Tags/TagList';
import {PagePanel} from 'components/PagePanel';

export default function Tags() {
  return (
    <>
      <PageTitle title="Tag List" />
      <Typography variant={'h4'} component="h1" margin="24px 0">
        Tag List
      </Typography>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <TagList />
        </PagePanel>
      </ErrorBoundary>
    </>
  );
}
