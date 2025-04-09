import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../../features/commentSlice'
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
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Add Comment
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
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
      </div>
    </div>
  )
}

export default CommentForm