import React, {useState} from 'react';

import {Box, Button, Typography} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';

import PageTitle from 'components/PageTitle';
import ErrorFallback from 'components/ErrorFallback';
import TagList from 'components/Tags/TagList';
import {PagePanel} from 'components/PagePanel';
import TagModal from '../../components/Tags/TagModal';

export default function Tags() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => setIsModalOpen(isOpen => !isOpen);

  return (
    <>
      <PageTitle title="Tag List" />
      <Box
        data-testid="tag-page-box"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Typography variant={'h4'} component="h1" margin="24px 0" data-testid="tag-page-title">
          Tag List
        </Typography>
        <Button
          sx={{borderRadius: '40px'}}
          variant="contained"
          data-testid="tag-page-create-btn"
          onClick={handleToggleModal}
        >
          Create new tag
        </Button>
      </Box>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <TagList isAddTag={isModalOpen} />
        </PagePanel>
      </ErrorBoundary>
      <TagModal isOpen={isModalOpen} onClose={handleToggleModal} />
    </>
  );
}
