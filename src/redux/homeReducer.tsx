import {
  createAction,
  createReducer,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";

//export const homeReducer = createReducer<HomeState>(
//{},
//{
/*action*/
//}
//);

//typeDef
//export interface HomeState {}

//! above = previous style

//! below = I'm gonna use "createSlice"

interface UserInfo {
  uid: any;
  photo: any;
  email: any;
  displayName: any;
}

interface InitialState {
  userInfo: UserInfo | null;
}

//? reducer collection
const user = createSlice({
  //name = actions' prefix
  name: "user",
  initialState: { userInfo: null } as InitialState,

  //deal specific action type like "switch"
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
});
//////////////////////////////////////////////////////////////////////////
interface ThreadState {
  threadId: string | null;
  threadName: string | null;
}

const thread = createSlice({
  name: "thread",
  initialState: { threadId: null, threadName: null } as ThreadState,
  reducers: {
    setThread: (state, action: PayloadAction<ThreadState>) => {
      state.threadId = action.payload.threadId;
      state.threadName = action.payload.threadName;
    },
  },
});

export const homeReducer = {
  user: user.reducer,
  thread: thread.reducer,
};

export interface CombinedReducerState {
  user: InitialState;
  thread: ThreadState;
}

//? it is like "redux-duck" or redux-thunk?
//? if I set "dispatch(login(payload))" => it generates an action like
//? "{action:"login" , payload: function}"
export const { login, logout } = user.actions;
export const { setThread } = thread.actions;

export const selectUser = (state: CombinedReducerState) => {
  return state.user;
};

export const selectThread = (state: CombinedReducerState) => {
  return state.thread;
};
