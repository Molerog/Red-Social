import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import postsService from './postsService';


const initialState = {
    posts: [],
    isLoading: false,
    post:{},
    isPending: false,
    
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
        const message = error.response.data.message
    }
});

export const getPostByTitle = createAsyncThunk('posts/getPostsByName', async (postTitle) => {
    try {
        return await postsService.getPostByTitle(postTitle);
    } catch (error) {
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
    }
})

export const {reset} = postsSlice.actions;
export default postsSlice.reducer