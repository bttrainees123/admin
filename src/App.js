import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './components/Pages/LoginPage';
import 'react-loading-skeleton/dist/skeleton.css'
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import HandleLoginRoute from './components/PrivateRoutes/HandleLoginRoute';
import AddTasks from './components/Tasks/AddTasks';
import CartItem from './components/Pages/CartItem';
import About from './components/LanguageChanger/About';
import Post from './components/Pages/Post';
import { lazy, Suspense } from 'react'
import Loader from './components/Pages/Loader';
import TextHome from './components/ImageTextReader/TextHome';

const User = lazy(() => import('./components/Pages/User'))
const Project = lazy(() =>
  import('./components/Pages/Project'))
const ProjectDetails = lazy(() =>
  import('./components/Pages/ProjectDetails'))
const HomePage = lazy(() => import('./components/Pages/HomePage'));

const Product = lazy(() => import('./components/Pages/Product'))
const TextReader = lazy(() => import('./components/ImageTextReader/TextReader'))
const InputParser = lazy(() => import('./components/Pages/Editor/InputParser'))

function App() {

  
  return (
    <>
   
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<HandleLoginRoute Component={LoginPage} />} />
              <Route path='/dashboard' element={<PrivateRoute Component={Project} />} />
              <Route path='/users' element={<PrivateRoute Component={User} />} />
              <Route path='/company-list' element={<PrivateRoute Component={ProjectDetails} />} />
              <Route path='/add-tasks' element={<PrivateRoute Component={AddTasks} />} />
              <Route path='/products' element={<PrivateRoute Component={Product} />} />
              <Route path='/cart-items' element={<PrivateRoute Component={CartItem} />} />
              <Route path='/about' element={<PrivateRoute Component={About} />} />
              <Route path='/post' element={<PrivateRoute Component={Post} />} />
              <Route path='/html-react' element={<PrivateRoute Component={InputParser} />} />
              <Route path='/extract-text' element={<TextReader />} />
              <Route path='/text-home' element={<TextHome />} />
              <Route path='/loading' element={<PrivateRoute Component={Loader} />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
    </>
  );
}

export default App;
