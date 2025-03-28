import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getComments } from '../features/commentSlice'
import eye from "../image/eye.svg"
import deletePic from "../image/delete1.svg"
import CommentForm from './CommentForm'

const Comment = () => {
    const dispatch = useDispatch()
    const { isLoading, isError, data } = useSelector((state) => state.comments)

    useEffect(() => {
        dispatch(getComments())
    }, [dispatch])
    return (
        <div className="">
            <button className="list-btn purple " style={{ width: "200px", marginLeft: "40%" }}>Comments  ({data.length})</button>
            <div className="list-data">
                <ul className="list-data-items row">
                    {data.length ? (data.map((comment, ind) => (
                        <li key={ind} className="list-card mb-3 col-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="font-14 mb-0 color-purple"><span className="me-2"><svg width="10"
                                    height="10" viewBox="0 0 10 10" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="10" height="10" rx="5" fill="#924AEF" />
                                </svg>
                                </span>{comment.user.username}</p>
                                <div className="company-logo-dropdown">
                                    <div className="dropdown">
                                        <button
                                            className="dropdown-toggle border-0 w-100 d-flex align-items-center"
                                            type="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            <img src='{ellipsis}' alt='' />
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end w-100 shadow">
                                            <li><Link className="dropdown-item" to="/"><img
                                                src={eye} className="me-1" alt='' />View
                                            </Link></li>
                                            <li><Link className="dropdown-item" to="/" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                <img
                                                    src={deletePic} alt='' className="me-1" />Delete</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <p className="font-14 my-3 color-para">{comment.body}</p>

                            <div className="d-flex align-items-center gap-3 list-card-user-profile">
                                <img src='https://avatar.iran.liara.run/public' style={{ maxWidth: "30px", }} alt='' />
                                <p className="font-14 mb-0 body-sub-heading ">Comment by: <span>{comment.user.fullName}</span></p>
                            </div>
                        </li>))) : isLoading ? <h5 style={{ textAlign: 'center' }}>Loading...</h5> : <h5 style={{ textAlign: 'center' }}>{'some thing wents wrong' || isError}</h5>}
                </ul>
            </div>
            <CommentForm />

        </div>
    )
}

export default Comment