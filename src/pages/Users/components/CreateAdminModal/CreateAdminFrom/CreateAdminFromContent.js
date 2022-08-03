import SelectField from 'components/Common/Form/Select';
import {AutocompleteOption} from 'components/Autocomplete';
import {Paragraph} from 'components/Typography';
import {useFetchUserRolesQuery, useFetchUsersAutocompleteQuery} from 'services/users';
import {UserRoleEnum} from 'constants/userRoles';

const CreateAdminFromContent = ({errors}) => {
  const {data: roles = []} = useFetchUserRolesQuery();
  const {data: users = []} = useFetchUsersAutocompleteQuery();
  const operators = [UserRoleEnum.ADMIN, UserRoleEnum.MODERATOR, UserRoleEnum.MANAGER];
  const operatorRoles = roles.filter(role => operators.includes(role.name));

  return (
    <>
      <SelectField
        name="role"
        label="Select Role"
        options={operatorRoles}
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
    </>
  );
};

export default CreateAdminFromContent;
