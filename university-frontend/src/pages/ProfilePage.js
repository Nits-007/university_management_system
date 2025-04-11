// import React from 'react';
// import { Container, Typography, Paper, Avatar, Grid, CircularProgress, Box } from '@mui/material';
// import { useGetProfileQuery } from '../store/api/AuthApi';

// const ProfilePage = () => {
//   const { data: profile, isLoading, error } = useGetProfileQuery();

//   if (isLoading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Typography color="error" align="center" mt={4}>
//         Failed to load profile data.
//       </Typography>
//     );
//   }

//   return (
//     <Container maxWidth="sm" sx={{ mt: 6 }}>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
//           <Avatar
//             sx={{ width: 100, height: 100 }}
//             src={profile?.avatarUrl || ''}
//             alt={profile?.name || 'User'}
//           />
//         </Box>

//         <Typography variant="h4" align="center" gutterBottom>
//           {profile?.username || 'No Name'}
//         </Typography>

//         <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
//           {profile.is_superuser ? "DBA" : "User"}
//         </Typography>

//         <Grid container spacing={2} sx={{ mt: 2 }}>
//           <Grid item xs={6}>
//             <Typography variant="body1" fontWeight="bold">Email:</Typography>
//           </Grid>
//           <Grid item xs={6}>
//             <Typography variant="body1">{profile?.email || 'N/A'}</Typography>
//           </Grid>

//           <Grid item xs={6}>
//             <Typography variant="body1" fontWeight="bold">Mobile:</Typography>
//           </Grid>
//           <Grid item xs={6}>
//             <Typography variant="body1">{profile?.mobile || 'N/A'}</Typography>
//           </Grid>

//           {!profile?.is_superuser && (
//             <Grid item xs={12}>
//               <Typography variant="body1" fontWeight="bold">Permissions:</Typography>
//               <Grid container spacing={1} sx={{ mt: 1 }}>
//                 {Object.entries(profile?.permissions || {}).map(([key, value]) => {
//                   console.log("value ", value)
//                   if (value.can_view) {
//                     return (
//                       <Grid item xs={6} key={key}>
//                         <Paper elevation={2} sx={{ p: 2 }}>
//                           <Typography variant="body2" fontWeight="bold">{key}</Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             View: {value.can_view ? 'Yes' : 'No'} |{" "}
//                             Create: {value.can_create  ? 'Yes' : 'No'} |{" "}
//                             Edit: {value.can_edit ? 'Yes' : 'No'} |{" "}
//                             Delete: {value.can_delete ? 'Yes' : 'No'}
//                           </Typography>
//                         </Paper>
//                       </Grid>
//                     );
//                   }
//                   return null;
//                 })}
//               </Grid>
//             </Grid>
//           )}


//           {/* Add more fields here if needed */}
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default ProfilePage;

import React from 'react';
import {
  Container, Typography, Paper, Avatar, Grid, CircularProgress,
  Box, Divider, Chip, Fade
} from '@mui/material';
import { useGetProfileQuery } from '../store/api/AuthApi';
import PersonIcon from '@mui/icons-material/Person';

const ProfilePage = () => {
  const { data: profile, isLoading, error } = useGetProfileQuery();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={6}>
        Failed to load profile data.
      </Typography>
    );
  }

  return (
    <Fade in timeout={500}>
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: 'background.paper',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Avatar
              sx={{ width: 100, height: 100, bgcolor: 'primary.main', fontSize: 40 }}
              src={profile?.avatarUrl || ''}
            >
              {!profile?.avatarUrl && <PersonIcon fontSize="large" />}
            </Avatar>
          </Box>

          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            {profile?.username || 'No Name'}
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            {profile?.is_superuser ? 'Database Admin' : 'Authorized User'}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Typography variant="body1" fontWeight="bold">Email:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1" color="text.secondary">{profile?.email || 'N/A'}</Typography>
            </Grid>

            <Grid item xs={5}>
              <Typography variant="body1" fontWeight="bold">Mobile:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="body1" color="text.secondary">{profile?.mobile || 'N/A'}</Typography>
            </Grid>
          </Grid>

          {!profile?.is_superuser && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Access Permissions
              </Typography>

              {/* <Grid container spacing={2}>
                {Object.entries(profile?.permissions || {}).map(([key, value]) => (
                  value.can_view && (
                    <Grid item xs={12} sm={6} key={key}>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'grey.100',
                          borderLeft: '4px solid #1976d2',
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                          {key}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          <Chip label="View" color={value.can_view ? 'primary' : 'default'} size="small" />
                          <Chip label="Create" color={value.can_create ? 'success' : 'default'} size="small" />
                          <Chip label="Edit" color={value.can_edit ? 'warning' : 'default'} size="small" />
                          <Chip label="Delete" color={value.can_delete ? 'error' : 'default'} size="small" />
                        </Box>
                      </Paper>
                    </Grid>
                  )
                ))}
              </Grid> */}
              <Grid container spacing={2}>
                {Object.entries(profile?.permissions || {}).map(([key, value]) => (
                  value.can_view && (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={key}>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'grey.100',
                          borderLeft: '4px solid #1976d2',
                          height: '100%', // makes all cards equal height
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                          {key}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          <Chip label="View" color={value.can_view ? 'primary' : 'default'} size="small" />
                          <Chip label="Create" color={value.can_create ? 'success' : 'default'} size="small" />
                          <Chip label="Edit" color={value.can_edit ? 'warning' : 'default'} size="small" />
                          <Chip label="Delete" color={value.can_delete ? 'error' : 'default'} size="small" />
                        </Box>
                      </Paper>
                    </Grid>
                  )
                ))}
              </Grid>

            </>
          )}
        </Paper>
      </Container>
    </Fade>
  );
};

export default ProfilePage;

