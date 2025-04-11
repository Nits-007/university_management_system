import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStudents,
  deleteStudent,
  clearError,
} from '../store/slices/studentSlice';
import { studentService } from '../services/api';

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    age: '',
    gender: '',
    program: '',
    hostel: '',
    class_field: '',
  });

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentService.create(formData);
      dispatch(fetchStudents()); // Refresh the list
      setFormData({
        student_id: '',
        name: '',
        age: '',
        gender: '',
        program: '',
        hostel: '',
        class_field: '',
      });
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) {
    dispatch(clearError());
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Students</h2>
      
      {/* Add Student Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded">
        <h3 className="text-xl font-semibold mb-4">Add New Student</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Student ID</label>
            <input
              type="number"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Program</label>
            <input
              type="number"
              name="program"
              value={formData.program}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Hostel</label>
            <input
              type="number"
              name="hostel"
              value={formData.hostel}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Class</label>
            <input
              type="number"
              name="class_field"
              value={formData.class_field}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Student
        </button>
      </form>

      {/* Students List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Program
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Hostel
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Class
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {student.student_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {student.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {student.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {student.program}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {student.hostel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  {student.class_field}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  <button
                    onClick={() => handleDelete(student.student_id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList; 