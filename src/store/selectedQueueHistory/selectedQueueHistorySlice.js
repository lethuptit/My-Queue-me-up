/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { getSelectedQueueHistory } from '../asyncActions';

const selectedQueueHistorySlice = createSlice({
  name: 'selectedQueueHistory',
  initialState: {
    events: [],
  },
  reducers: {},
  extraReducers:(builder)=> {
    // handle fulfilled request
    builder.addCase([getSelectedQueueHistory.fulfilled], (state, action) => {
      return action.payload;
    })
  }
});

export default selectedQueueHistorySlice.reducer;

export const selectQueueHistoryEvents = (state) => state.selectedQueueHistory;
