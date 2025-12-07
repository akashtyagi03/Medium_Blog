
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './page/Signup'
import { Login } from './page/Login'
import { Blogs } from './page/Blogs'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<HomePage />} /> */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/blogs' element={<Blogs />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
