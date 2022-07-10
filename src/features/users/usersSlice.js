import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
    users: [],
    user: {}
};

export const getUsers = createAsyncThunk("users/get", async() => {
    try {
        return await userService.getUsers();
    } catch (error) {
        console.error(error);
    }
});

export const follow = createAsyncThunk("users/follow", async(_id) => {
    try {
        return await userService.follow(_id);
    } catch (error) {
        console.error(error);
    }
});

export const unfollow = createAsyncThunk("users/unfollow", async(_id) => {
    try {
        return await userService.unfollow(_id);
    } catch (error) {
        console.error(error);
    }
});

export const getUsersByName = createAsyncThunk("users/byName", async(name) => {
    try {
        return await userService.getUsersByName(name);
    } catch (error) {
        console.error(error);
    }
});

export const deleteUsers = createAsyncThunk("users/delete", async(name) => {
    try {
        return await userService.deleteUsers(name);
    } catch (error) {
        console.error(error);
    }
});


export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
        resetSearch: (state) => {
            state.users = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(follow.fulfilled, (state, action) => {
                const users = state.users.map((user) => {
                    if (user._id === action.payload.user._id) {
                        user = action.payload.user;
                    }
                    return user;
                });
                state.users = users;
            })
            .addCase(unfollow.fulfilled, (state, action) => {
                const users = state.users.map((user) => {
                    if (user._id === action.payload._id) {
                        user = action.payload;
                    }
                    return user;
                });
                state.users = users;
            })
            .addCase(getUsersByName.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(deleteUsers.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user._id !== action.payload.user._id)
            })
    },
});

export const { reset, resetSearch } = usersSlice.actions;
export default usersSlice.reducer;