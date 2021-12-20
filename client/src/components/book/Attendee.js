import { Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import CreditCardIcon from '@mui/icons-material/CreditCard';

const Attendee = ({ orders, tickets, user, onChangeAttendee }) => {
    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        var newAttendees = [];
        orders?.forEach(order => {
            for (let i = 0; i < order[1]; i++) {
                if (i === 0) {
                    newAttendees.push({
                        ticketId: order[0],
                        firstName: user?.firstName,
                        lastName: user?.lastName
                    });
                } else {
                    newAttendees.push({
                        ticketId: order[0],
                        firstName: '',
                        lastName: ''
                    });
                }
            }
        })
        setAttendees(newAttendees);
    }, [orders, user])

    const changeAttendee = (e, index, firstOrLast) => {
        let newAttendees = [...attendees];
        newAttendees[index][firstOrLast] = e.target.value;
        setAttendees(newAttendees);
        onChangeAttendee(newAttendees);
    }

    return (
        <>
            <Typography variant='h5' color='white' sx={{ backgroundColor: '#17a2b8', p: '5px', my: '10px' }}>
                ATTENDEE DETAILS
            </Typography>
            <Stack direction='row' alignItems='center' spacing={1} sx={{ borderRadius: '3px', background: 'rgb(230,230,230)', p: '10px' }}>
                <CreditCardIcon color='error' fontSize='large' />
                <Typography variant='body2'>
                    {`Photo IDs may be checked for each attendee when tickets are scanned and must match the details entered here.`}
                </Typography>
            </Stack>
            {
                attendees.map((attendee, index) => {
                    let ticketName = tickets.find(ticket => ticket._id === attendee.ticketId)?.name;
                    return (
                        <Stack direction='column' spacing={1}>
                            <Typography variant='h6'>
                                {`${index + 1}. ${ticketName}`}
                            </Typography>
                            <Stack direction='row' spacing={1}>
                                <TextField type='text' label='First name' value={attendee.firstName} onChange={(e) => changeAttendee(e, index, 'firstName')} sx={{ width: '50%' }} />
                                <TextField type='text' label='Last name' value={attendee.lastName} onChange={(e) => changeAttendee(e, index, 'lastName')} sx={{ width: '50%' }} />
                            </Stack>
                        </Stack>
                    )
                })
            }
        </>
    )
}

export default Attendee;