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
  BASIC: 'Basic',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert',
  NONE: 'None'
};

export const SKILLS_COLORS = {
  [SKILLS_LEVELS.BASIC]: 'blue',
  [SKILLS_LEVELS.INTERMEDIATE]: 'orange',
  [SKILLS_LEVELS.ADVANCED]: 'green',
  [SKILLS_LEVELS.EXPERT]: 'dark'
};

export const employeeSkillLevels = new Map([
  [SKILLS_LEVELS.NONE, 0],
  [SKILLS_LEVELS.BASIC, 1],
  [SKILLS_LEVELS.INTERMEDIATE, 2],
  [SKILLS_LEVELS.ADVANCED, 3],
  [SKILLS_LEVELS.EXPERT, 4]
]);
