import React, { useEffect, useState } from 'react'
import '../css/custom.css'
import '../css/media.css'

import { useDispatch, useSelector } from 'react-redux'
import { setSuccess } from '../features/successSlice';
import { getUsers }
  from '../features/apiSlice'
import Sideer from '../sider/Sideer'
import Header from '../Header/Header'
import 'react-calendar/dist/Calendar.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid'
import axios from '../utils/middlewares';
import Toast from 'react-bootstrap/Toast';
import BarsDataset from '../chart/BarChart';

const Project = () => {
  const dispatch = useDispatch()

  const [apiData, setApiData] = useState([])
  const success = useSelector((state) => state.success.successMe);
 
 
 
  useEffect(() => {
    const storedSuccess = localStorage.getItem('success');
    if (storedSuccess === 'true') {
      dispatch(setSuccess(true));
      localStorage.removeItem('success');
    }

    if (success) {
      setTimeout(() => {
        dispatch(setSuccess(false));
      }, 3000);
    }

  }, [success, dispatch]);
 

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  

  function calculateTotalTime(now, then) {
    if (then === null) {
      then = "04/09/2013 15:00:00"
    }
    let start = new Date(now.replace(" ", "T"))
    let end = new Date(then.replace(" ", "T"))
    const timeDifferenceMS = end.getTime() - start.getTime();
      let seconds = parseInt((timeDifferenceMS / 1000) % 60)
      , minutes = parseInt((timeDifferenceMS / (1000 * 60)) % 60)
      , hours = parseInt((timeDifferenceMS / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + "h:" + minutes + "m:" + seconds + "s";
  }

  const handleDateClick = async (e) => {
    const created_date = e.dateStr
    const token = '255|AU2GCstU1ycrHapE29Z9D8lLeI85BzGPC70xru3W'
    const response = await axios(`https://laravel9.etrueconcept.com/btpms/api/activity-log?created_date=${created_date}&user_id=27`, { headers: { "Authorization": `Bearer ${token}` } })
    setApiData(response.data.data)
    console.log("event ", e);
    e.dayEl.onmouseover = 'pointer'
  };

 
 

  function toasterMessage() {

    return (
    
      <>
        <Toast style={{ background: '#D0F0C0', marginBottom: '5px', marginLeft: '600px', position: 'absolute' }} onClose={() => dispatch(setSuccess(false))} delay={3000} autohide>

          <Toast.Body>Password Changed Successfully</Toast.Body>
        </Toast>
      </>
    );
  }

 
  
  return (
    <>
      <div className="main_container" style={{ position: 'relative' }}>
        <div style={{ marginTop: '0px' }}>-{success && toasterMessage()}</div>
        <div className="limani_body">
          <Sideer />
          <div className="intersight_content">

            <div className="body_content" >
              <Header />
              <div style={{ textAlign: 'center', marginLeft: '200px', marginBottom: '100px', height: '250px', width: '700px' }}>
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                  initialView="dayGridMonth"
                  dayCellDidMount={(e) => {
                    e.el.style.cursor = 'pointer'
                    if (e.date.getDate() === new Date().getDate() && e.date.getMonth() === new Date().getMonth()) {

                      e.el.style.backgroundColor = 'purple'
                      e.el.style.color = 'white'
                    }
                  }}
                  selectable={true}
                  headerToolbar={{
                    start: "prev prevYear",
                    center: "title",
                    end: 'today nextYear next',

                  }}
                  weekends={true}
                  dateClick={(e) => {
                    handleDateClick(e)
                  }}
                />
              </div>
              <div className="contact-profile" style={{ marginTop: '350px' }}>
                <div className="row">
                  {apiData.length > 0 ? (apiData.map((user, ind) => (
                    <div key={ind} id='for-search' className="col-lg-6 mb-3" >
                      <div className="professional_info">
                        <div className="project-card-top">
                          <div className="project-card-heading d-flex align-items-center justify-content-between">
                            <div className="body_heading2 mb-0 ">
                              <div className='d-flex'>
                                <h2 className="font-18 mb-0"><span className="me-2"><img src={user.assignees[0].image_url} style={{ maxWidth: "30px", }} alt="" /></span>{user.assignees.name}</h2>

                              </div>
                              <p className="mb-0 body-sub-heading font-12">Created :- <span>{user.assignees[0].name}</span></p>
                            </div>
                            <p className="mb-0 font-14 body-sub-heading ">Project Name: <span> {user.project.name}</span> </p>
                          </div>
                          <div className='row'>
                            <p className="mb-0 font-14 body-sub-heading col">Start Time: <span> {user.track_times[0].start_time}</span> </p>
                            <p className="mb-0 font-14 body-sub-heading col">working hours: <span> {calculateTotalTime(user.track_times[0].start_time, user.track_times[0].end_time)}</span> </p>
                          </div>
                          <p className="mb-0 font-14 body-sub-heading ">End Time: <span> {user.track_times[0].end_time}</span> </p>

                        </div>

                      </div>
                    </div>
                  )
                  )) : (<p style={{ textAlign: 'center' }}>No data found</p>)}

                </div >

                

                <div style={{ marginLeft: '300px', marginTop: '50px'}}>


                

                  {BarsDataset()}
                </div>



              </div>
            </div>
          </div>
        </div>

      </div>
    </>

  )
}

export default Project