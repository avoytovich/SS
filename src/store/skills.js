import {createSlice} from '@reduxjs/toolkit';

import {SKILLS_LEVELS} from '../constants/common';

const initialState = {
  [SKILLS_LEVELS.BASIC]: [],
  [SKILLS_LEVELS.INTERMEDIATE]: [],
  [SKILLS_LEVELS.ADVANCED]: [],
  [SKILLS_LEVELS.EXPERT]: [],
  senioritySkills: []
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    getAllSkills: state => {
      state.senioritySkills = [
        ...state[SKILLS_LEVELS.BASIC],
        ...state[SKILLS_LEVELS.INTERMEDIATE],
        ...state[SKILLS_LEVELS.ADVANCED],
        ...state[SKILLS_LEVELS.EXPERT]
      ];
    },
    removeSkill: (state, {payload: {from, selectedSkill}}) => {
      state[from] = state[from].filter(item => item.id !== selectedSkill.id);
    },
    removeSkills: (state, {payload: {from, to, selectedSkills}}) => {
      console.log(from, to, selectedSkills);
    },
    moveSkills: (state, {payload: {from, to, selectedSkills}}) => {
      console.log(from, to, selectedSkills);
    },
    setBasicSkills: (state, {payload}) => {
      state[SKILLS_LEVELS.BASIC] = [...state[SKILLS_LEVELS.BASIC], payload];
    }
  }
});

export const {setBasicSkills, getAllSkills, removeSkills, moveSkills, removeSkill} =
  skillsSlice.actions;

export default skillsSlice.reducer;
