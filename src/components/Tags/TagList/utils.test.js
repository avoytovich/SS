import {getConfirmTagValues} from 'components/Tags/TagList/utils';

describe('TagList utils', () => {
  it('getConfirmTagValues', () => {
    const tag = {
      name: 'test tag name'
    };
    const result = {
      isOpen: true,
      text: `Would you like to remove "${tag.name}" tag?`,
      confirmText: 'Remove',
      cancelText: 'Cancel'
    };

    expect(getConfirmTagValues(tag)).toEqual(result);
  });
});
