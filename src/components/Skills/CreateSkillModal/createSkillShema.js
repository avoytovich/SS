import * as Yup from 'yup';

import yupLocale from 'constants/yupLocale';

Yup.setLocale(yupLocale);

const CreateSkillSchema = Yup.object().shape({
  name: Yup.string().min(2).max(500).required(),
  description: Yup.string().min(10).max(500)
});

export default CreateSkillSchema;
