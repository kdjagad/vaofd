import { Box, Button, CssBaseline, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils';

function Dashboard(props) {
    const navigate = useNavigate();
    let { name = '', email = '' } = getCurrentUser();
    const logOut = () => {
        localStorage.clear();
        navigate('/signin', { replace: true });
    }
    React.useEffect(() => {
        if (!email) navigate('/signin', { replace: true })
    }, [])
    return (
        <>
            <CssBaseline />
            <Box sx={{
                py: 5
            }}>
                <Typography variant='h4' textAlign={'left'}>Welcome, {name}</Typography>
                <Button sx={{ mt: 2 }} variant='contained' onClick={logOut}>Logout</Button>
            </Box>
        </>
    )
}

export default Dashboard;