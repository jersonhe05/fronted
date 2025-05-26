import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';

const StudentCourses = () => {
  const courses = [
    {
      id: 1,
      name: 'Inglés III',
      code: 'G16',
      program: 'Aeronáutica',
      instructor: 'Arnoldo Iguaran',
      description: 'Este curso tiene como finalidad enseñar a dominar inglés'
    },
    {
      id: 2,
      name: 'Sistemas Operativos',
      code: 'G2',
      program: 'Aeronáutica',
      instructor: 'María González',
      description: 'Fundamentos de sistemas operativos y su funcionamiento'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mis Cursos</h1>
        <p className="text-gray-600">Lista de cursos matriculados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/student/courses/${course.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Book className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">{course.name}</h2>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Código: {course.code}</p>
                <p className="text-sm text-gray-600">Programa: {course.program}</p>
                <p className="text-sm text-gray-600">Profesor: {course.instructor}</p>
                <p className="mt-4 text-gray-700">{course.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;