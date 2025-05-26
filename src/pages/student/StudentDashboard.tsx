import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentHome from './StudentHome';
import StudentCourses from './StudentCourses';
import CourseDetails from './CourseDetails';
import Assignments from './Assignments';
import Forums from './Forums';
import Grades from './Grades';

const StudentDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentHome />} />
      <Route path="/courses" element={<StudentCourses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/forums" element={<Forums />} />
      <Route path="/grades" element={<Grades />} />
    </Routes>
  );
};

export default StudentDashboard;