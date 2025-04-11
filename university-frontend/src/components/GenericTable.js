import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { tableSchema } from '../utils/tableSchema';

const GenericTable = ({ tableName }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const schema = tableSchema[tableName];
  const apiPath = schema.apiPath;

  useEffect(() => {
    fetchData();
    initializeFormData();
  }, [tableName]);

  const initializeFormData = () => {
    const initialData = {};
    schema.fields.forEach(field => {
      initialData[field.name] = '';
    });
    setFormData(initialData);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000${apiPath}`);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const validateForm = () => {
    for (const field of schema.fields) {
      if (field.required && !formData[field.name]) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:8000${apiPath}${editingId}/`, formData);
      } else {
        await axios.post(`http://localhost:8000${apiPath}`, formData);
      }
      fetchData();
      setShowForm(false);
      setEditingId(null);
      initializeFormData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:8000${apiPath}${id}/`);
        fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item[schema.fields[0].name]);
    setShowForm(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{tableName}</h2>
      
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          initializeFormData();
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {showForm ? 'Cancel' : 'Add New'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit' : 'Add New'} {tableName}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {schema.fields.map(field => (
              <div key={field.name}>
                <label className="block mb-2">
                  {field.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required={field.required}
                  >
                    <option value="">Select {field.name}</option>
                    {field.options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {editingId ? 'Update' : 'Add'}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              {schema.fields.map(field => (
                <th
                  key={field.name}
                  className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {field.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </th>
              ))}
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {schema.fields.map(field => (
                  <td
                    key={field.name}
                    className="px-6 py-4 whitespace-nowrap border-b border-gray-300"
                  >
                    {item[field.name]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-300">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item[schema.fields[0].name])}
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

export default GenericTable; 