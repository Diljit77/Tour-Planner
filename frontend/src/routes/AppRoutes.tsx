import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Suggestions from '../pages/Suggestions'

import Dashboard from '../pages/Dashboard'
import TripDetail from '../pages/TripDetail'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgetPassword'
import ResetPassword from '../pages/ResetPassoword'


export default function AppRoutes() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname.startsWith('/auth');

  return (
    <div className="flex-1 flex flex-col">
      {!hideHeaderFooter && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
    
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trip" element={<TripDetail />} />


          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot" element={<ForgotPassword />} />
          <Route path="/auth/reset" element={<ResetPassword />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  )
}
