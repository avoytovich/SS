import {createSlice} from '@reduxjs/toolkit';

import {SKILLS_LEVELS} from '../constants/common';

const initialState = {
  [SKILLS_LEVELS.BEGINNER]: [],
  [SKILLS_LEVELS.COMPETENT]: [],
  [SKILLS_LEVELS.ADVANCED]: [],
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
    setInitialSkillsSet: (state, {payload}) => {
      state[SKILLS_LEVELS.BEGINNER] = payload[SKILLS_LEVELS.BEGINNER];
      state[SKILLS_LEVELS.ADVANCED] = payload[SKILLS_LEVELS.ADVANCED];
      state[SKILLS_LEVELS.COMPETENT] = payload[SKILLS_LEVELS.COMPETENT];
    },
    setBasicSkills: (state, {payload}) => {
      state[SKILLS_LEVELS.BEGINNER] = [...state[SKILLS_LEVELS.BEGINNER], payload];
    }
  }
});

export const {setBasicSkills, moveSkills, removeSkill, setInitialSkillsSet} = skillsSlice.actions;

export default skillsSlice.reducer;
