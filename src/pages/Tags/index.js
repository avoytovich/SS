import React, {useState} from 'react';

import {Button} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';

import HelmetWrapper from 'components/HelmetWrapper';
import ErrorFallback from 'components/ErrorFallback';
import TagList from 'components/Tags/TagList';
import {PagePanel} from 'components/PagePanel';
import TagModal from 'components/Tags/TagModal';
import PageHeader from 'components/Common/Layout/PageHeader';

export default function Tags() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => setIsModalOpen(isOpen => !isOpen);

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
            onClick={handleToggleModal}
          >
            Create new tag
          </Button>
        ]}
      />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <TagList isAddTag={isModalOpen} />
        </PagePanel>
      </ErrorBoundary>
      <TagModal isOpen={isModalOpen} onClose={handleToggleModal} />
    </>
  );
}
