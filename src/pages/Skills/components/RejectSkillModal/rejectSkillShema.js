import * as Yup from 'yup';

import yupLocale from 'constants/yupLocale';

import {isDuplicatedReason, isOtherReason} from './utils';

Yup.setLocale(yupLocale);

const RejectSkillSchema = Yup.object().shape({
  rejectReason: Yup.object().nullable().required(),
  duplicated: Yup.object().when('rejectReason', rejectReason =>
    isDuplicatedReason(rejectReason?.id)
      ? Yup.object().nullable().required()
      : Yup.object().nullable().notRequired()
  ),
  details: Yup.string().when('rejectReason', rejectReason =>
    isOtherReason(rejectReason?.id)
      ? Yup.string().min(2).max(1000).required()
      : Yup.string().notRequired()
  )
});

export default RejectSkillSchema;
