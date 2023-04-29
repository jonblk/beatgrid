import { configureStore, Store } from "@reduxjs/toolkit";
import { PlaybackReducer } from "./features/playback";
import gridReducer from "./features/grid/gridSlice";
import settingsReducer, {ISettingsState} from "./features/settings/settingsSlice";
import { Reducer, AnyAction } from "@reduxjs/toolkit";

const reducer = {
  reducer: {
    settings: settingsReducer,
    playback: PlaybackReducer,
    grid: gridReducer,
  },
};

const store = configureStore(reducer)

export const initializeStore = (savedSettings?: ISettingsState) => {
  let params = savedSettings ? 
    {  
      preloadedState: { 
        settings: { 
          ...store.getState().settings, 
          ...savedSettings 
        }
      }, 
      ...reducer
    } 
    : reducer

  return configureStore(params);
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
