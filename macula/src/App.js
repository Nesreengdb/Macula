// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Layout from './pages/layout'; // Import your Layout component
import AdminLayout from "./pages/Adminlayout";
import Home from './pages/Home';
import Login from './pages/login';
import StudentHome from './pages/studentHome';
import EducatorHome from './pages/educatorHome';
import Courses from './pages/Courses';
import Profile from './pages/profile';
import Classrooms from './pages/Eclassrooms';
import SClassrooms from './pages/Sclassrooms';
import Eviewcourse from "./Eviewcourse";
import Sviewcourse from "./Sviewcourse";
import ViewEngage from "./pages/ViewEngage";
import Onboarding from "./pages/Onboarding";
import AdminLogin from "./pages/adminLogin";
import AdminHome from "./pages/adminHome" ;
import RealtimeEngage from "./pages/RealtimeEngage";
import AttendanceTable from "./pages/reports";
import AdminProfilePage from "./pages/adminProfile";
import EducatorDashboard  from "./pages/eduDash";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout> {/* Use your Layout component */}
          <Routes>
            {/* Define your routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/student-home" element={<StudentHome />} />
            <Route path="/educator-home" element={<EducatorHome />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Eclassrooms/:courseCode" element={<Classrooms />} />
            <Route path="/Sclassrooms/:courseCode" element={<SClassrooms />} />
            <Route path="/Eviewcourse" element={<Eviewcourse />} />
            <Route path="/Sviewcourse" element={<Sviewcourse />} />
            <Route path="/ViewEngage" element={<ViewEngage />} />
            <Route path="/Reports" element={<AttendanceTable />} />
            <Route path="/realtime" element={<RealtimeEngage />} />
            <Route path="/EducatorDashboard" element={<EducatorDashboard />} />

          </Routes>
        </Layout>
        <AdminLayout>
        <Routes>
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/Onboarding" element={<Onboarding />} />
        <Route path="/adminProfile" element={<AdminProfilePage />} />

        </Routes>
        </AdminLayout>
      </Router>
    </div>
  );
}

export default App;













