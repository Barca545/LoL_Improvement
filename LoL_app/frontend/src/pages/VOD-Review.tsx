import React, {useState,useRef} from "react";
import {v4 as uuid} from 'uuid';
import { VODReviewComment, Video} from "../services/types/vod-reviews-types";
import { useAppDispatch,useAppSelector } from "../app/hooks";
import {addComment,deleteComment,editComment,getComments,getVideo,setVideoTitle,setVideoURL} from '../app/slices/vodreviewSlice'
import ReactPlayer from "react-player";

///USING REACT-PLAYER NOT react-youtube OR video-react

///installed uuid

///needs to play immediately after seeking


const VideoPlayer = () => {
  const reactPlayerRef = useRef<ReactPlayer>(null);
  const time = reactPlayerRef.current?.getCurrentTime()
  const dispatch = useAppDispatch()
  const video = useAppSelector(getVideo)
  const [videoTitle,setTitle] = useState(video.title)
  const [videoURL,setURL] = useState(video.url)

  const handleSaveVideo = () => {
    dispatch(setVideoURL(videoURL))
    dispatch(setVideoTitle(videoTitle))
    setTitle('')
    setURL('')
  } 

  /*steal the set duration thing as well from the below
  https://codesandbox.io/s/useref-for-react-player-qss7k*/

  function timestampConverter(timestamp:string){
    /*
     issue is that it is not waiting to parse for the full number it is doing it onchange
    */
    const count = timestamp.split(':').length
    console.log(count)
    if (count>=3) {
      const [hoursstring, minutesstring, secondsstring] = timestamp.split(':');
      const hours = parseInt(hoursstring,10)
      const minutes = parseInt(minutesstring,10)
      const seconds = parseInt(secondsstring,10)
      const fulltime = (hours * 60 *60) + (minutes*60) + seconds
      return fulltime
    }
    else if (count==2) {
      const [minutesstring, secondsstring] = timestamp.split(':');
      const minutes = parseInt(minutesstring,10)
      console.log('minutes' +minutes)
      const seconds = parseInt(secondsstring,10)
      console.log('seconds' +seconds)
      console.log('seconds string' +secondsstring)
      const fulltime = (minutes*60) + seconds
      return fulltime
    }
    else {
      const [secondsstring] = timestamp.split(':');
      const seconds = parseInt(secondsstring,10)
      return seconds
    }
  };

  const handleSeek = (time:number) => {
    reactPlayerRef.current?.seekTo(time)
  }

  const getCurrentTime = () => {
    ///figure out how to make this not return undefined 
    const time = reactPlayerRef.current?.getCurrentTime()
    return time
  }

  const CommentSidebar = () => {
    /*need a utility to show and hide the comment bar 
    possibly make it display the full text of whatever comment is focused*/
    const comments = useAppSelector(getComments)
    return(
      <div className="comment-sidebar">
        <CreateComment />
        {comments.map((comment) => (
          <Comment 
          key={comment.id}
          id={comment.id}
          timestamp={comment.timestamp}
          text={comment.text}/> 
        ))}
      </div>
    )
  } 
  
  const Comment = (comment:VODReviewComment) => {
    const [editstate,setEditState] = useState(false)
    
    const EditComment = (props:any) =>{
      const id = props.id
      const [inputText,setinputText] = useState(props.text)
      const [inputTimestamp,setInputTimestamp] = useState<string>(props.timestamp[1]); 
      const [ouputTimestamp,setOutputTimestamp] = useState(0); 
      
      /*add feature that lets user set timestamp or set it to the current time*/
      const handleTimestamp = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputTimestamp(e.target.value)
        const timestamp = timestampConverter(inputTimestamp)
        setOutputTimestamp(timestamp)
      }
      
      const handleEdit = () => {
        const comment:VODReviewComment = {
          id: id,
          timestamp:[ouputTimestamp,inputTimestamp],
          text:inputText,
        }
        dispatch(editComment(comment))
        setEditState(false)
      }
      const handleCancel = () => {
        const comment:VODReviewComment = {
          id: id,
          timestamp:props.timestamp,
          text:props.text,
        }
        dispatch(editComment(comment))
        setEditState(false)
      }
    
      return(
        <>
          <input type="text" className="create-timestamp"
          value={inputTimestamp}
          placeholder="Set timestamp"
          onChange={(e) => {setInputTimestamp(e.target.value)}}
          onBlur={(e) => {handleTimestamp(e)}}
          />
          <div className="create-comment">
            <textarea
            value={inputText}
            placeholder="New Comment..."
            onChange={(e) => {setinputText(e.target.value)}}
            />
          </div>
          <div className="create-comment-footer">
            <button className="comment-save" onClick={()=>handleEdit()}> Save Edits </button>
            <button className="comment-save" onClick={()=>handleCancel()}> Cancel Edits </button>
          </div>
        </>
      )
    }
  
    if (editstate===false) {
      return(
        <div className="comment">
          <div className="time-stamp" onClick={()=>handleSeek(comment.timestamp[0])}> {comment.timestamp[1]} </div>
          <div className="comment-body" key={comment.id} id={comment.id}>
            {comment.text}
          </div>
          <div className="comment-footer">
            <button onClick={()=>dispatch(deleteComment(comment.id))}>Delete</button>
            <button onClick={()=>{setEditState(true)}}>Edit</button>
          </div>
        </div>
      )
    }
    else{
      return(
      <EditComment id={comment.id} text={comment.text} timestamp={comment.timestamp}/>
      )}
  }
  
  ///could possible make savehandler an if statement and then reuse create comment for edit comment
  const CreateComment = () =>{
    const [inputText,setinputText] = useState ('')
    const [inputTimestamp,setInputTimestamp] = useState(''); 
    const [ouputTimestamp,setOutputTimestamp] = useState(0); 
    
    /*add feature that lets user set timestamp or set it to the current time*/
    const handleTimestamp = (e:React.ChangeEvent<HTMLInputElement>) => {
      setInputTimestamp(e.target.value)
      const timestamp = timestampConverter(inputTimestamp)
      setOutputTimestamp(timestamp)
    }

    const handleSave = () => {
      ///add a seperate action here that sends it to the the backend onsave
      const comment:VODReviewComment = 
      { id: uuid(),
        timestamp:[ouputTimestamp,inputTimestamp],
        text:inputText,
      }
      dispatch(addComment(comment))
      setinputText('')
      setInputTimestamp('')
    }
    
    return(
      <>
        <input type="text" className="create-timestamp"
        value={inputTimestamp}
        placeholder="Set timestamp"
        onChange={(e) => {setInputTimestamp(e.target.value)}}
        onBlur={(e) => {handleTimestamp(e)}}
        />
        <div className="create-comment">
          <textarea
          value={inputText}
          placeholder="New Comment..."
          onChange={(e) => {setinputText(e.target.value)}}
          />
        </div>
        <div className="create-comment-footer">
          <input type="button" value='Save' className="comment-save" onClick={handleSave}/>
        </div>
      </>
    )
  }

  return (
  <>
    <form>
      <h4>Enter Youtube URL</h4>
      <input type={"text"} value={videoURL} onChange={(e)=>setURL(e.target.value)}/>
      <h4>Enter Video Title</h4>
      <input type={"text"} value={videoTitle} onChange={(e)=>setTitle(e.target.value)}/>
      <input type="button" value='Save Video' onClick={()=>handleSaveVideo()}></input>
    </form>
    <h3>{video.title}</h3>
    <ReactPlayer
        ///url="https://www.youtube.com/watch?v=ddcTY2tn26w"
        url={video.url}
        config={{
          youtube: {
            playerVars: { controls: 1 }
          }
        }}
        ref={reactPlayerRef}
      />
    <CommentSidebar/>  
  </>
  )
}

export default VideoPlayer