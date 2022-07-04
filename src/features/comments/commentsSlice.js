import {createAsyncThunk} from '@reduxjs/toolkit';
import commentsService from './commentsService'



export const createComment = createAsyncThunk('posts/getPostsByName', async (data) =>{
    try {
        return await commentsService.createComment(data);
    } catch (error) {
        console.error(error)
    }
})

export default createComment