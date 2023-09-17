import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const Navbar = () => {

    const { user, logout } = useAuth()
    const { isAuthenticated, username } = user
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const settings = [username, 'Logout'];

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const renderNavbar = () => {
        if (isAuthenticated) {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Contact Management
                            </Typography>

                            <Button color="inherit"><Link to="/contacts">Contacts</Link></Button>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Profile" src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            {setting === 'Logout' ? <Typography textAlign="center" onClick={logout()}>{setting}</Typography> :
                                                <Typography textAlign="center">{setting}</Typography>}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                        </Toolbar>
                    </AppBar>
                </Box>
            );

        } else {
            return (
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Contact Management
                            </Typography>
                            <Button color="inherit"><Link to="/login">Login</Link></Button>
                            <Button color="inherit"><Link to="/signup">Signup</Link></Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            );
        }
    };

    return <>{renderNavbar()}</>;
}

export default Navbar