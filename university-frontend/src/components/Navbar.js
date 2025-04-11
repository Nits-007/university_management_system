// // import React from 'react';
// // import { AppBar, Toolbar, Typography, Menu, MenuItem, Button, Box } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';
// // import { tableSchema } from '../utils/tableSchema';

// // const Navbar = () => {
// //   const navigate = useNavigate();
// //   const [anchorEl, setAnchorEl] = React.useState(null);

// //   const handleClick = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleClose = () => {
// //     setAnchorEl(null);
// //   };

// //   const handleTableClick = (tableName) => {
// //     navigate(`/table/${tableName}`);
// //     handleClose();
// //   };

// //   const handleLoginClick = () => {
// //     navigate(`/login`);
// //     handleClose();
// //   };

// //   const handleLogOutClick = () => {
// //     navigate(`/`);
// //     localStorage.removeItem('token')
// //     handleClose();
// //   };

// //   const token = localStorage.setItem('token')

// //   return (
// //     <AppBar position="static">
// //       <Toolbar>
// //         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// //           University Management System
// //         </Typography>
// //         {token ? <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
// //          onClick={() => handleLogOutClick()}
// //          >
// //           LogOut
// //         </Typography> : <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
// //          onClick={() => handleLoginClick()}
// //          >
// //           Login
// //         </Typography>}
// //         {token && <Box>
// //           <Button
// //             color="inherit"
// //             onClick={handleClick}
// //             aria-controls="tables-menu"
// //           >
// //             Tables
// //           </Button>
// //           }
// //           <Menu
// //             id="tables-menu"
// //             anchorEl={anchorEl}
// //             open={Boolean(anchorEl)}
// //             onClose={handleClose}
// //             PaperProps={{
// //               style: {
// //                 maxHeight: 400,
// //                 width: 250,
// //               },
// //             }}
// //           >
// //             {Object.keys(tableSchema).map((tableName) => (
// //               <MenuItem
// //                 key={tableName}
// //                 onClick={() => handleTableClick(tableName)}
// //                 sx={{
// //                   '&:hover': {
// //                     backgroundColor: 'rgba(0, 0, 0, 0.04)',
// //                   },
// //                 }}
// //               >
// //                 <Box sx={{ width: '100%' }}>
// //                   <Typography variant="body1">{tableName}</Typography>
// //                   <Typography variant="caption" color="text.secondary">
// //                     {tableSchema[tableName].fields.length} fields
// //                   </Typography>
// //                 </Box>
// //               </MenuItem>
// //             ))}
// //           </Menu>
// //         </Box>
// //       </Toolbar>
// //     </AppBar>
// //   );
// // };

// // export default Navbar; 

