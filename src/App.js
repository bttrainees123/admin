import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './components/Pages/LoginPage';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import Project from './components/Pages/Project';
// import ProjectDetails from './components/Pages/ProjectDetails';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import HandleLoginRoute from './components/PrivateRoutes/HandleLoginRoute';
import AddTasks from './components/Tasks/AddTasks';
// import HomePage from './components/Pages/HomePage';
// import Product from './components/Pages/Product';
import CartItem from './components/Pages/CartItem';
import Toast from 'react-bootstrap/Toast';
// import TextReader from './components/ImageTextReader/TextReader';
// import InputParser from './components/Pages/Editor/InputParser';
// import User from './components/Pages/User';
import About from './components/LanguageChanger/About';
import Post from './components/Pages/Post';
import { lazy, Suspense } from 'react'
import Loader from './components/Pages/Loader';

const User = lazy(() => import('./components/Pages/User'))
const Project = lazy(() => import('./components/Pages/Project'))
const ProjectDetails = lazy(() => import('./components/Pages/ProjectDetails'))
const HomePage = lazy(() => import('./components/Pages/HomePage'))
const Product = lazy(() => import('./components/Pages/Product'))
const TextReader = lazy(() => import('./components/ImageTextReader/TextReader'))
const InputParser = lazy(() => import('./components/Pages/Editor/InputParser'))

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Suspense fallback={<Loader />}><HomePage /></Suspense>} />
          <Route path='/login' element={<HandleLoginRoute Component={LoginPage} />} />
          <Route path='/dashboard' element={<Suspense fallback={<Loader />}> <PrivateRoute Component={Project} /></Suspense>} />
          <Route path='/users' element={<Suspense fallback={<Loader />}><PrivateRoute Component={User} /></Suspense>} />
          <Route path='/company-list' element={<Suspense fallback={<Loader />}><PrivateRoute Component={ProjectDetails} /> </Suspense>} />
          <Route path='/add-tasks' element={<PrivateRoute Component={AddTasks} />} />
          <Route path='/products' element={<Suspense fallback={<Loader />}><PrivateRoute Component={Product} /></Suspense>} />
          <Route path='/cart-items' element={<PrivateRoute Component={CartItem} />} />
          <Route path='/about' element={<PrivateRoute Component={About} />} />
          <Route path='/post' element={<PrivateRoute Component={Post} />} />
          <Route path='/html-react' element={<Suspense fallback={<Loader />}><PrivateRoute Component={InputParser} /></Suspense>} />
          <Route path='/extract-text' element={<Suspense fallback={<Loader />}><PrivateRoute Component={TextReader} /></Suspense>} />
          <Route path='/loading' element={<Suspense fallback={<Loader />}><PrivateRoute Component={Loader} /></Suspense>} />
        </Routes>
      </BrowserRouter></>

  );
}

export default App;
