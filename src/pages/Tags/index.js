import React from 'react';

import {Box, Button, Typography} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';

import PageTitle from 'components/PageTitle';
import ErrorFallback from 'components/ErrorFallback';
import TagList from 'components/Tags/TagList';
import {PagePanel} from 'components/PagePanel';
import TagModal from '../../components/Tags/TagModal';
import {useModal} from '../../hooks/useModal';

export default function Tags() {
  const {isOpen, values, setIsOpen, setValues} = useModal();

  const onCloseModal = () => {
    setValues({});
    setIsOpen(false);
  };

  const onCreateTag = () => {
    setValues({});
    setIsOpen(true);
  };

  const onSaveOrUpdateTag = tagValues => {
    if (tagValues) {
      setValues(tagValues);
    }

    setIsOpen(true);
  };

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
          onClick={onCreateTag}
        >
          Create new tag
        </Button>
      </Box>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <TagList onSaveOrUpdate={onSaveOrUpdateTag} />
        </PagePanel>
      </ErrorBoundary>
      <TagModal isOpen={isOpen} onClose={onCloseModal} {...values} />
    </>
  );
}
