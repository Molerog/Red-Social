import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  message: "",
  info:{}
};

const userUpdated = JSON.parse(localStorage.getItem("userUpdated"));

const initialState2 = {
  userUpdated: userUpdated ? userUpdated : null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await authService.logout();
  } catch (error) {
    console.error(error);
  }
});

export const updateUsers = createAsyncThunk("auth/update", async (data) => {
  try {
    return await authService.updateUsers(data);
  } catch (error) {
    console.error(error);
  }
});

// export const getUsersById = createAsyncThunk("auth/byId", async (_id) => {
//   try {
//     return await authService.getUsersById(_id);
//   } catch (error) {
//     console.error(error);
//   }
// });

export const getUserInfo = createAsyncThunk("auth/info", async () => {
    try {
      return await authService.getUserInfo();
    } catch (error) {
      console.error(error);
    }
  });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  initialState2,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(updateUsers.fulfilled, (state, action) => {
      //   console.log(
      //     "soy el action metiendo el user actualizado en el estado",
      //     action.payload
      //   );
      //   state.user.user.name = action.payload.user.name;
      //   state.user.user.email = action.payload.user.email;
      //   state.user.user.password = action.payload.user.password;
      //   state.user.user.imagepath = action.payload.user.imagepath;
      // })
      .addCase(updateUsers.fulfilled, (state, action) => {
        state.userUpdated = action.payload;
      })
      // .addCase(getUsersById.fulfilled, (state, action) => {
      //   // console.log(action.payload.user)
      //   state.user = action.payload;
      // });
    .addCase(getUserInfo.fulfilled, (state, action) =>{
      state.info = action.payload
    })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
