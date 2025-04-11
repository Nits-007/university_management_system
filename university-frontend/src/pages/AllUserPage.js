// // import React, { useEffect, useState } from 'react';
// // import {
// //   Button, Typography, CircularProgress,
// //   Box, Table, TableBody, TableCell, TableHead, TableRow, Paper
// // } from '@mui/material';
// // import {
// //   useGetAllUsersQuery,
// //   useGrantUserAccessMutation
// // } from '../store/api/universityApi';
// // import { useGetProfileQuery } from '../store/api/AuthApi';
// // import { tableSchema } from '../utils/tableSchema';

// // const ALL_FIELDS = Object.keys(tableSchema);

// // const AllUserPage = () => {
// //   const { data: currentUser } = useGetProfileQuery();
// //   const { data: users, isLoading } = useGetAllUsersQuery();
// //   const [grantAccess] = useGrantUserAccessMutation();
// //   const [editableUsers, setEditableUsers] = useState([]);
// //   const [activeField, setActiveField] = useState(null); // New state

// //   // Format users and permissions
// //   useEffect(() => {
// //     if (users) {
// //       const filtered = users.filter(user => user.username !== 'dbadmin' && user.username !== 'root');
  
// //       const formatted = filtered.map(user => {
// //         const updatedPermissions = {};
// //         ALL_FIELDS.forEach(field => {
// //           updatedPermissions[field] = {
// //             can_view: user.permissions?.[field]?.can_view || false,
// //             can_create: user.permissions?.[field]?.can_create || false,
// //             can_edit: user.permissions?.[field]?.can_edit || false,
// //             can_delete: user.permissions?.[field]?.can_delete || false,
// //           };
// //         });
  
// //         return {
// //           ...user,
// //           updatedPermissions,
// //         };
// //       });
  
// //       setEditableUsers(formatted);
// //     }
// //   }, [users]);
  
  

// //   const togglePermission = (userIndex, fieldName, permissionType) => {
// //     setEditableUsers(prev =>
// //       prev.map((user, idx) => {
// //         if (idx !== userIndex) return user;

// //         const current = user.updatedPermissions[fieldName][permissionType];
// //         return {
// //           ...user,
// //           updatedPermissions: {
// //             ...user.updatedPermissions,
// //             [fieldName]: {
// //               ...user.updatedPermissions[fieldName],
// //               [permissionType]: !current,
// //             },
// //           },
// //         };
// //       })
// //     );
// //   };

// //   const handleUpdateAccess = async (userId, updatedPermissions) => {
// //     try {
// //       const updates = Object.entries(updatedPermissions); // [ [field, perms], ... ]
// //       console.log(updates)
      
// //       for (const [entity_type, perms] of updates) {
// //         console.log(" ofhbf ", entity_type)
// //         const payload = {
// //           user: userId,
// //           entity_type,
// //           can_view: String(perms.can_view),
// //           can_edit: String(perms.can_edit),
// //           can_delete: String(perms.can_delete),
// //           can_create: String(perms.can_create),
// //         };

// //         console.log("object ",payload)
// //         await grantAccess(payload);
// //       }
  
// //       alert('Access updated successfully');
// //     } catch (error) {
// //       console.error('Error updating access:', error);
// //       alert('Error updating access');
// //     }
// //   };
  

// //   if (isLoading) {
// //     return (
// //       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box className="p-6">
// //       <Typography variant="h5" gutterBottom>
// //         All Users
// //       </Typography>

// //       <Paper sx={{ overflowX: 'auto' }}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Username</TableCell>
// //               <TableCell>Access (Only one field editable at a time)</TableCell>
// //               <TableCell>Update Access</TableCell>
// //             </TableRow>
// //           </TableHead>

// //           <TableBody>
// //             {editableUsers.map((user, index) => {
// //               const isCurrentUserSuperUser = currentUser?.is_superuser;

// //               return !user.is_superuser ? (
// //                 <TableRow key={user.id}>
// //                   <TableCell>{user.username}</TableCell>

// //                   <TableCell>
// //                     {ALL_FIELDS.map(field => {
// //                       const isActive = activeField === field;
// //                       const perms = user.updatedPermissions[field];

