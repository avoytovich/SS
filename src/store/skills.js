import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  basicSkills: [],
  intermediateSkills: [],
  advancedSkills: [],
  expertSkills: [],
  senioritySkills: []
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    getAllSkills: state => {
      state.senioritySkills = [
        ...state.basicSkills,
        ...state.intermediateSkills,
        ...state.advancedSkills,
        ...state.expertSkills
      ];
    },
    setBasicSkills: (state, {payload}) => {
      state.basicSkills = [...state.basicSkills, payload];
    }
  }
});

export const {setBasicSkills, getAllSkills} = skillsSlice.actions;

export default skillsSlice.reducer;
