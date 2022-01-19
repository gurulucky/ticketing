import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { resetPassword, saveDetail } from '../../actions/auth';
import { Container, TextField, Stack, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { RootStyle } from '../styled/StyledInput';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        curPassword: '',
        password: '',
        password2: ''
    });

    const { firstName, lastName, email, phone, role, curPassword, password, password2 } = formData;

    useEffect(() => {
        setFormData({ ...formData, ...user });
        // console.log('useeffect');
    }, [user])

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAccountType = (e) => {
        setFormData({ ...formData, role: e.target.value });
        // console.log({ ...formData, role: e.target.value });
    }

    const onSaveDetail = (e) => {
        e.preventDefault();
        dispatch(saveDetail({ firstName, lastName, email, phone, role }));
    };

    const onResetPassword = (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            dispatch(resetPassword({ curPassword, password }));
        }
    }

    // if (isAuthenticated) {
    //   return <Redirect to="/dashboard" />;
    // }

    return (
        <RootStyle>
            <Stack direction='row' spacing={3} alignItems='flex-start'>
                <Stack sx={{width:'50%'}}>
                    <form onSubmit={onSaveDetail}>
                        <Stack direction='column' spacing={2}>
                            <Typography className="caption" variant='h5'>User Detail</Typography>
                            <Stack direction="row" spacing={1}>
                                <TextField
                                    type='text'
                                    label="First Name"
                                    name="firstName"
                                    value={firstName}
                                    onChange={onChange}
                                    sx={{ width: "50%" }}
                                    required
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
                                type="email"
                                label="Email Address"
                                name="email"
                                value={email}
                                onChange={onChange}
                                sx={{ width: "100%" }}
                                required
                            />
                            <TextField
                                type="number"
                                label="Phone number"
                                name="phone"
                                value={phone}
                                onChange={onChange}
                                sx={{ width: "100%" }}
                            />
                            <RadioGroup row aria-label="Accout type" value={role} name="row-radio-buttons-group" onChange={handleAccountType}>
                                <FormControlLabel value="guest" control={<Radio />} label="Guest" />
                                <FormControlLabel value="client" control={<Radio />} label="Client" />
                            </RadioGroup>
                            {/* <input type="submit" className="btn btn-primary" value="Register" /> */}
                            <Button variant='contained' color='primary' type='submit'>Save Details</Button>
                        </Stack>
                    </form>
                </Stack>
                <Stack sx={{width:'50%'}}>
                    <form onSubmit={onResetPassword}>
                        <Stack direction='column' spacing={2}>
                            <Typography className="caption" variant='h5'>PASSWORD RESET</Typography>
                            <TextField
                                type="password"
                                label="Current password"
                                name="curPassword"
                                value={curPassword}
                                onChange={onChange}
                                required
                            />
                            <TextField
                                type="password"
                                label="New password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                            <TextField
                                type="password"
                                label="Confirm password"
                                name="password2"
                                value={password2}
                                onChange={onChange}
                                required
                            />
                            <Button variant='contained' color='primary' type='submit'>Reset password</Button>
                        </Stack>
                    </form>
                </Stack>
            </Stack>
        </RootStyle>
    );
};

export default Profile;
