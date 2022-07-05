import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  post: {},
};

export const getAll = createAsyncThunk("post/getAll", async () => {
  try {
    return await postsService.getAll();
  } catch (error) {
    console.error(error);
  }
});

export const getById = createAsyncThunk(
  "post/getById",
  async (_id, thunkAPI) => {
    try {
      return await postsService.getById(_id);
    } catch (error) {}
  }
);

export const getPostByTitle = createAsyncThunk(
  "posts/getPostsByName",
  async (postTitle) => {
    try {
      return await postsService.getPostByTitle(postTitle);
    } catch (error) {
      console.error(error);
    }
  }
);

export const createPost = createAsyncThunk("posts/createPost", async (data) => {
  try {
    return await postsService.createPost(data);
  } catch (error) {
    console.error(error);
  }
});

export const like = createAsyncThunk("posts/like", async (_id) => {
  try {
    return await postsService.like(_id);
  } catch (error) {
    console.error(error);
  }
});

export const dislike = createAsyncThunk("posts/dislike", async (_id) => {
  try {
    return await postsService.dislike(_id);
  } catch (error) {
    console.error(error);
  }
});

export const destroy = createAsyncThunk("posts/destroy", async (_id) => {
  try {
    return await postsService.destroy(_id);
  } catch (error) {
    console.error(error);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getById.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder
      .addCase(getPostByTitle.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(like.fulfilled, (state, action) => {
        const posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }
          return post;
        });
        state.posts = posts;
      });
    builder.addCase(dislike.fulfilled, (state, action) => {
      console.log(action.payload);
      const posts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          post = action.payload.post;
        }
        return post;
      });
      state.posts = posts;
    });
    builder
    .addCase(destroy.fulfilled, (state,action)=>{
      state.posts = state.posts.filter((post) => post._id !== action.payload.post._id) 
    })
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
