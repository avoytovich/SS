import React from 'react';

import {Button} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';

import HelmetWrapper from 'components/HelmetWrapper';
import ErrorFallback from 'components/ErrorFallback';
import TagList from 'components/Tags/TagList';
import {PagePanel} from 'components/PagePanel';

import TagModal from 'components/Tags/TagModal';
import PageHeader from 'components/Common/Layout/PageHeader';
import {useModal} from 'hooks/useModal';

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
      <HelmetWrapper title="Tag List" />
      <PageHeader
        title="Tag List"
        extra={[
          <Button
            key="tag-page-create-btn"
            sx={{borderRadius: '40px'}}
            variant="contained"
            data-testid="tag-page-create-btn"
            onClick={onCreateTag}
          >
            Create new tag
          </Button>
        ]}
      />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <TagList onSaveOrUpdate={onSaveOrUpdateTag} />
        </PagePanel>
      </ErrorBoundary>
      <TagModal isOpen={isOpen} onClose={onCloseModal} {...values} />
    </>
  );
}
