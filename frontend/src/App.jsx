import { Outlet, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup.jsx"
import { Signin } from "./pages/Signin.jsx"
import { Transfer } from "./pages/Transfer.jsx"

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Outlet />} >
          <Route index element={<>HOMEPAGE</>} />
          <Route path='/dashboard' element={<>DASHBOARD</>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/edit' element={<>Edit User</>} />
          <Route path='/transfer' element={<Transfer />} />
          <Route path="*" element={<>404 Page Not Found</>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
