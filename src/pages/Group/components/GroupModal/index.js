import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Form, Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'notistack';
import {DialogActions} from '@mui/material';

import {ButtonContained, ButtonOutlined} from 'components/Button';
import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import Input from 'components/Common/Form/Input';
import {formSubmitHandling} from 'utils/forms';
import {useUpdateGroupMutation, useAddGroupMutation, getGroups} from 'services/groups';
import {useURLParams} from 'hooks/dataGrid';
import {defaultPage, pageParamName} from 'constants/dataGrid';

import ModifyGroupSchema from './modifyGroupShema';

export default function GroupModal({isOpen, id, groupName, onClose, ...rest}) {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const {clearQueryParams, isAllParamsEmpty, hasOnlyOneParam, isParamEqualTo} = useURLParams();
  const [updateGroup] = useUpdateGroupMutation();
  const [addGroup] = useAddGroupMutation();
  const title = id ? `Edit "${groupName}" group` : 'Create new group';

  const isFirstPage = useMemo(
    () => hasOnlyOneParam(pageParamName) && isParamEqualTo(pageParamName, defaultPage.toString()),
    [hasOnlyOneParam, isParamEqualTo]
  );

  const fetchGroups = useCallback(() => {
    if (isAllParamsEmpty() || isFirstPage) {
      dispatch(getGroups);
    }
  }, [isAllParamsEmpty, isFirstPage]);

  const onSave = (values, actions) => {
    if (id) {
      values.id = id;
    }

    formSubmitHandling(
      id ? updateGroup : addGroup,
      {...values},
      actions,
      () => {
        fetchGroups();
        clearQueryParams();
        onClose();
        enqueueSnackbar('Group have successfully saved');
      },
      () => {
        enqueueSnackbar('Group have not saved, please check form fields', {variant: 'error'});
      }
    );
  };

  return (
    <CustomizedDialogs
      type="form"
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onSave={onSave}
      title={title}
      text="Input name of the group"
      withCustomBtns
      {...rest}
    >
      <Formik
        validateOnBlur={false}
        validateOnChange
        onSubmit={onSave}
        validationSchema={ModifyGroupSchema}
        initialValues={{name: groupName || ''}}
        enableReinitialize
      >
        {({isSubmitting, isValid, dirty}) => (
          <Form autoComplete="off">
            <Input
              name="name"
              label="Group name"
              placeholder="Type group name"
              sx={{marginBottom: '16px'}}
            />
            <DialogActions>
              <ButtonOutlined data-testid="group-modal-cancel-btn" onClick={onClose}>
                Cancel
              </ButtonOutlined>
              <ButtonContained
                type="submit"
                data-testid="group-modal-confirm-btn"
                disabled={isSubmitting || !isValid || !dirty}
              >
                {id ? 'Edit' : 'Create'}
              </ButtonContained>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </CustomizedDialogs>
  );
}

GroupModal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

GroupModal.defaultProps = {
  id: '',
  groupName: ''
};
