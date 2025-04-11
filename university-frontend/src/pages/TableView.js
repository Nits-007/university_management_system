// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Container, Paper, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, TextField,
//   Button, Typography, Box
// } from '@mui/material';
// import { useGetTableDataQuery, useAddTableDataMutation } from '../store/api/universityApi';
// import { tableSchema } from '../utils/tableSchema';
// import { MenuItem } from '@mui/material'; 
// import { useDeleteSingleDataMutation } from '../store/api/universityApi';
// import DeleteIcon from '@mui/icons-material/Delete'; // optional

// const TableView = () => {
//   const { tableName } = useParams();
//   const schema = tableSchema[tableName]; // Get schema for this table
//   const tname = schema.apiPath
//   const { data: tableData  } = useGetTableDataQuery(tname);
//   console.log(tableData)
//   const [addTableData] = useAddTableDataMutation();
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});
//   const [deleteSingleData] = useDeleteSingleDataMutation();


//   const handleInputChange = (field) => (event) => {
//     setFormData({
//       ...formData,
//       [field]: event.target.value,
//     });
//     setErrors((prev) => ({ ...prev, [field]: '' })); // Clear error
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     schema.fields.forEach((field) => {
//       if (field.required && !formData[field.name]) {
//         newErrors[field.name] = `${field.name} is required`;
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!validateForm()) return;

//     try {
//       console.log("tname ",tname)
//       await addTableData({ tname, data: formData });
//       setFormData({});
//     } catch (error) {
//       console.error('Error adding data:', error);
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         {tableName}
//       </Typography>

//       <Paper sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           Add New Record
//         </Typography>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
//         >
//           {schema.fields.map((field) => (
//             <TextField
//               key={field.name}
//               label={field.name}
//               type={field.type !== 'select' ? field.type || 'text' : undefined}
//               select={!!field.options}
//               required={field.required}
//               value={formData[field.name] || ''}
//               onChange={handleInputChange(field.name)}
//               size="small"
//               error={Boolean(errors[field.name])}
//               helperText={errors[field.name]}
//             >
//               {field.options &&
//                 field.options.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//             </TextField>
//           ))}
//           <Button type="submit" variant="contained" color="primary">
//             Add Record
//           </Button>
//         </Box>
//       </Paper>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {schema.fields.map((field) => (
//                 <TableCell key={field.name}>{field.name}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tableData?.map((row, index) => (
//               <TableRow key={index}>
//                 {schema.fields.map((field) => (
//                   <TableCell key={field.name}>{row[field.name]}</TableCell>
//                 ))}
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     size="small"
//                     onClick={() =>
//                       deleteSingleData({
//                         tableName: tname,
//                         id: row[schema.fields[0].name],
//                       })
//                     }
//                     startIcon={<DeleteIcon />}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

// export default TableView;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Container, Paper, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, TextField,
//   Button, Typography, Box, Modal
// } from '@mui/material';
// import {
//   useGetTableDataQuery,
//   useAddTableDataMutation,
//   useDeleteSingleDataMutation,
//   useGetSingleTableDataQuery,
//   useUpdateSingleDataMutation,
// } from '../store/api/universityApi';
// import { tableSchema } from '../utils/tableSchema';
// import { MenuItem } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { skipToken } from '@reduxjs/toolkit/query';

// const modalStyle = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 500,
//   bgcolor: 'background.paper',
//   borderRadius: '10px',
//   boxShadow: 24,
//   p: 4,
// };

// const TableView = () => {
//   const { tableName } = useParams();
//   const schema = tableSchema[tableName];
//   const tname = schema.apiPath;

//   const { data: tableData, refetch } = useGetTableDataQuery(tname);
//   const [addTableData] = useAddTableDataMutation();
//   const [deleteSingleData] = useDeleteSingleDataMutation();
//   const [updateSingleData] = useUpdateSingleDataMutation();

//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const { data: singleData } = useGetSingleTableDataQuery(
//     editingId ? { tableName: tname, id: editingId } : skipToken
//   );

//   React.useEffect(() => {
//     if (singleData) {
//       setFormData(singleData);
//     }
//   }, [singleData]);

//   const handleInputChange = (field) => (event) => {
//     setFormData({
//       ...formData,
//       [field]: event.target.value,
//     });
//     setErrors((prev) => ({ ...prev, [field]: '' }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     schema.fields.forEach((field) => {
//       if (field.required && !formData[field.name]) {
//         newErrors[field.name] = `${field.name} is required`;
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleAddSubmit = async (event) => {
//     event.preventDefault();
//     if (!validateForm()) return;

//     try {
//       await addTableData({ tname, data: formData });
//       setFormData({});
//       refetch();
//     } catch (error) {
//       console.error('Error adding data:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteSingleData({ tableName: tname, id });
//       refetch();
//     } catch (err) {
//       console.error('Delete failed:', err);
//     }
//   };

//   const handleEditClick = (id) => {
//     setEditingId(id);
//     setEditModalOpen(true);
//   };

//   const handleUpdateSubmit = async (event) => {
//     event.preventDefault();
//     if (!validateForm()) return;

//     try {
//       await updateSingleData({
//         tableName: tname,
//         id: editingId,
//         data: formData,
//       });
//       setEditModalOpen(false);
//       setEditingId(null);
//       refetch();
//     } catch (error) {
//       console.error('Update error:', error);
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         {tableName}
//       </Typography>

//       {/* Add New Form */}
//       <Paper sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           Add New Record
//         </Typography>
//         <Box
//           component="form"
//           onSubmit={handleAddSubmit}
//           sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
//         >
//           {schema.fields.map((field) => (
//             <TextField
//               key={field.name}
//               label={field.name}
//               type={field.type !== 'select' ? field.type || 'text' : undefined}
//               select={!!field.options}
//               required={field.required}
//               value={formData[field.name] || ''}
//               onChange={handleInputChange(field.name)}
//               size="small"
//               error={Boolean(errors[field.name])}
//               helperText={errors[field.name]}
//             >
//               {field.options &&
//                 field.options.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//             </TextField>
//           ))}
//           <Button type="submit" variant="contained" color="primary">
//             Add Record
//           </Button>
//         </Box>
//       </Paper>

//       {/* Table Display */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {schema.fields.map((field) => (
//                 <TableCell key={field.name}>{field.name}</TableCell>
//               ))}
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tableData?.map((row, index) => (
//               <TableRow key={index}>
//                 {schema.fields.map((field) => (
//                   <TableCell key={field.name}>{row[field.name]}</TableCell>
//                 ))}
//                 <TableCell>
//                   <Box sx={{ display: 'flex', gap: 1 }}>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       size="small"
//                       onClick={() =>
//                         handleDelete(row[schema.fields[0].name])
//                       }
//                       startIcon={<DeleteIcon />}
//                     >
//                       Delete
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       size="small"
//                       onClick={() =>
//                         handleEditClick(row[schema.fields[0].name])
//                       }
//                       startIcon={<EditIcon />}
//                     >
//                       Update
//                     </Button>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Update Modal */}
//       <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <Box sx={modalStyle}>
//           <Typography variant="h6" mb={2}>
//             Edit Record
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleUpdateSubmit}
//             sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
//           >
//             {schema.fields.map((field) => (
//               <TextField
//                 key={field.name}
//                 label={field.name}
//                 type={field.type !== 'select' ? field.type || 'text' : undefined}
//                 select={!!field.options}
//                 required={field.required}
//                 value={formData[field.name] || ''}
//                 onChange={handleInputChange(field.name)}
//                 error={Boolean(errors[field.name])}
//                 helperText={errors[field.name]}
//               >
//                 {field.options &&
//                   field.options.map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//               </TextField>
//             ))}
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//               <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
//               <Button type="submit" variant="contained" color="primary">
//                 Update
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default TableView;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField,
  Button, Typography, Box, Modal
} from '@mui/material';
import {
  useGetTableDataQuery,
  useAddTableDataMutation,
  useDeleteSingleDataMutation,
  useGetSingleTableDataQuery,
  useUpdateSingleDataMutation,
  useLazyGetTableDataQuery,
} from '../store/api/universityApi';
import { tableSchema } from '../utils/tableSchema';
import { MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetProfileQuery } from '../store/api/AuthApi';
import { showToast } from '../utils/toastService';
import { Title } from '@mui/icons-material';


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const TableView = () => {
  const { tableName } = useParams();
  const schema = tableSchema[tableName];
  const tname = schema.apiPath;

  const { data: profile, isLoading, error } = useGetProfileQuery();
  const { data: tableData, refetch } = useGetTableDataQuery(tname);
  const [addTableData] = useAddTableDataMutation();
  const [deleteSingleData] = useDeleteSingleDataMutation();
  const [updateSingleData] = useUpdateSingleDataMutation();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [triggerGetTableData] = useLazyGetTableDataQuery();
  const [foreignFieldOptions, setForeignFieldOptions] = useState({});

  useEffect(() => {
    const fetchForeignOptions = async () => {
      const foreignFields = schema.foreignFields || [];
      const promises = foreignFields.map(async (field) => {
        const { tname, fieldName, currentField } = field;
        console.log("object ",tname, fieldName, currentField)
        try {
          const data = await triggerGetTableData(tname).unwrap();
          console.log("Fetched data for", tname, data);
      
          const uniqueValues = [...new Set(data.map(item => item[fieldName]))];
          return { key: currentField, options: uniqueValues };
        } catch (err) {
          console.error(`Error fetching data for ${tname}:`, err);
          return { key: currentField, options: [] };
        }
      });
      
      const results = await Promise.all(promises);
      const newOptions = {};
      results.forEach(({ key, options }) => {
        newOptions[key] = options;
      });
      setForeignFieldOptions(newOptions);
    };

    fetchForeignOptions();
    console.log("foreinfields ", foreignFieldOptions)
    }, [schema]);
  

  const { data: singleData } = useGetSingleTableDataQuery(
    editingId ? { tableName: tname, id: editingId } : skipToken
  );

  useEffect(() => {
    if (singleData) {
      setFormData(singleData);
    }
  }, [singleData]);

  const handleInputChange = (fieldName) => (event) => {
    const value = event.target.value;
  
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  
    // Phone number validation
    if (['phone_no', 'contact_phone'].includes(fieldName)) {
      if (!/^\d{10}$/.test(value)) {
        setErrors((prev) => ({ ...prev, [fieldName]: 'Phone number must be 10 digits' }));
      } else {
        setErrors((prev) => ({ ...prev, [fieldName]: '' }));
      }
    } else {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    schema.fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.name} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await addTableData({ tname, data: formData }).unwrap();
      showToast({title:"data added succesfully"}, 'success')
      setFormData({});
      refetch();
    } catch (error) {
      showToast({title:"data creation failed"}, 'error')
      console.error('Error adding data:', error);
    }
  };



  const handleDelete = async (id) => {
    try {
      await deleteSingleData({ tableName: tname, id });
      showToast({title:"data deleted succesfully"}, 'success')

      refetch();
    } catch (err) {
      showToast({title:"Delete failed:"}, 'error')
      console.error('Delete failed:', err);
    }
  };

  const handleEditClick = (id) => {
    setEditingId(id);
    setEditModalOpen(true);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await updateSingleData({
        tableName: tname,
        id: editingId,
        data: formData,
      });
      showToast({title:"data updated succesfully"}, 'success')
      setEditModalOpen(false);
      setEditingId(null);
      refetch();
    } catch (error) {
      showToast({title:"error updating data"}, 'error')
      console.error('Update error:', error);
    }
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setEditingId(null);
    setFormData({}); // Clear form data when closing modal
  };


  const permissions = profile?.is_superuser
  ? { can_view: true, can_create: true, can_edit: true, can_delete: true }
  : profile?.permissions?.[tableName] || {};

  

  return (
    // Replace in your TableView component render return block

    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        {tableName.charAt(0).toUpperCase() + tableName.slice(1)} Table
      </Typography>

      {permissions.can_create && (
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            backgroundColor: '#f9f9f9',
          }}
        >
          <Typography variant="h6" gutterBottom color="primary">
            ➕ Add New Record
          </Typography>
          <Box
            component="form"
            onSubmit={handleAddSubmit}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(200px, 1fr))' },
              gap: 2,
            }}
          >
            {schema.fields.map((field) => (
              <TextField
                key={field.name}
                label={field.name}
                type={field.type !== 'select' ? field.type || 'text' : undefined}
                // select={!!field.options}
                select={!!field.options || !!foreignFieldOptions[field.name]}
                required={field.required}
                value={formData[field.name] || ''}
                onChange={handleInputChange(field.name)}
                size="small"
                error={Boolean(errors[field.name])}
                helperText={errors[field.name]}
                fullWidth
                inputProps={
                  ['phone_no', 'contact_phone'].includes(field.name)
                    ? { maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }
                    : {}
                }
              >
                {field.options &&
                  field.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                  {foreignFieldOptions[field.name] &&
                    foreignFieldOptions[field.name].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))
                  }
              </TextField>
            ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 1, gridColumn: '1 / -1' }}
            >
              Add Record
            </Button>
          </Box>
        </Paper>
      )}

      {/* Table Display */}
      <Paper elevation={3} sx={{ borderRadius: 3 }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                {schema.fields.map((field) => (
                  <TableCell
                    key={field.name}
                    sx={{ color: 'white', fontWeight: 'bold' }}
                  >
                    {field.name}
                  </TableCell>
                ))}
                {(permissions.can_delete || permissions.can_edit) && (
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f1f1f1',
                    },
                  }}
                >
                  {schema.fields.map((field) => (
                    <TableCell key={field.name}>{row[field.name]}</TableCell>
                  ))}
                  {(permissions.can_delete || permissions.can_edit) && (
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {permissions.can_delete && (
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(row[schema.fields[0].name])}
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        )}
                        {permissions.can_edit && (
                          <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={() => handleEditClick(row[schema.fields[0].name])}
                            startIcon={<EditIcon />}
                          >
                            Edit
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal remains unchanged */}
      <Modal open={editModalOpen} onClose={handleModalClose}>
            <Box sx={modalStyle}>
              <Typography variant="h6" mb={2}>
                Edit Record
              </Typography>
              <Box
                component="form"
                onSubmit={handleUpdateSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                {schema.fields.map((field) => (
                  <TextField
                    key={field.name}
                    label={field.name}
                    type={field.type !== 'select' ? field.type || 'text' : undefined}
                    select={!!field.options}
                    required={field.required}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange(field.name)}
                    error={Boolean(errors[field.name])}
                    helperText={errors[field.name]}
                  >
                    {field.options &&
                      field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                  </TextField>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button onClick={handleModalClose}>Cancel</Button>
                  <Button type="submit" variant="contained" color="primary">
                    Update
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
    </Container>

    
  );
};

export default TableView;

