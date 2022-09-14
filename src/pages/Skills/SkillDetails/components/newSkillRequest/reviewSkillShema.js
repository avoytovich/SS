import * as Yup from 'yup';

import yupLocale from 'constants/yupLocale';

Yup.setLocale(yupLocale);

const ReviewSkillSchema = Yup.object().shape({
  name: Yup.string().min(2).max(500).required(),
  groups: Yup.array().min(1).max(10).nullable(),
  description: Yup.string().min(10).max(500).nullable()
});

export default ReviewSkillSchema;
