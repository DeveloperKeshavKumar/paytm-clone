import { Outlet, Route, Routes } from "react-router-dom"
import { Signup } from "./pages/Signup.jsx"
import { Signin } from "./pages/Signin.jsx"
import { Transfer } from "./pages/Transfer.jsx"
import { Homepage } from "./pages/Homepage.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"
import { NotFoundPage } from "./pages/NotFoundPage.jsx"

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Outlet />} >
          <Route index element={<Homepage/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/transfer' element={<Transfer />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
