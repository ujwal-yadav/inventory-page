import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useLogin } from './Login.hooks';

export default function Login() {
  const { username, password, errors, handleChange, handleLogin } = useLogin();

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'white',
            paddingX: 3,
            paddingTop: 2,
            paddingBottom: 1,
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary' }} />
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoFocus
              error={errors.username}
              helperText={errors.username ? 'User Name is required' : ''}
              value={username}
              onChange={handleChange}
              InputProps={{
                style: {
                  borderRadius: '8px',
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={errors.password}
              helperText={errors.password ? 'Password is required' : ''}
              value={password}
              onChange={handleChange}
              InputProps={{
                style: {
                  borderRadius: '8px',
                },
              }}
            />

            <Button
              fullWidth
              type="button"
              sx={{
                boxShadow: 0,
                borderRadius: 2,
                fontWeight: 600,
                mt: 2,
                mb: 2,
                padding: 1,
              }}
              variant="contained"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
