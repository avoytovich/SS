import * as Yup from 'yup';

import yupLocale from 'constants/yupLocale';

Yup.setLocale(yupLocale);

export const CreateSkillSetSchema = Yup.object().shape({
  name: Yup.string().min(1).max(60).required(),
  description: Yup.string().min(1).required(),
  comment: Yup.string().min(1).max(200)
});

export const initialValues = {
  name: '',
  description: '',
  comment: ''
};
