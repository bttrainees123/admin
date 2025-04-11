import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clock from "../image/clock.png"
import angleDown from "../image/angle-down.png"
import play from "../image/play.png"
import notification from "../image/notification.svg"
import deletePic from "../image/delete1.svg"
import pdf from "../image/pdf.png"
import image from "../image/image.png"
import Comment from './Comment'
import Sideer from '../sider/Sideer'
import Company from './Company'

const ProjectDetails = () => {

    const navigate = useNavigate()
    let checkView = false
    let checkEditor = false
    let checkAdd = false
    let checkDelete = false
    const [viewEdit, setViewEdit] = useState(false)
    const [viewAdd, setViewAdd] = useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log("Loggedin ", user);

        if (user) {
            handleRoles(user.access)
        }
    }, [])

    const handleRoles = (access) => {
        console.log('role.length ', ...access);
        const accessRole = [...access]
    
        let len = accessRole.length
    
        for (let i = 0; i < len; i++) {
          if (accessRole[i] === 'View ' && checkView === false) {
            checkView = true
            console.log('heckView', checkView);
          }
          if (accessRole[i] === 'Edit ' && checkEditor === false) {
            checkEditor = true
            console.log('heckEditor', checkEditor);
          }
          if (accessRole[i] === 'Delete ' && checkDelete === false) {
            checkDelete = true
            console.log('heckDelete', checkDelete);
          }
          if (accessRole[i] === 'Add ' && checkAdd === false) {
            checkAdd = true
            console.log('heckAdd', checkAdd);
          }
        }
        // console.log("checkView", checkView, "checkEditor", checkEditor, "checkDelete", checkDelete, "checkAdd", checkAdd);
        handleAccessChange()
      }
    
      const handleAccessChange = () => {
        if (checkView && checkEditor) {
          setViewEdit(true)
          return;
        }
        if (checkView) {
          setViewAdd(true)
        }
      }

    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", false)
        navigate("/login")
    }
    return (
        <>
            <div className="main_container">
                <div className="limani_body">

                    <Sideer />
                    <div className="intersight_content">
                        <div className="body_content">
                            <div className="top_header d-flex align-items-center justify-content-between">
                                <h1>Excel To Insight Consulting</h1>
                                <div className="header_notification d-flex align-items-center gap-2">
                                    <div className="filter-dropdown green-filter dropdown time-tracking">
                                        <button className="btn filter-btn green-filter-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span><img src={clock} alt="" className="fltrimg" /> 00 : 12 : 01</span> <img src={angleDown} className="ms-1" alt="" />
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-end p-0">
                                            <div className="tracker_heading">
                                                <h6>Track Your Time</h6>
                                                <p>Select project and task to start tracking</p>
                                            </div>
                                            <div className="tracker-selection">
                                                <div className="row align-items-center">
                                                    <div className="col-md-5">
                                                        <div className="time_start border-end text-center">
                                                            <button className="btn"><img src={play} alt='' /></button>
                                                            <div className="time_record text-center">
                                                                <h6>00 : 12 : 01</h6>
                                                                <span>Today : 00 : 12 : 01</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="form-group mb-2">
                                                            <select className="form-select">
                                                                <option>Default Project</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <select className="form-select">
                                                                <option>Select Task</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="header_icon position-relative notification d-flex align-items-center justify-content-center">
                                        <img src={notification} alt='' />
                                        <span className="notification_alert"></span>
                                        <p>02</p>
                                    </div>
                                    <div
                                        className="header_icon position-relative notification d-flex align-items-center justify-content-center">
                                        <svg onClick={handleLogout} style={{ cursor: 'pointer' }} width="22" height="22" viewBox="0 0 22 22" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.5408 11.9167L9.43242 14.0158C9.3465 14.1011 9.27831 14.2024 9.23177 14.3141C9.18523 14.4259 9.16127 14.5457 9.16127 14.6667C9.16127 14.7877 9.18523 14.9075 9.23177 15.0192C9.27831 15.1309 9.3465 15.2323 9.43242 15.3175C9.51763 15.4034 9.61902 15.4716 9.73072 15.5182C9.84243 15.5647 9.96224 15.5887 10.0833 15.5887C10.2043 15.5887 10.3241 15.5647 10.4358 15.5182C10.5475 15.4716 10.6489 15.4034 10.7341 15.3175L14.4008 11.6508C14.4842 11.5637 14.5496 11.4609 14.5933 11.3483C14.6849 11.1252 14.6849 10.8748 14.5933 10.6517C14.5496 10.5392 14.4842 10.4364 14.4008 10.3492L10.7341 6.68251C10.6486 6.59704 10.5472 6.52924 10.4355 6.48299C10.3238 6.43673 10.2041 6.41293 10.0833 6.41293C9.96238 6.41293 9.84269 6.43673 9.73102 6.48299C9.61935 6.52924 9.51789 6.59704 9.43242 6.68251C9.34695 6.76798 9.27915 6.86944 9.2329 6.98111C9.18664 7.09278 9.16284 7.21247 9.16284 7.33334C9.16284 7.45421 9.18664 7.5739 9.2329 7.68557C9.27915 7.79724 9.34695 7.89871 9.43242 7.98418L11.5408 10.0833H2.74992C2.5068 10.0833 2.27365 10.1799 2.10174 10.3518C1.92983 10.5237 1.83325 10.7569 1.83325 11C1.83325 11.2431 1.92983 11.4763 2.10174 11.6482C2.27365 11.8201 2.5068 11.9167 2.74992 11.9167H11.5408ZM10.9999 1.83334C9.28675 1.82569 7.60573 2.29829 6.14751 3.19752C4.6893 4.09675 3.51227 5.38663 2.74992 6.92084C2.64052 7.13965 2.62252 7.39295 2.69987 7.62502C2.77723 7.8571 2.94362 8.04894 3.16242 8.15834C3.38122 8.26774 3.63452 8.28575 3.8666 8.20839C4.09868 8.13103 4.29052 7.96465 4.39992 7.74584C4.97943 6.57555 5.86093 5.58124 6.95334 4.86567C8.04575 4.15009 9.30942 3.7392 10.6138 3.67547C11.9181 3.61174 13.2158 3.89747 14.3728 4.50314C15.5298 5.10882 16.504 6.01245 17.1949 7.12067C17.8857 8.22889 18.2681 9.50149 18.3025 10.8069C18.3368 12.1124 18.022 13.4034 17.3905 14.5464C16.7589 15.6895 15.8336 16.6432 14.7102 17.3089C13.5867 17.9746 12.3058 18.3283 10.9999 18.3333C9.63306 18.3393 8.29223 17.9597 7.1313 17.2382C5.97038 16.5166 5.03641 15.4824 4.43659 14.2542C4.32718 14.0354 4.13534 13.869 3.90327 13.7916C3.67119 13.7143 3.41789 13.7323 3.19909 13.8417C2.98028 13.9511 2.8139 14.1429 2.73654 14.375C2.65918 14.6071 2.67718 14.8604 2.78659 15.0792C3.51334 16.5417 4.61765 17.7836 5.98527 18.6762C7.35289 19.5689 8.93416 20.08 10.5655 20.1566C12.1969 20.2332 13.8191 19.8726 15.2644 19.1121C16.7097 18.3515 17.9255 17.2187 18.7861 15.8307C19.6468 14.4427 20.121 12.85 20.1597 11.2173C20.1984 9.58456 19.8002 7.97115 19.0063 6.54394C18.2124 5.11673 17.0516 3.92753 15.644 3.09936C14.2364 2.27118 12.6331 1.83411 10.9999 1.83334Z"
                                                fill="#83838C" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-profile">
                                {(viewAdd || viewEdit) && <Company />}
                                {(viewAdd || viewEdit) && (
                                    <div className="row">
                                    <div className="d-flex align-items-center justify-content-between mb-30 mt-30">
                                        <h2 className="body_heading width-left-border mb-0">Comments List</h2>
                                        <div className="heading_width_search d-flex align-items-center gap-3">
                                            <Link className="btn blue-btn small_btn" data-bs-toggle="offcanvas" to="/offcanvasMilestone" role="button" aria-controls="offcanvasMilestone">View Milestones</Link>
                                        </div>
                                    </div>
                                    <Comment />

                                </div>)}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-end task-details-popup" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 className="offcanvas-title font-18" id="offcanvasExampleLabel">Task Details</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="task_info">
                        <p>I still want the original header, but when you scroll to the left it right I want it to start to reveal the cards. Thank you for creating design first</p>
                        <p>Between the two, I like option 1 better. It looks like the restaurant slide is showing the restaurants top 2 items. That is a pretty good idea</p>
                        <p>I would want to remove the item description and only use 1 of those 2 lines that are being used for badges. I will only want one badge displayed at a time</p>
                        <p>In fact for right now, I want to only focus on the restaurant side carousel.</p>
                    </div>
                    <div className="task_attachment mt-30">
                        <h6 className="mb-3">ATTACHMENT</h6>
                        <div className="attachment-file">
                            <Link to="/" className="border"><img src={pdf} alt='' className="img-fluid" /></Link>
                            <Link to="/" className="border"><img src={image} alt='' className="img-fluid" /></Link>
                        </div>
                    </div>
                    <div className="task_attachment comments mt-30">
                        <h6 className="mb-3 d-flex align-items-center justify-content-between">COMMENTS <Link to="/" className="link_menu" data-bs-toggle="modal" data-bs-target="#exampleModal">Write Comments</Link></h6>
                        <div className="comment_list">
                            <div className="comments-people border-bottom d-flex gap-3">
                                <div className="people-name">RS</div>
                                <div className="people-message">
                                    <h5>Ravi Sharma | <span>11:00 AM</span></h5>
                                    <p>We have already made this task on yesterday. please check last updated file</p>
                                </div>
                            </div>
                            <div className="comments-people border-bottom d-flex gap-3">
                                <div className="people-name">AG</div>
                                <div className="people-message">
                                    <h5>Anurag Aggarwal | <span>04:00 PM</span></h5>
                                    <p>We have already made this task on yesterday. please check last updated file</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered comment_post">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Write Your Comment Here...</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <textarea className="form-control" rows="4" placeholder="Please write your message..."></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn blue-btn">Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-end task-details-popup" tabIndex="-1" id="offcanvasMilestone" aria-labelledby="offcanvasMilestoneLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 className="offcanvas-title font-18" id="offcanvasMilestoneLabel">Milestones</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="milestones">
                        <strong>Milestone 1: </strong> Advance Payment for team allocation, project setup, design phase start.
                    </div>
                    <div className="milestones active">
                        <strong>Milestone 2: </strong> Mobile App screen designs, admin dashboard setup,
                    </div>
                    <div className="milestones">
                        <strong>Milestone 3: </strong> Workable iOS app coding for events creation, attendees, attendance status, admin features
                    </div>
                    <div className="milestones">
                        <strong>Milestone 4: </strong> Workable iOS app with remaining features and social setup.
                    </div>
                    <div className="milestones">
                        <strong>Milestone 5: </strong> Making the apps and admin panel live and fix the bugs.
                    </div>
                </div>
            </div>

            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog task_delete modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="task_delete_option">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                <div className="task_message text-center">
                                    <div className="task_icon"><img src={deletePic} alt='' /></div>
                                    <h4>Delete Task</h4>
                                    <p>Are your sure you want to delete this task?</p>
                                </div>
                                <div className="task_button-group text-center">
                                    <button type="button" className="btn border_btn" data-bs-dismiss="modal">No</button>
                                    <button type="button" className="btn blue-btn">Yes</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectDetails