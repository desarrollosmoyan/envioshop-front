import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    turn: null,
    type: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.type = action.payload.type;
    },
    setTurn: (state, action) => {
      state.turn = action.payload.turn;
    },
  },
});

const shipmentSlice = createSlice({
  name: "shipmentPage",
  initialState: {
    currentPage: 0,
    limit: 10,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    data: null,
    selected: null,
    selectedToSend: null,
  },
  reducers: {
    setRating: (state, action) => {
      state.data = action.payload.data;
    },
    selectRating: (state, action) => {
      state.selected = action.payload.selected;
    },
    selectToSend: (state, action) => {
      state.selectedToSend = action.payload.selectedToSend;
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

export const { setPage, setLimit } = shipmentSlice.actions;
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
    shipmentPage: shipmentSlice.reducer,
    pdf: pdf.reducer,
  },
});
