import React from 'react';

import PageLayout from 'components/Common/Layout/PageLayout';
import useModal from 'hooks/useModal';
import usePermissions from 'hooks/permissions';
import {PermissionEnum} from 'constants/permissions';
import {ButtonContained} from 'components/Button';

import TagModal from './components/TagModal';
import TagList from './components/TagList';

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
    <PageLayout title="Tags" extra={extraButtons}>
      <TagList onUpdate={onSaveOrUpdateTag} />
      {isOpen && <TagModal isOpen={isOpen} onClose={onCloseModal} {...values} />}
    </PageLayout>
  );
};

export default Tags;
