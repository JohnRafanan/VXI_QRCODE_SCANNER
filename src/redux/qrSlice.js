// src/redux/qrSlice.js
import { createSlice } from '@reduxjs/toolkit';

const qrSlice = createSlice({
  name: 'qr',
  initialState: {
    scannedText: '',
  },
  reducers: {
    setScannedText: (state, action) => {
      state.scannedText = action.payload;
    },
    // clearScannedText: (state) => {
    //   state.scannedText = null;
    // },
  },
});

export const { setScannedText, clearScannedText } = qrSlice.actions;
export default qrSlice.reducer;