import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [

];

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addMember: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, role, email) {
        return { payload: { id: nanoid(), name, role, email } };
      }
    },
    updateMember(state, action) {
      const { id, name, role, email } = action.payload;
      const member = state.find(m => m.id === id);
      if (member) {
        if (name !== undefined) member.name = name;
        if (role !== undefined) member.role = role;
        if (email !== undefined) member.email = email;
      }
    },
    removeMember(state, action) {
      return state.filter(m => m.id !== action.payload);
    }
  }
});

export const { addMember, updateMember, removeMember } = teamSlice.actions;
export default teamSlice.reducer;