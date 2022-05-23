import {getConfirmSkillValues} from 'components/Skills/SkillsList/utils';

describe('Skills list utils', () => {
  it('getConfirmSkillValues', () => {
    const skill = {
      name: 'test skill name'
    };
    const result = {
      isOpen: true,
      text: `Would you like to remove "${skill.name}" skill?`,
      confirmText: 'Remove',
      cancelText: 'Cancel'
    };

    expect(getConfirmSkillValues(skill)).toEqual(result);
  });
});
