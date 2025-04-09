import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../features/commentSlice'
import { FloatingLabel } from 'react-bootstrap'

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
      user: {
        username: username,
        fullName: commentBy
      }
    }
    handleClear()
    dispatch(addComment(commentData))

  }
  return (
    <div className="accordion" id="accordionExample">
      <h2 className="accordion-header" id="headingOne">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Comment Append
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body"></div>
        <form style={{ margin: '70px' }}>
          <div className="form-inline" >
            <div className="form-group">
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <input type="text" value={username || ""} className="form-control" name="name" onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
              </FloatingLabel>
            </div>
            <div className="form-group">
              <FloatingLabel
                controlId="floatingInput"
                label="Comment"
                className="mb-3"
              >
                <textarea className="form-control" value={comment || ""} name="comment" onChange={(e) => setComment(e.target.value)} placeholder="Enter your comment here..." />
              </FloatingLabel>
            </div>
            <div className="form-group">
              <FloatingLabel
                controlId="floatingInput"
                label="Comment by"
                className="mb-3"
              >
                <input type="text" value={commentBy || ""} className="form-control" name="commentBy" onChange={(e) => setCommentBy(e.target.value)} placeholder="Comment by" />
              </FloatingLabel>
            </div>
          </div>
          <div className="button-section">
            <button className="btn btn-primary" onClick={handleSubmit} style={{ margin: '5px' }} type="submit">Submit</button>
          </div>
        </form></div>
    </div>
  )
}

export default CommentForm