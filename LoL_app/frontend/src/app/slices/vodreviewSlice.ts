import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { VODReviewComment,VODReviewState, Video} from "../../services/types/vod-reviews-types";
import { RootState } from '../store'

const initialState:VODReviewState = {
    comments: [],
    video: {
      url: '',
      title: ''
    },
    currentTimestamp:0,
    responseStatus: null
}

const vodreviewSlice = createSlice({
    name: 'vodreview',
    initialState: initialState,
    reducers:{
      addComment: (state,action:PayloadAction<VODReviewComment>)=>{
        state.comments?.push(action.payload)
        ///debugging 
        console.log('comment saved')
      },
      deleteComment: (state,action:PayloadAction<string>) => {
        /*might be a more performant way to do this but whatever */  
        const filteredcomments = state.comments?.filter((comment) => comment.id !== action.payload)
        state.comments = filteredcomments
      },
      editComment: (state,action:PayloadAction<VODReviewComment>) => {
        const commentedit = action.payload
        const editIndex = state.comments?.findIndex((comment)=>comment.id)
        state.comments[editIndex] = {
        id: commentedit.id,
        timestamp: commentedit.timestamp,
        text: commentedit.text,
       }
      },
      setVideoTitle: (state, action:PayloadAction<string>) => {
        state.video.title = action.payload
      },
      setVideoURL: (state, action:PayloadAction<string>) => {
        const url = action.payload
        state.video.url = url
      },
    }})
      
export const {addComment,deleteComment,editComment,setVideoTitle,setVideoURL} = vodreviewSlice.actions
export default vodreviewSlice.reducer;

///Selectors
export const getComments = (state:RootState) => {
  return state.vodreview.comments
}

export const getVideo = (state:RootState) => {
  console.log()
  return state.vodreview.video
}