// //                       return (
// //                         <Box key={field} sx={{ mb: 1 }}>
// //                           <label
// //                             onClick={() => isCurrentUserSuperUser && setActiveField(field)}
// //                             style={{
// //                               fontWeight: isActive ? 'bold' : 'normal',
// //                               cursor: isCurrentUserSuperUser ? 'pointer' : 'not-allowed',
// //                               color: isActive ? '#1976d2' : 'inherit',
// //                             }}
// //                           >
// //                             <input
// //                               type="checkbox"
// //                               checked={perms.can_view}
// //                               disabled={!isCurrentUserSuperUser || !isActive}
// //                               onChange={() => togglePermission(index, field, 'can_view')}
// //                             />{' '}
// //                             {field}
// //                           </label>

// //                           {perms.can_view && isActive && (
// //                             <Box sx={{ ml: 2 }}>
// //                               <label>
// //                                 <input
// //                                   type="checkbox"
// //                                   checked={perms.can_create}
// //                                   onChange={() => togglePermission(index, field, 'can_create')}
// //                                   disabled={!isCurrentUserSuperUser}
// //                                 />{' '}
// //                                 Create
// //                               </label>
// //                               <label style={{ marginLeft: 8 }}>
// //                                 <input
// //                                   type="checkbox"
// //                                   checked={perms.can_edit}
// //                                   onChange={() => togglePermission(index, field, 'can_edit')}
// //                                   disabled={!isCurrentUserSuperUser}
// //                                 />{' '}
// //                                 Edit
// //                               </label>
// //                               <label style={{ marginLeft: 8 }}>
// //                                 <input
// //                                   type="checkbox"
// //                                   checked={perms.can_delete}
// //                                   onChange={() => togglePermission(index, field, 'can_delete')}
// //                                   disabled={!isCurrentUserSuperUser}
// //                                 />{' '}
// //                                 Delete
// //                               </label>
// //                             </Box>
// //                           )}
// //                         </Box>
// //                       );
// //                     })}
// //                   </TableCell>

// //                   <TableCell>
// //                     <Button
// //                       variant="contained"
// //                       color="primary"
// //                       onClick={() => handleUpdateAccess(user.id, user.updatedPermissions)}
// //                       disabled={!isCurrentUserSuperUser}
// //                     >
// //                       Update
// //                     </Button>
// //                   </TableCell>
// //                 </TableRow>
// //               ) : null;
// //             })}
// //           </TableBody>
// //         </Table>
// //       </Paper>
// //     </Box>
// //   );
// // };

// // export default AllUserPage;

import React, { useEffect, useState } from 'react';
import {
  Button, Typography, CircularProgress,
  Box, Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Divider, Stack, Chip
} from '@mui/material';
import {
  useGetAllUsersQuery,
  useGrantUserAccessMutation
} from '../store/api/universityApi';
import { useGetProfileQuery } from '../store/api/AuthApi';
import { tableSchema } from '../utils/tableSchema';
import { showToast } from '../utils/toastService';

const ALL_FIELDS = Object.keys(tableSchema);

