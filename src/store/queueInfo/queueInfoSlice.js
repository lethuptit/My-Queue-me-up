import { createSlice } from '@reduxjs/toolkit';
import { deleteQueue, getQueueInfo, getQueueInfoByName } from '../asyncActions';

const queueInfoSlice = createSlice({
  name: 'queueInfo',
  initialState: {},
  reducers: {},

  extraReducers:builder=> {
    // handle fulfiled request
    builder.addCase([getQueueInfo.fulfilled],(state, action) => {
      return action.payload;
    })
    .addCase([getQueueInfoByName.fulfilled], (state, action) => {
      return action.payload;
    })
    .addCase([deleteQueue.fulfilled], (state, action) => {
      const { queueId } = action.payload;
      if (state.queueId === queueId) {
        return {
          ...state,
          status: 'DELETED',
        };
      }
      return state;
    })
  }
});

export default queueInfoSlice.reducer;

export const selectQueueInfo = (state) => state.queueInfo;
