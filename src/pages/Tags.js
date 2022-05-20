import React, {useState} from 'react';

import {Box, Button, Typography} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';

import PageTitle from 'components/PageTitle';
import ErrorFallback from 'components/ErrorFallback';
import TagList from 'components/Tags/TagList';
import {PagePanel} from 'components/PagePanel';
import TagModal from '../components/Tags/TagModal';

export default function Tags() {
  const [isAddNewTag, setIsAddNewTag] = useState(false);

  const handleCloseModal = () => setIsAddNewTag(false);

  return (
    <>
      <PageTitle title="Tag List" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Typography variant={'h4'} component="h1" margin="24px 0">
          Tag List
        </Typography>
        <Button
          sx={{borderRadius: '40px'}}
          variant="contained"
          onClick={() => setIsAddNewTag(true)}
        >
          Create new tag
        </Button>
      </Box>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <TagList isAddTag={isAddNewTag} />
        </PagePanel>
      </ErrorBoundary>
      <TagModal open={isAddNewTag} onClose={handleCloseModal} />
    </>
  );
}
