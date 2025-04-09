import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../features/postSlice'
import { Card } from 'react-bootstrap'

const Post = () => {
    const dispatch = useDispatch()
    const { loading, error, res } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(getPost())
        console.log("Resss", res);
        
    }, [dispatch])
    return (
        <div>
            {res.length ? (res.map((post, ind) => {
                // <Card key={ind} style={{ width: '18rem' }}>
                //     <Card.Body>
                //         <Card.Title>{post.title}</Card.Title>
                //         <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                //         <Card.Text>
                //             {post.body}
                //         </Card.Text>
                        
                //     </Card.Body>
                // </Card>
                <p>{post.title}</p>
            })): <p>Loading...</p>}

        </div>
    )
}

export default Post