import { createSlice, current } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "filesSlice",
  initialState: { items: [] },
  reducers: {
    addFile(state, action) {
      state.items.push(action.payload);
    },
    removeFile(state, action) {
      return {
        ...state,
        items: state.items.filter((file) => {
          return file?.id != action.payload?.id;
        }),
      };
    },
    setFiles(state, action) {
      state.items = [...action.payload];
    },
  },
});

export default filesSlice.reducer;
export const { addFile, removeFile, setFiles } = filesSlice.actions;
