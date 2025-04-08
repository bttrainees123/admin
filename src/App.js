import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './components/Pages/LoginPage';
import Project from './components/Pages/Project';
import ProjectDetails from './components/Pages/ProjectDetails';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import HandleLoginRoute from './components/PrivateRoutes/HandleLoginRoute';
import AddTasks from './components/Tasks/AddTasks';
import HomePage from './components/Pages/HomePage';
import Product from './components/Pages/Product';
import CartItem from './components/Pages/CartItem';
import Toast from 'react-bootstrap/Toast';
import TextReader from './components/ImageTextReader/TextReader';
import InputParser from './components/Pages/Editor/InputParser';
import User from './components/Pages/User';
import Carousal from './components/Pages/Home';


export function toasterMessage() {
    
  return (
    <>
      <Toast  style={{ background: '#D0F0C0', marginTop: '0px', marginLeft: '700px', position: 'absolute', zIndex: '1' }} delay={3000} autohide>
       
        <Toast.Body>You have Successfully change your data.</Toast.Body>
      </Toast>
    </>
  );
  
}
function App() {

  return (
    <>


      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<HandleLoginRoute Component={LoginPage} />} />
          <Route path='/dashboard' element={<PrivateRoute Component={Project} />} />
          <Route path='/users' element={<PrivateRoute Component={User} />} />
          <Route path='/company-list' element={<PrivateRoute Component={ProjectDetails} />} />
          <Route path='/add-tasks' element={<PrivateRoute Component={AddTasks} />} />
          <Route path='/products' element={<PrivateRoute Component={Product} />} />
          <Route path='/cart-items' element={<PrivateRoute Component={CartItem} />} />
          <Route path='/html-react' element={<PrivateRoute Component={InputParser} />} />
          <Route path='/home' element={<PrivateRoute Component={Carousal} />} />
          <Route path='/extract-text' element={<PrivateRoute Component={TextReader}/>} />
          <Route path='/projects/:created_date' element={<PrivateRoute Component={CartItem} />} />
        </Routes>
      </BrowserRouter></>

  );
}

export default App;
