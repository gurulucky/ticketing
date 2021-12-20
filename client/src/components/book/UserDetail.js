import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Typography, Stack } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserDetail = ({ user, onChangeUser }) => {

    const [userData, setUserData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: ''
    });

    const { email, firstName, lastName, phone } = userData;

    useEffect(() => {
        if (user) {
            setUserData({ ...user });
        } else {
            setUserData({
                email: '',
                firstName: '',
                lastName: '',
                phone: ''
            })
        }
    }, [user])

    const onChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        onChangeUser({ ...userData, [e.target.name]: e.target.value });
    }

    return (
        // <Stack direction='column'>
        <>
            <Typography variant='h5' color='white' sx={{ backgroundColor: '#17a2b8', p: '5px', my: '10px' }}>
                YOUR DETAILS
            </Typography>
            <Stack direction='column' spacing={2}>
                {
                    user ?
                        <Stack direction='row' alignItems='center' spacing={1} sx={{ borderRadius: '3px', background: 'rgb(230,230,230)', p: '10px' }}>
                            <AccountCircleIcon color='primary' fontSize='large' />
                            <Stack direction='column'>
                                <Typography variant='body1' fontWeight='bold'>
                                    {email}
                                </Typography>
                                <Typography variant='body2'>
                                    {`We'll send your order to this email.`}
                                </Typography>
                            </Stack>
                        </Stack>
                        : <>
                            <Stack direction='row' alignItems='center' spacing={1} sx={{ borderRadius: '3px', background: 'rgb(230,230,230)', p: '10px' }}>
                                <AccountCircleIcon color='primary' fontSize='large' />
                                <Typography variant='body2'>
                                    <Link to="/login">Sign in</Link> or continue as a guest.
                                </Typography>
                            </Stack>
                            <TextField
                                type="email"
                                label="Email Address"
                                name="email"
                                value={email}
                                onChange={onChange}
                                sx={{ width: "100%" }}
                            />
                        </>
                }
                <Stack direction="row" spacing={1}>
                    <TextField
                        type='text'
                        label="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={onChange}
                        sx={{ width: "50%" }}
                        required={true}
                    />
                    <TextField
                        type='text'
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={onChange}
                        sx={{ width: "50%" }}
                        required
                    />
                </Stack>
                <TextField
                    type="number"
                    label="Phone number"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    sx={{ width: "100%" }}
                    required
                />
            </Stack>
        </>
    )

}

export default UserDetail;