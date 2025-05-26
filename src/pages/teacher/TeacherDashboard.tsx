import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherHome from './TeacherHome';
import TeacherCourses from './TeacherCourses';
import CourseContent from './CourseContent';
import Attendance from './Attendance';
import Grades from './Grades';
import Forums from './Forums';

const TeacherDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<TeacherHome />} />
      <Route path="/courses" element={<TeacherCourses />} />
      <Route path="/content/*" element={<CourseContent />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/grades" element={<Grades />} />
      <Route path="/forums" element={<Forums />} />
    </Routes>
  );
};

export default TeacherDashboard;