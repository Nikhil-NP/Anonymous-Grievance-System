import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../Components/LandingPage';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Dashboard from '../Components/Dashboard';
import UnsolvedComplaints from '../Components/UnsolvedComplaints';
import ResolvedComplaints from '../Components/ResolvedComplaints';
import RejectedComplaints from '../Components/RejectedComplaint';
import ComplaintsHistory from '../Components/ComplaintsHistory';
import ProtectedRoute from '../Components/ProtectedRoute';
import FacultyLogin from '../Components/FacultyLogin';
import FacultyDashboard from '../Components/FacultyDashboard';
import PendingComplaints from '../Components/Pending';
import UpdateComplaint from '../Components/UpdateComplaint';
import CreateComplaint from '../Components/CreateComplaint';
import VerifyOTP from '../Components/VerifyOTP'; 

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/flogin" element={<FacultyLogin />} />
    <Route path="/verify" element={<VerifyOTP />} />



    {/* Student Protected Routes */}
    <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard />  </ProtectedRoute>}/>
    <Route path="/create" element={ <ProtectedRoute> <CreateComplaint />  </ProtectedRoute>}/>
    <Route path="/unsolved"element={<ProtectedRoute><UnsolvedComplaints /></ProtectedRoute>}/>
    <Route path="/resolved" element={<ProtectedRoute><ResolvedComplaints /></ProtectedRoute>}/>
    <Route path="/rejected" element={<ProtectedRoute><RejectedComplaints /></ProtectedRoute>}/>
    <Route path="/history" element={<ProtectedRoute><ComplaintsHistory /></ProtectedRoute>}/>

    {/* faculty Protected Routes */}
    <Route path="/facultydashboard" element={ <ProtectedRoute> <FacultyDashboard />  </ProtectedRoute>}/>
    <Route path="/pending" element={ <ProtectedRoute> <PendingComplaints />  </ProtectedRoute>}/>
    <Route path="/pending/:id" element={<ProtectedRoute><UpdateComplaint /></ProtectedRoute>} />



    
  </Routes>
);

export default AppRoutes;
