import React from 'react';

import PageLayout from 'components/Common/Layout/PageLayout';
import useModal from 'hooks/useModal';
import usePermissions from 'hooks/permissions';
import {PermissionEnum} from 'constants/permissions';
import {ButtonContained} from 'components/Button';

import GroupModal from './components/GroupModal';
import GroupList from './components/GroupList';

const Group = () => {
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

  const onSaveOrUpdateGroup = groupValues => {
    if (groupValues) {
      setValues(groupValues);
    }

    setIsOpen(true);
  };

  const extraButtons = hasPermissions([PermissionEnum.GROUPS_CREATE]) ? (
    <ButtonContained data-testid="group-page-create-btn" onClick={onCreateTag}>
      Create new group
    </ButtonContained>
  ) : null;

  return (
    <PageLayout title="Groups" extra={extraButtons}>
      <GroupList onUpdate={onSaveOrUpdateGroup} />
      {isOpen && <GroupModal isOpen={isOpen} onClose={onCloseModal} {...values} />}
    </PageLayout>
  );
};

export default Group;
