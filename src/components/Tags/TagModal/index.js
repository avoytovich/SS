import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Form, Formik} from 'formik';

import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import ModifyTagSchema from 'components/Tags/TagModal/modifyTagShema';
import Input from 'components/Common/Form/Input/Input';
import {Button, DialogActions} from '@mui/material';

import {useUpdateTagMutation, useAddTagMutation} from 'api/tags';

export default function TagModal({isOpen, id, tagName, onClose, ...rest}) {
  const [updateTag, {isLoading: isUpdateLoading, isSuccess: isUpdateSuccess}] =
    useUpdateTagMutation();
  const [addTag, {isLoading: isAddLoading, isSuccess: isAddSuccess}] = useAddTagMutation();
  const title = id ? `Edit "${tagName}" tag` : 'Create new tag';

  useEffect(() => {
    if (isUpdateSuccess || isAddSuccess) onClose();
    return () => {};
  }, [isUpdateSuccess, isAddSuccess]);

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
      loading={isUpdateLoading || isAddLoading}
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
            <Input name="name" label="Tag name" placeholder="Type tag name" />
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
