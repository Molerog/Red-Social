import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
    users: []  
};

export const getUsers = createAsyncThunk('users/get', async()=>{
    try {
       return await userService.getUsers();
    } catch (error) {
        console.error(error);
    }
});

export const follow = createAsyncThunk('users/follow', async(_id)=>{
    try {
       return await userService.follow(_id);
    } catch (error) {
        console.error(error);
    }
});


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        reset: (state) =>{
            state.isError = false;
            state.isSuccess= false;
            state.message = "";
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getUsers.fulfilled, (state,action) =>{
            state.users = action.payload
        })
        .addCase(follow.fulfilled, (state,action)=>{
            const users = state.users.map((user)=>{
                if (user._id === action.payload._id){
                    user = action.payload
                }
                return user;
            })
            state.users = users;
        })
    }
});

export const {reset} = usersSlice.actions;
export default usersSlice.reducer;