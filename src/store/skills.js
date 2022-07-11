import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  basicSkills: []
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setBasicSkills: (state, {payload}) => {
      state.basicSkills = [...state.basicSkills, payload];
    }
  }
});

export const {setBasicSkills} = skillsSlice.actions;

export default skillsSlice.reducer;
