import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import postsService from './postsService';


const initialState = {
    posts: [],
    post:{},    
};

export const getAll = createAsyncThunk('post/getAll', async ()=>{
    try {
        return await postsService.getAll();
    } catch (error) {
        console.error(error);
    }
});

export const getById = createAsyncThunk('post/getById', async (_id, thunkAPI)=>{
    try {
       
        return await postsService.getById(_id);
    } catch (error) {
        
    }
});

export const getPostByTitle = createAsyncThunk('posts/getPostsByName', async (postTitle) => {
    try {
        return await postsService.getPostByTitle(postTitle);
    } catch (error) {
        console.error(error)
    }
});

export const createPost = createAsyncThunk('posts/createPost', async (data) =>{
    try{
        return await postsService.createPost(data);
    } catch (error){
        console.error(error)
    }
})

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        reset: (state) =>{
            state.isLoading = false;
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getAll.fulfilled,(state,action)=>{
            state.posts = action.payload
        });
        builder
        .addCase(getAll.pending,(state) =>{
            state.isLoading=true;
        });
        builder
        .addCase(getById.fulfilled,(state,action)=>{
            state.post= action.payload
        });
        builder
        .addCase(getPostByTitle.fulfilled, (state,action) =>{
            state.posts = action.payload            
        })
        .addCase(createPost.fulfilled, (state,action) =>{
            state.posts = [action.payload, ...state.posts]
        })
    }
})

export const {reset} = postsSlice.actions;
export default postsSlice.reducer