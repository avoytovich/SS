import React, {useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Form, Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'notistack';

import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import ModifyTagSchema from 'components/Tags/TagModal/modifyTagShema';
import Input from 'components/Common/Form/Input/Input';
import {Button, DialogActions} from '@mui/material';

import {useUpdateTagMutation, useAddTagMutation, getTags} from 'api/tags';
import {useURLParams} from 'hooks/dataGrid';
import {defaultPage, pageParamName} from '../../../constants/dataGrid';

export default function TagModal({isOpen, id, tagName, onClose, ...rest}) {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const {clearQueryParams, isAllParamsEmpty, hasOnlyOneParam, isParamEqualTo} = useURLParams();
  const [updateTag, {isSuccess: isUpdateSuccess}] = useUpdateTagMutation();
  const [addTag, {isSuccess: isAddSuccess}] = useAddTagMutation();
  const title = id ? `Edit "${tagName}" tag` : 'Create new tag';

  const isFirstPage = useCallback(
    () => hasOnlyOneParam(pageParamName) && isParamEqualTo(pageParamName, defaultPage.toString()),
    [hasOnlyOneParam, isParamEqualTo]
  );

  const fetchTags = useCallback(() => {
    if (isAllParamsEmpty() || isFirstPage()) {
      dispatch(getTags);
    }
  }, [isAllParamsEmpty, isFirstPage]);

  useEffect(() => {
    if ((isUpdateSuccess || isAddSuccess) && isOpen) {
      fetchTags();
      clearQueryParams();
      onClose();
      enqueueSnackbar('Tag have successfully saved');
    }
    return () => {};
  }, [isUpdateSuccess, isAddSuccess, isOpen]);

  const onSave = name => {
    if (id) {
      updateTag({id, name});
    } else {
      addTag({name});
    }
  };

  return (
    <CustomizedDialogs
      type="form"
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onSave={onSave}
      title={title}
      text="Input name of the tag"
      withCustomBtns
      {...rest}
    >
      <Formik
        validateOnBlur={false}
        validateOnChange
        onSubmit={onSave}
        validationSchema={ModifyTagSchema}
        initialValues={{name: tagName || ''}}
        enableReinitialize
      >
        {({isSubmitting, isValid, dirty}) => (
          <Form autoComplete="off">
            <Input
              name="name"
              label="Tag name"
              placeholder="Type tag name"
              sx={{marginBottom: '16px'}}
            />
            <DialogActions>
              <Button variant="outlined" data-testid="tag-modal-cancel-btn" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                data-testid="tag-modal-confirm-btn"
                disabled={isSubmitting || !isValid || !dirty}
              >
                {id ? 'Edit' : 'Create'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </CustomizedDialogs>
  );
}

TagModal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

TagModal.defaultProps = {
  id: '',
  tagName: ''
};
