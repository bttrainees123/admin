import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../features/commentSlice'

const CommentForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [comment, setComment] = useState('')
    const [commentBy, setCommentBy] = useState('')

    const handleClear = () => {
        setUsername('')
        setComment('')
        setCommentBy('')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const commentData = {
            body: comment,
            user:{
                username: username,
                fullName: commentBy
            }
        }
        handleClear()
        dispatch(addComment(commentData))
        
    }
  return (
    <>
    <form style={{ margin: '70px' }}>
          <div className="form-inline" >
            <div className="form-group">
              <label>UserName: </label><br />
              <input type="text" value={username || ""} className="form-control" name="name" onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            </div>
            <div className="form-group">
              <label>Comment: </label><br />
              <textarea className="form-control" value={comment || ""} name="comment" onChange={(e) => setComment(e.target.value)} placeholder="Enter your comment here..." />
            </div>
            <div className="form-group">
              <label>Comment by: </label><br />
              <input type="text" value={commentBy || ""} className="form-control" name="commentBy" onChange={(e) => setCommentBy(e.target.value)} placeholder="Comment by" />
            </div>
          </div>
        <div className="button-section">
          <button className="btn btn-primary" onClick={handleSubmit} style={{ margin: '5px' }} type="submit">Submit</button>
        </div>
      </form></>
  )
}

export default CommentForm