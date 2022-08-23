import {REJECT_REASONS} from 'constants/common';

import {
  getResetFormField,
  isDuplicatedReason,
  isOtherReason,
  getSubmitValues,
  initialState
} from '../utils';

describe('RejectSkillModal utils test', () => {
  describe('isDuplicatedReason', () => {
    it('should be duplicated', () => {
      expect(isDuplicatedReason('duplicated')).toBeTruthy();
    });
    it('should not be duplicated', () => {
      expect(isDuplicatedReason('other')).toBeFalsy();
    });
  });
  describe('isOtherReason', () => {
    it('should be other reason', () => {
      expect(isOtherReason('other')).toBeTruthy();
    });
    it('should not be other reason', () => {
      expect(isOtherReason('duplicated')).toBeFalsy();
    });
  });
  describe('getResetFormField', () => {
    it('should reset details filed', () => {
      const result = {name: 'duplicated', value: initialState.duplicated};

      expect(getResetFormField('other')).toEqual(result);
    });
    it('should reset details filed', () => {
      const result = {name: 'details', value: initialState.details};

      expect(getResetFormField('duplicated')).toEqual(result);
    });
  });

  it('should return submit value', () => {
    const result = {
      id: 'skill-test-id',
      reviewer_id: 'review-test-id',
      reject_reason: REJECT_REASONS[1].id,
      duplicated_skill_id: null,
      details: null
    };

    expect(getSubmitValues('skill-test-id', 'review-test-id', REJECT_REASONS[1], null, '')).toEqual(
      result
    );
  });
});
