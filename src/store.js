import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

// reducer

const initialState = {
  tipIntervalTime: 1 * 60 * 1000,
  players: [],
  matchInfo: {},
  tipQueue: [],
  timer: 0,
}

const gameInfoSlice = createSlice({
  name: 'gameInfo',
  initialState,
  reducers: {
    updateTipInterval: (state, { payload }) => {
      state.tipIntervalTime = payload.interval
    },
    setPlayers: (state, { payload }) => {
      state.players = payload.players
    },
    updatePlayer: (state, { payload }) => {
      state.players = [
        ...state.players.map((el) => {
          if (el.id != payload.id) return el
          return payload.player
        }),
      ]
    },
    setMatchInfo: (state, { payload }) => {
      state.matchInfo = payload.matchInfo
    },
    setTipQueue: (state, { payload }) => {
      state.tipQueue = payload.tipQueue
    },
    unqueueTip: (state) => {
      state.tipQueue = [...state.tipQueue.slice(1)]
    },
    reset: (state) => {
      Object.keys(initialState).forEach((key) => {
        state[key] = initialState[key]
      })
    },
    increaseTimer: (state, { payload }) => {
      state.timer = state.timer + payload
    },
    leaveMatch: (state, { payload }) => {
      state.tipQueue = [
        ...state.tipQueue.filter((el) => el.player.id !== payload.id),
      ]
    },
  },
})

export const {
  updateTipInterval,
  setPlayers,
  updatePlayer,
  setMatchInfo,
  setTipQueue,
  unqueueTip,
  reset,
  increaseTimer,
  leaveMatch,
} = gameInfoSlice.actions

const rootReducer = gameInfoSlice.reducer

// persistence

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store)
