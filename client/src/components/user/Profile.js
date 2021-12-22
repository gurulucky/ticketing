import React, { Fragment, useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { resetPassword, saveDetail, savePassword } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Container, TextField, Stack, Button, Typography } from '@mui/material';

const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        curPassword: '',
        password: '',
        password2: ''
    });

    const { firstName, lastName, email, phone, curPassword, password, password2 } = formData;

    useEffect(() => {
        setFormData({ ...formData, ...user });
        // console.log('useeffect');
    }, [user])

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSaveDetail = (e) => {
        e.preventDefault();
        dispatch(saveDetail({ firstName, lastName, email, phone }));
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
        <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
            <Stack direction='row' spacing={3}>

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

                        {/* <input type="submit" className="btn btn-primary" value="Register" /> */}
                        <Button variant='contained' color='primary' type='submit'>Save Details</Button>
                    </Stack>
                </form>
                <form onSubmit={onResetPassword}>
                    <Stack direction='column' spacing={2}>
                        <Typography className="caption" variant='h5'>User Detail</Typography>
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
        </Container>
    );
};

export default Profile;
