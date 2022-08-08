import {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Formik, Form} from 'formik';
import {DialogActions} from '@mui/material';
import {useSnackbar} from 'notistack';

import {UserRoleEnum} from 'constants/userRoles';
import {
  useLazyFetchManagementsQuery,
  useSetUserRoleMutation,
  useFetchUserRolesQuery,
  useFetchUsersAutocompleteQuery
} from 'services/users';
import {formSubmitHandling} from 'utils/forms';
import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import {ButtonContained, ButtonOutlined} from 'components/Button';
import SelectField from 'components/Common/Form/Select';
import {AutocompleteOption} from 'components/Autocomplete';
import {Paragraph} from 'components/Typography';

import CreateAdminSchema from './createAdminShema';

const CreateAdminModal = ({isOpen, currentRoleName, onClose}) => {
  const {enqueueSnackbar} = useSnackbar();
  const [setUserRole] = useSetUserRoleMutation();
  const [trigger] = useLazyFetchManagementsQuery({currentRoleName});
  const {data: roles = []} = useFetchUserRolesQuery({operators: true});
  const {data: users = []} = useFetchUsersAutocompleteQuery();
  const operatorRole = roles.find(role => role.name === currentRoleName);
  const initialValues = useMemo(() => ({user: null, role: operatorRole ?? null}), [operatorRole]);

  const handleClose = resetForm => {
    resetForm();
    onClose();
  };

  const handleSubmit = (params, actions) => {
    formSubmitHandling(
      setUserRole,
      {id: params.user?.id, role_id: params.role?.id},
      actions,
      () => {
        trigger();
        onClose();
        enqueueSnackbar(`${currentRoleName} have successfully saved`);
      },
      () => {
        enqueueSnackbar(`${currentRoleName} have not saved, please check form fields`, {
          variant: 'error'
        });
      }
    );
  };

  return (
    <CustomizedDialogs
      type="form"
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      title={`Add ${currentRoleName} User`}
      text="Select Role and input user E-mail"
      data-testid="create-admin-modal"
      withCustomBtns
      updating={false}
    >
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSubmit}
        validationSchema={CreateAdminSchema}
        initialValues={initialValues}
        enableReinitialize
      >
        {({isSubmitting, dirty, resetForm, errors}) => (
          <Form>
            <SelectField
              name="role"
              label="Select Role"
              options={roles}
              errors={errors}
              placeholder="Role"
            />
            <SelectField
              name="user"
              label="User’s E-mail"
              options={users}
              placeholder="User"
              errors={errors}
              getOptionLabel={option => option.email}
              renderOption={(optionProps, option) => (
                <AutocompleteOption {...optionProps}>
                  <div>
                    <Paragraph>{option.email}</Paragraph>
                    <Paragraph size="sm">{option.full_name}</Paragraph>
                  </div>
                </AutocompleteOption>
              )}
            />
            <DialogActions>
              <ButtonOutlined
                data-testid="admin-modal-cancel-btn"
                onClick={() => handleClose(resetForm)}
              >
                Cancel
              </ButtonOutlined>
              <ButtonContained
                type="submit"
                data-testid="admin-modal-confirm-btn"
                disabled={isSubmitting || !dirty}
              >
                Add
              </ButtonContained>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </CustomizedDialogs>
  );
};

CreateAdminModal.propTypes = {
  currentRoleName: PropTypes.oneOf([
    UserRoleEnum.ADMIN,
    UserRoleEnum.MODERATOR,
    UserRoleEnum.MANAGER
  ]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

CreateAdminModal.defaultProps = {
  isOpen: false,
  loading: false,
  onClose: () => {},
  onSubmit: () => {}
};

export default CreateAdminModal;
