import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Form, Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {useSnackbar} from 'notistack';

import {ButtonContained, ButtonOutlined} from 'components/Button';
import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import ModifyTagSchema from 'components/Tags/TagModal/modifyTagShema';
import Input from 'components/Common/Form/Input';
import {DialogActions} from '@mui/material';
import {formSubmitHandling} from 'utils/forms';

import {useUpdateTagMutation, useAddTagMutation, getTags} from 'services/tags';
import {useURLParams} from 'hooks/dataGrid';
import {defaultPage, pageParamName} from 'constants/dataGrid';

export default function TagModal({isOpen, id, tagName, onClose, ...rest}) {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const {clearQueryParams, isAllParamsEmpty, hasOnlyOneParam, isParamEqualTo} = useURLParams();
  const [updateTag] = useUpdateTagMutation();
  const [addTag] = useAddTagMutation();
  const title = id ? `Edit "${tagName}" tag` : 'Create new tag';

  const isFirstPage = useMemo(
    () => hasOnlyOneParam(pageParamName) && isParamEqualTo(pageParamName, defaultPage.toString()),
    [hasOnlyOneParam, isParamEqualTo]
  );

  const fetchTags = useCallback(() => {
    if (isAllParamsEmpty() || isFirstPage) {
      dispatch(getTags);
    }
  }, [isAllParamsEmpty, isFirstPage]);

  const onSave = (values, actions) => {
    if (id) {
      values.id = id;
    }

    formSubmitHandling(
      id ? updateTag : addTag,
      {...values},
      actions,
      () => {
        fetchTags();
        clearQueryParams();
        onClose();
        enqueueSnackbar('Tag have successfully saved');
      },
      () => {
        enqueueSnackbar('Tag have not saved, please check form fields', {variant: 'error'});
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
              <ButtonOutlined data-testid="tag-modal-cancel-btn" onClick={onClose}>
                Cancel
              </ButtonOutlined>
              <ButtonContained
                type="submit"
                data-testid="tag-modal-confirm-btn"
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
