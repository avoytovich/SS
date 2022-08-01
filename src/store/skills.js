import {createSlice} from '@reduxjs/toolkit';

import {SKILLS_LEVELS} from '../constants/common';

const initialState = {
  [SKILLS_LEVELS.BASIC]: [],
  [SKILLS_LEVELS.INTERMEDIATE]: [],
  [SKILLS_LEVELS.ADVANCED]: [],
  [SKILLS_LEVELS.EXPERT]: [],
  senioritySkills: [],
  allSkillsID: []
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    removeSkill: (state, {payload: {from, selectedSkill}}) => {
      state[from] = state[from].filter(item => item.id !== selectedSkill.id);
    },
    moveSkills: (state, {payload: {from, to, selectedSkillsId}}) => {
      const moved = state[to];

      state[from] = state[from].filter(item => {
        const isSelected = selectedSkillsId.indexOf(item.id) > -1;
        if (isSelected) moved.push(item);
        return !isSelected;
      });

      state[to] = moved;
    },
    setBasicSkills: (state, {payload}) => {
      state[SKILLS_LEVELS.BASIC] = [...state[SKILLS_LEVELS.BASIC], payload];
    }
  }
});

export const {setBasicSkills, moveSkills, removeSkill} = skillsSlice.actions;

export default skillsSlice.reducer;
