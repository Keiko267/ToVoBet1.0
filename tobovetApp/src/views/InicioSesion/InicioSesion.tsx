import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import logo from 'assets/logoNoBgCaqui.png';

export const InicioSesion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        setError('');
        // Validar credenciales específicas
        if (email === 'correo@tobovet.com' && password === 'root') {
            localStorage.setItem('token', 'fake-token'); // Guardar un token ficticio
            navigate('/'); // Redirigir a la página de inicio
        } else {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <Box className="login-container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <Card sx={{ maxWidth: 400, p: 2 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <img src={logo} alt="Logo" style={{ width: '150px' }} />
                    </Box>
                    <Typography variant="h5" gutterBottom align="center">
                        Iniciar Sesión
                    </Typography>
                    <TextField
                        fullWidth
                        label="Correo Electrónico"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleLogin}>
                        Iniciar Sesión
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};