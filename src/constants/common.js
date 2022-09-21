export const CompanyUrl = 'https://capgemini-engineering.com.ua/';

export const INIT_PAGE = 'init-page';
export const SESSION_KEY = 'auth';
export const PREFIX_KEY = 'ss';

export const INPUT_TYPES = {
  CHECKBOX: 'checkbox',
  SWITCH: 'switch',
  RADIO: 'radio',
  SELECT: 'select',
  TEXTAREA: 'textarea',
  TEXT: 'text',
  NUMBER: 'number',
  EMAIL: 'email',
  DATE: 'date',
  PASSWORD: 'password'
};

export const SKILLS_LEVELS = {
  BEGINNER: 'beginner',
  COMPETENT: 'competent',
  ADVANCED: 'advanced'
};

export const SKILLS_LEVELS_NAMES = {
  BEGINNER: 'Beginner',
  COMPETENT: 'Competent',
  ADVANCED: 'Advanced'
};

export const SKILLS_COLORS = {
  [SKILLS_LEVELS.BEGINNER]: 'blue',
  [SKILLS_LEVELS.COMPETENT]: 'orange',
  [SKILLS_LEVELS.ADVANCED]: 'green'
};

export const employeeSkillLevels = new Map([
  [SKILLS_LEVELS.BEGINNER, 1],
  [SKILLS_LEVELS.COMPETENT, 2],
  [SKILLS_LEVELS.ADVANCED, 3]
]);

export const REJECT_REASONS = [
  {
    id: 'duplicated',
    name: 'Duplicated'
  },
  {
    id: 'other',
    name: 'Other'
  }
];
