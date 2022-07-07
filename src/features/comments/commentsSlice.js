import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
  comments: {},
};

export const createComment = createAsyncThunk(
  "comments/getPostsByName",
  async (data) => {
    try {
      return await commentsService.createComment(data);
    } catch (error) {
      console.error(error);
    }
  }
);

export const like = createAsyncThunk("comments/like", async (_id) => {
  console.log(_id);
  try {
    return await commentsService.like(_id);
  } catch (error) {
    console.error(error);
  }
});

export const dislike = createAsyncThunk("comments/dislike", async (_id) => {
  try {
    return await commentsService.dislike(_id);
  } catch (error) {
    console.error(error);
  }
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(like.fulfilled, (state, action) => {
       
        state.comments = action.payload;
      })
      .addCase(dislike.fulfilled, (state, action) => {
        
        state.comments = action.payload;
      });
    },
});

export const { reset } = commentsSlice.actions;
export default commentsSlice.reducer;

// export default createComment
