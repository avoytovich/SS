import * as Yup from 'yup';

import yupLocale from 'constants/yupLocale';

Yup.setLocale(yupLocale);

const ModifyGroupSchema = Yup.object().shape({
  name: Yup.string().min(2).max(60).required()
});

export default ModifyGroupSchema;
