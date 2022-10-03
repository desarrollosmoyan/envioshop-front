import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    turn: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    setTurn: (state, action) => {
      state.turn = action.payload.turn;
    },
  },
});

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    data: null,
    selected: null,
  },
  reducers: {
    setRating: (state, action) => {
      state.data = action.payload.data;
    },
    selectRating: (state, action) => {
      state.selected = action.payload.selected;
    },
  },
});

const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    data: null,
  },
  reducers: {
    setShipping: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

const pdf = createSlice({
  name: "pdf",
  initialState: {
    data: null,
  },
  reducers: {
    setPdf: (state, action) => {
      state.data = action.payload.data;
    },
  },
});
const franchiseSlice = createSlice({
  name: "franchise",
  initialState: {
    list: [],
  },
  reducers: {
    setFranchisesList: (state, action) => {
      state.list = [...action.payload.list];
    },
  },
});
export const { setShipping } = shippingSlice.actions;
export const { setUser } = userSlice.actions;
export const { setPdf } = pdf.actions;
export const { setFranchisesList } = franchiseSlice.actions;
export const { setRating, selectRating } = ratingSlice.actions;
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    rating: ratingSlice.reducer,
    shipping: shippingSlice.reducer,
    franchise: franchiseSlice.reducer,
    pdf: pdf.reducer,
  },
});
