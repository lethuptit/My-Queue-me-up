import { combineReducers, configureStore } from '@reduxjs/toolkit';
import queuesReducer from './queues';
import tokensReducer from './tokens';
import queueInfoReducer from './queueInfo';
import actionStatusReducer from './actionStatus';
import tokenReducer from './token';
import selectedQueueReducer from './selectedQueue';
import selectedQueueHistoryReducer from './selectedQueueHistory';
import appReducer from './appSlice';

export const rootReducer = combineReducers({
  appReducer,
  queues: queuesReducer,
  tokens: tokensReducer,
  queueInfo: queueInfoReducer,
  token: tokenReducer,
  actionStatus: actionStatusReducer,
  selectedQueue: selectedQueueReducer,
  selectedQueueHistory: selectedQueueHistoryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: {
      // Ignore auth in async thunks
      ignoredActionPaths: ['meta.arg.auth'],
    },
  }),
});


