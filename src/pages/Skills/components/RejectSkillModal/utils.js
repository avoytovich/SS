import {REJECT_REASONS} from 'constants/common';

export const initialState = {rejectReason: null, duplicated: null, details: ''};

export const isDuplicatedReason = reasonId => reasonId === REJECT_REASONS[0].id;

export const isOtherReason = reasonId => reasonId === REJECT_REASONS[1].id;

export const getResetFormField = reasonId =>
  isDuplicatedReason(reasonId)
    ? {name: 'details', value: initialState.details}
    : {name: 'duplicated', value: initialState.duplicated};

export const getSubmitValues = (id, reviewerId, rejectReason, duplicated, details) => ({
  id,
  reviewer_id: reviewerId,
  reject_reason: rejectReason?.id,
  duplicated_skill_id: duplicated?.id || null,
  details: details || null
});