const AllUserPage = () => {
  const { data: currentUser } = useGetProfileQuery();
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [grantAccess] = useGrantUserAccessMutation();
  const [editableUsers, setEditableUsers] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [updatingUserId, setUpdatingUserId] = useState(null);


  useEffect(() => {
    if (users) {
      const filtered = users.filter(user => user.username !== 'dbadmin' && user.username !== 'root');

      const formatted = filtered.map(user => {
        const updatedPermissions = {};
        ALL_FIELDS.forEach(field => {
          updatedPermissions[field] = {
            can_view: user.permissions?.[field]?.can_view || false,
            can_create: user.permissions?.[field]?.can_create || false,
            can_edit: user.permissions?.[field]?.can_edit || false,
            can_delete: user.permissions?.[field]?.can_delete || false,
          };
        });

        return {
          ...user,
          updatedPermissions,
        };
      });

      setEditableUsers(formatted);
    }
  }, [users]);

  const togglePermission = (userIndex, fieldName, permissionType) => {
    setEditableUsers(prev =>
      prev.map((user, idx) => {
        if (idx !== userIndex) return user;

        const current = user.updatedPermissions[fieldName][permissionType];
        return {
          ...user,
          updatedPermissions: {
            ...user.updatedPermissions,
            [fieldName]: {
              ...user.updatedPermissions[fieldName],
              [permissionType]: !current,
            },
          },
        };
      })
    );
  };

  // const handleUpdateAccess = async (userId, updatedPermissions) => {
  //   try {
  //     const updates = Object.entries(updatedPermissions);
  //     for (const [entity_type, perms] of updates) {
  //       const payload = {
  //         user: userId,
  //         entity_type,
  //         can_view: String(perms.can_view),
  //         can_edit: String(perms.can_edit),
  //         can_delete: String(perms.can_delete),
  //         can_create: String(perms.can_create),
  //       };

  //       await grantAccess(payload);
  //     }
  //     showToast({title:"access updated"}, 'success')
  //   } catch (error) {
  //     console.error('Error updating access:', error);
  //     showToast({title:"Error updating access"}, 'error')
  //   }
  // };

  const handleUpdateAccess = async (userId, updatedPermissions) => {
    try {
      setUpdatingUserId(userId);
  
      const updates = Object.entries(updatedPermissions);
      for (const [entity_type, perms] of updates) {
        const payload = {
          user: userId,
          entity_type,
          can_view: String(perms.can_view),
          can_edit: String(perms.can_edit),
          can_delete: String(perms.can_delete),
          can_create: String(perms.can_create),
        };
  
        await grantAccess(payload);
      }
  
      showToast({ title: "Access updated" }, 'success');
    } catch (error) {
      console.error('Error updating access:', error);
      showToast({ title: "Error updating access" }, 'error');
    } finally {
      setUpdatingUserId(null);
    }
  };
  

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="p-6" sx={{ maxWidth: '100%', padding: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        User Access Management
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Paper elevation={3} sx={{ overflowX: 'auto', borderRadius: 3, padding: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">Username</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Permission Access</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Action</Typography></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {editableUsers.map((user, index) => {
              const isCurrentUserSuperUser = currentUser?.is_superuser;

              return !user.is_superuser ? (
                <TableRow key={user.id}>
                  <TableCell>
                    <Chip label={user.username} color="info" variant="outlined" />
                  </TableCell>


                  <TableCell sx={{ minWidth: 600 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Table</strong></TableCell>
                          <TableCell><strong>View</strong></TableCell>
                          <TableCell><strong>Create</strong></TableCell>
                          <TableCell><strong>Edit</strong></TableCell>
                          <TableCell><strong>Delete</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {ALL_FIELDS.map((field) => {
                          const perms = user.updatedPermissions[field];
                          return (
                            <TableRow key={field}>
                              <TableCell
                                onClick={() => isCurrentUserSuperUser && setActiveField(field)}
                                sx={{
                                  fontWeight: activeField === field ? 'bold' : 400,
                                  cursor: isCurrentUserSuperUser ? 'pointer' : 'not-allowed',
                                  color: activeField === field ? '#1976d2' : 'text.primary',
                                }}
                              >
                                {field}
                              </TableCell>
                              {['can_view', 'can_create', 'can_edit', 'can_delete'].map((permType) => (
                                <TableCell key={permType}>
                                  <input
                                    type="checkbox"
                                    checked={perms[permType]}
                                    disabled={
                                      !isCurrentUserSuperUser ||
                                      (permType !== 'can_view' && !perms.can_view)
                                    }
                                    onChange={() => togglePermission(index, field, permType)}
                                  />
                                </TableCell>
                              ))}
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableCell>


                  <TableCell>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateAccess(user.id, user.updatedPermissions)}
                      disabled={!isCurrentUserSuperUser}
                      sx={{ borderRadius: 2 }}
                    >
                      Update
                    </Button> */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateAccess(user.id, user.updatedPermissions)}
                      disabled={!isCurrentUserSuperUser || updatingUserId === user.id}
                      sx={{ borderRadius: 2, minWidth: 100 }}
                    >
                      {updatingUserId === user.id ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        'Update'
                      )}
                    </Button>

                  </TableCell>
                </TableRow>
              ) : null;
            })}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AllUserPage;

