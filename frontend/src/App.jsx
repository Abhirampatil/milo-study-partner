import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import StudyPlan from './pages/StudyPlan'
import Resources from './pages/Resources'
import Navbar from './components/Navbar'

const isAuth = () => !!localStorage.getItem('token')

function App() {
  return (
    <>
      {isAuth() && <Navbar />}
      <Routes>
        <Route path="/" element={isAuth() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={isAuth() ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/study-plan" element={isAuth() ? <StudyPlan /> : <Navigate to="/login" />} />
        <Route path="/resources" element={isAuth() ? <Resources /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App