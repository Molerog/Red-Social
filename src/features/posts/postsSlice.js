import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  post: {},
  info: [],
  postToEdit:{},
  newPost:{}
};

export const getAll = createAsyncThunk("post/getAll", async () => {
  try {
    return await postsService.getAll();
  } catch (error) {
    console.error(error);
  }
  return reset.data
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
  "posts/getPostsByTitle",
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

export const getInfo = createAsyncThunk('auth/info', async ()=>{
  console.log('hola')
  try {
      return await postsService.getInfo();
  } catch (error) {
      console.error(error)
  }
})

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

export const editPost = createAsyncThunk("posts/edit", async (values) => {
  console.log(values)
  try {
    return await postsService.editPost(values);
  } catch (error) {
    console.error(error);
  }
});

export const getUserInfo = createAsyncThunk("posts/info", async () => {
  try {
    return await postsService.getUsersInfo();
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
    setPostToEdit: (state, action) =>{
      console.log(action.payload)
      state.postToEdit = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.posts = action.payload.reverse()
    });
    builder.addCase(getAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getById.fulfilled, (state, action) => {
      state.post = action.payload;
    });
    builder
      .addCase(getPostByTitle.fulfilled, (state, action) => {
        console.log(action.payload)
        state.posts = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.newPost = action.payload
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
    });
    builder
    .addCase(editPost.fulfilled, (state, action)=>{
      const posts = state.posts.map(post =>{
        if (post._id === action.payload.post._id){
          post = action.payload.post;
         
        }
        console.log(posts)
        return post
      })
      state.posts = posts
    });
    builder
    .addCase(getInfo.fulfilled, (state, action)=>{
      state.info = action.payload
  })
  .addCase(getUserInfo.fulfilled, (state, action) =>{
              state.info = action.payload
            })
  },
});

export const { reset, setPostToEdit } = postsSlice.actions;
export default postsSlice.reducer;