// import React from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Menu,
//   MenuItem,
//   Button,
//   Box,
//   IconButton,
//   Avatar,
//   Tooltip,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { tableSchema } from '../utils/tableSchema';
// import { useGetProfileQuery } from '../store/api/AuthApi';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const token = localStorage.getItem('token');
//   const { data: profile, isLoading, error } = useGetProfileQuery();

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleTableClick = (tableName) => {
//     navigate(`/table/${tableName}`);
//     handleClose();
//   };

//   const handleLoginClick = () => {
//     navigate(`/login`);
//     handleClose();
//   };

//   const handleLogOutClick = () => {
//     localStorage.removeItem('token');
//     navigate(`/`);
//     handleClose();
//   };

//   const handleProfileClick = () => {
//     navigate('/profile');
//     handleClose();
//   };

//   const handleHomeClick = () => {
//     navigate('/home');
//     handleClose();
//   };

//   const handleAllUsersClick = () => {
//     navigate('/dba/users');
//     handleClose();
//   };

//   // Determine accessible tables based on permissions
//   const accessibleTables =
//     profile?.is_superuser
//       ? Object.keys(tableSchema)
//       : Object.keys(profile?.permissions || {}).filter(
//           (table) => profile.permissions[table]?.can_view
//         );

//   return (
//     <AppBar position="static" sx={{ backgroundColor: '#1e88e5' }}>
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           University Management System
//         </Typography>

//         {token && profile && (
//           <>
//             {/* Home Button */}
//             <Button color="inherit" onClick={handleHomeClick}>
//               Home
//             </Button>

//             {/* Tables Dropdown */}
//             <Button color="inherit" onClick={handleClick} aria-controls="tables-menu">
//               Tables
//             </Button>
//             <Menu
//               id="tables-menu"
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//               PaperProps={{
//                 style: {
//                   maxHeight: 400,
//                   width: 250,
//                 },
//               }}
//             >
//               {accessibleTables.map((tableName) => (
//                 <MenuItem
//                   key={tableName}
//                   onClick={() => handleTableClick(tableName)}
//                   sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
//                 >
//                   <Box sx={{ width: '100%' }}>
//                     <Typography variant="body1">{tableName}</Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {tableSchema[tableName].fields.length} fields
//                     </Typography>
//                   </Box>
//                 </MenuItem>
//               ))}
//             </Menu>

//             {/* Conditionally Rendered All Users */}
//             {profile.is_superuser && (
//               <Button color="inherit" onClick={handleAllUsersClick}>
//                 All Users
//               </Button>
//             )}

//             {/* Profile and Logout */}
//             <Tooltip title="Profile">
//               <IconButton onClick={handleProfileClick} sx={{ ml: 2 }}>
//                 <Avatar sx={{ width: 32, height: 32 }}>
//                   {profile.username?.charAt(0).toUpperCase()}
//                 </Avatar>
//               </IconButton>
//             </Tooltip>

//             <Button color="inherit" onClick={handleLogOutClick} sx={{ ml: 2 }}>
//               LogOut
//             </Button>
//           </>
//         )}

//         {!token && (
//           <Button color="inherit" onClick={handleLoginClick}>
//             Login
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;


import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Box,
  IconButton,
  Avatar,
  Tooltip,
  Divider,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { tableSchema } from '../utils/tableSchema';
import { useGetProfileQuery } from '../store/api/AuthApi';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = localStorage.getItem('token');
  const { data: profile, isLoading } = useGetProfileQuery();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  const accessibleTables =
    profile?.is_superuser
      ? Object.keys(tableSchema)
      : Object.keys(profile?.permissions || {}).filter(
          (table) => profile.permissions[table]?.can_view
        );

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #1565c0, #42a5f5)',
        boxShadow: theme.shadows[4],
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        {/* Brand */}
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            color: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/home')}
        >
          University Manager
        </Typography>

        {/* Authenticated Navbar */}
        {token && profile ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => handleNavigate('/home')}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Home
            </Button>

            <Button
              color="inherit"
              onClick={handleClick}
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Tables
            </Button>

            <Menu
              id="tables-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 400,
                  width: 260,
                  borderRadius: 10,
                  padding: '8px 0',
                },
              }}
            >
              {accessibleTables.map((tableName) => (
                <MenuItem
                  key={tableName}
                  onClick={() => handleNavigate(`/table/${tableName}`)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    px: 2,
                    py: 1,
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="500">
                    {tableName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {tableSchema[tableName]?.fields.length} fields
                  </Typography>
                </MenuItem>
              ))}
            </Menu>

            {profile?.is_superuser && (
              <Button
                color="inherit"
                onClick={() => handleNavigate('/dba/users')}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                All Users
              </Button>
            )}

            {/* Profile Avatar & Logout */}
            <Tooltip title="View Profile">
              <IconButton onClick={() => handleNavigate('/profile')} sx={{ p: 0 }}>
                <Avatar
                  sx={{ width: 36, height: 36, bgcolor: '#fff', color: theme.palette.primary.main }}
                >
                  {profile?.username?.[0]?.toUpperCase() || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem('token');
                handleNavigate('/');
              }}
              sx={{ textTransform: 'none', ml: 1, fontWeight: 500 }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          // Unauthenticated Navbar
          <Button
            color="inherit"
            onClick={() => handleNavigate('/login')}
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
