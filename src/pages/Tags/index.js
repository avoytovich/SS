import React from 'react';

import {Button} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';

import PageLayout from 'components/Common/Layout/PageLayout';
import ErrorFallback from 'components/ErrorFallback';
import TagList from 'components/Tags/TagList';

import TagModal from 'components/Tags/TagModal';
import {useModal} from 'hooks/useModal';
import usePermissions from 'hooks/permissions';
import {PermissionEnum} from 'constants/permissions';

const Tags = () => {
  const {hasPermissions} = usePermissions();
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

  const extraButtons = hasPermissions([PermissionEnum.TAGS_CREATE])
    ? [
        <Button
          key="tag-page-create-btn"
          sx={{borderRadius: '40px'}}
          variant="contained"
          data-testid="tag-page-create-btn"
          onClick={onCreateTag}
        >
          Create new tag
        </Button>
      ]
    : [];

  return (
    <PageLayout title="Tags" extra={extraButtons}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <TagList onSaveOrUpdate={onSaveOrUpdateTag} hasPermissions={hasPermissions} />
        {isOpen && <TagModal isOpen={isOpen} onClose={onCloseModal} {...values} />}
      </ErrorBoundary>
    </PageLayout>
  );
};

export default Tags;
