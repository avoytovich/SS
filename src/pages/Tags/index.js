import React from 'react';

import {ErrorBoundary} from 'react-error-boundary';

import HelmetWrapper from 'containers/HelmetWrapper';
import ErrorFallback from 'components/ErrorFallback';
import TagList from 'components/Tags/TagList';
import {PagePanel} from 'components/PagePanel';

import TagModal from 'components/Tags/TagModal';
import PageHeader from 'components/Common/Layout/PageHeader';
import {useModal} from 'hooks/useModal';
import usePermissions from 'hooks/permissions';
import {PermissionEnum} from 'constants/permissions';
import {ButtonContained} from 'components/Button';

export default function Tags() {
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

  // TODO Refactor to avoid passing an array, as it forces setting up "key" properties that look redundant in this use case
  const extraButtons = hasPermissions([PermissionEnum.TAGS_CREATE])
    ? [
        <ButtonContained
          key="tag-page-create-btn"
          data-testid="tag-page-create-btn"
          onClick={onCreateTag}
        >
          Create new tag
        </ButtonContained>
      ]
    : [];

  return (
    <>
      <HelmetWrapper title="Tags" />
      <PageHeader title="Tags" extra={extraButtons} />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PagePanel>
          <TagList onSaveOrUpdate={onSaveOrUpdateTag} hasPermissions={hasPermissions} />
        </PagePanel>
      </ErrorBoundary>
      {isOpen && <TagModal isOpen={isOpen} onClose={onCloseModal} {...values} />}
    </>
  );
}
