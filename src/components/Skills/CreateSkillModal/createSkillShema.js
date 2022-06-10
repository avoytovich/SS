import * as Yup from 'yup';

import yupLocale from 'constants/yupLocale';

Yup.setLocale(yupLocale);

const CreateSkillSchema = Yup.object().shape({
  name: Yup.string().min(2).max(500).required(),
  tags: Yup.array().max(10).nullable(),
  description: Yup.string().min(10).max(500).nullable()
});

export default CreateSkillSchema;
