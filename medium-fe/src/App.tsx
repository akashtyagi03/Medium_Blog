
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './page/Signup'
import { Login } from './page/Login'
import { Blogs } from './page/Blogs'
import { Toaster } from "react-hot-toast";
import { Blog } from './page/Blog'
import { Publish } from './page/Publish'
import { Landing } from './page/Landing'

function App() {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<HomePage />} /> */}
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/publish' element={<Publish />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
