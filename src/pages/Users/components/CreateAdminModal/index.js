import PropTypes from 'prop-types';
import {Formik} from 'formik';
import {useSnackbar} from 'notistack';

import {UserRoleEnum} from 'constants/userRoles';
import CustomizedDialogs from 'components/Modals/CustomizedDialogs';
import {useLazyFetchManagementsQuery, useSetUserRoleMutation} from 'services/users';
import {formSubmitHandling} from 'utils/forms';

import {CreateAdminSchema, initialValues} from './createAdminShema';
import CreateAdminFrom from './CreateAdminFrom';

const CreateAdminModal = ({isOpen, tab, onClose}) => {
  const {enqueueSnackbar} = useSnackbar();
  const [setUserRole] = useSetUserRoleMutation();
  const [trigger] = useLazyFetchManagementsQuery({role: tab});

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
        enqueueSnackbar('Admin have successfully saved');
      },
      () => {
        enqueueSnackbar('Admin have not saved, please check form fields', {variant: 'error'});
      }
    );
  };

  return (
    <CustomizedDialogs
      type="form"
      isOpen={isOpen}
      onClose={onClose}
      onCancel={onClose}
      title="Add Admin User"
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
          <CreateAdminFrom
            isSubmitting={isSubmitting}
            dirty={dirty}
            resetForm={resetForm}
            errors={errors}
            onClose={handleClose}
          />
        )}
      </Formik>
    </CustomizedDialogs>
  );
};

CreateAdminModal.propTypes = {
  tab: PropTypes.oneOf([UserRoleEnum.ADMIN, UserRoleEnum.MODERATOR, UserRoleEnum.MANAGER])
    .isRequired,
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
