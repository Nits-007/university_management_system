// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
// import { tableSchema } from '../utils/tableSchema';
// import { useGetProfileQuery } from '../store/api/AuthApi';

// const Home = () => {
//   const navigate = useNavigate();

//   const handleCardClick = (tableName) => {
//     navigate(`/table/${tableName}`);
//   };

//   const { data: profile, isLoading, error } = useGetProfileQuery();
  

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
//         University Management System
//       </Typography>
      
//       <Grid container spacing={3}>
//         {Object.entries(tableSchema).map(([tableName, schema]) => (
//           <Grid item xs={12} sm={6} md={3} key={tableName}>
//             <Card 
//               sx={{ 
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 transition: 'transform 0.2s',
//                 '&:hover': {
//                   transform: 'scale(1.02)',
//                   boxShadow: 3
//                 }
//               }}
//             >
//               <CardActionArea 
//                 onClick={() => handleCardClick(tableName)}
//                 sx={{ height: '100%' }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" component="h2" gutterBottom>
//                     {tableName}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Fields: {schema.fields.length}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                     {schema.fields.map(field => field.name).join(', ')}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Home; 

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActionArea,
//   CircularProgress,
// } from '@mui/material';
// import { tableSchema } from '../utils/tableSchema';
// import { useGetProfileQuery } from '../store/api/AuthApi';

// const Home = () => {
//   const navigate = useNavigate();
//   const { data: profile, isLoading, error } = useGetProfileQuery();

//   const handleCardClick = (tableName) => {
//     navigate(`/table/${tableName}`);
//   };

//   if (isLoading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error || !profile) {
//     return (
//       <Typography color="error" align="center" mt={4}>
//         Failed to load user permissions.
//       </Typography>
//     );
//   }

//   // Determine accessible tables
// const accessibleTables = profile.is_superuser
//                     ? Object.keys(tableSchema) // All tables for superuser
//                     : Object.keys(profile.permissions).filter(
//                         (table) => profile.permissions[table]?.can_view
//   );

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
//         University Management System
//       </Typography>

//       <Grid container spacing={3}>
//         {Object.entries(tableSchema)
//           .filter(([tableName]) => accessibleTables.includes(tableName))
//           .map(([tableName, schema]) => (
//             <Grid item xs={12} sm={6} md={3} key={tableName}>
//               <Card
//                 sx={{
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   transition: 'transform 0.2s',
//                   '&:hover': {
//                     transform: 'scale(1.02)',
//                     boxShadow: 3,
//                   },
//                 }}
//               >
//                 <CardActionArea onClick={() => handleCardClick(tableName)} sx={{ height: '100%' }}>
//                   <CardContent>
//                     <Typography variant="h6" component="h2" gutterBottom>
//                       {tableName}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Fields: {schema.fields.length}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                       {schema.fields.map((field) => field.name).join(', ')}
//                     </Typography>
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  Avatar,
  Paper,
  Divider,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { tableSchema } from '../utils/tableSchema';
import { useGetProfileQuery } from '../store/api/AuthApi';

const Home = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading, error } = useGetProfileQuery();

  const handleCardClick = (tableName) => {
    navigate(`/table/${tableName}`);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !profile) {
    return (
      <Typography color="error" align="center" mt={4}>
        Failed to load user permissions.
      </Typography>
    );
  }

  const accessibleTables = profile.is_superuser
    ? Object.keys(tableSchema)
    : Object.keys(profile.permissions).filter(
        (table) => profile.permissions[table]?.can_view
      );

  return (
    <Box sx={{ backgroundColor: '#f9f9fb', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Welcome Banner */}
        <Paper elevation={3} sx={{ p: 4, mb: 5, borderRadius: 3, background: '#ffffff' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Welcome, {profile?.username || 'Admin'} 👋
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {profile?.is_superuser ? 'Superuser' : 'Staff'} access to the University Management Dashboard.
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#1976d2', width: 60, height: 60 }}>
              <SchoolIcon fontSize="large" />
            </Avatar>
          </Box>
        </Paper>

        <Typography variant="h5" sx={{ mb: 3 }}>
          Accessible Modules
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* Grid of Cards */}
        <Grid container spacing={4}>
          {Object.entries(tableSchema)
            .filter(([tableName]) => accessibleTables.includes(tableName))
            .map(([tableName, schema]) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={tableName}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(tableName)} sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                        {tableName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Fields: {schema.fields.length}
                      </Typography>
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        sx={{
                          mt: 1,
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                          overflow: 'hidden',
                        }}
                      >
                        {schema.fields.map((field) => field.name).join(', ')}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

