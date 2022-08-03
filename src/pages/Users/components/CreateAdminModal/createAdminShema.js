import * as Yup from 'yup';

import yupLocale from 'constants/yupLocale';

Yup.setLocale(yupLocale);

const CreateAdminSchema = Yup.object().shape({
  user: Yup.object().nullable().required(),
  role: Yup.object().nullable().required()
});

const initialValues = {user: null, role: null};

export {CreateAdminSchema, initialValues};
