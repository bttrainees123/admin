import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import Project from './components/Project';
import ProjectDetails from './components/ProjectDetails';
import PrivateRoute from './components/PrivateRoute';
import HandleLoginRoute from './components/HandleLoginRoute';
import AddTasks from './components/AddTasks';

function App() {
  // const isLoggedIn = localStorage.getItem('isLoggedIn')
  // if(!isLoggedIn ){
  //   return <LoginPage />
  // }
  return (

      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<HandleLoginRoute Component={LoginPage} />} />
          <Route path='/projects' element={<PrivateRoute Component={Project} />} />
          {/* <Route path='/projects' element={isLoggedIn === true ? <Project/> : navigate('/login)}/> */}
          <Route path='/project-details' element={<PrivateRoute Component={ProjectDetails} />} />
          {/* <Route path='/project-detail' element={isLoggedIn === true ? <ProjectDetails/> : <LoginPage/>} /> */}
          <Route path='/add-tasks' element={<PrivateRoute Component={AddTasks} />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
