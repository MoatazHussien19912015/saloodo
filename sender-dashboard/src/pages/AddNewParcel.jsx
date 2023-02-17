import { Box, Button, TextField, Alert } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { url } from '../config';
import { useNavigate } from 'react-router-dom';
import ParcelModal from '../components/ParcelModal';
const AddNewParcel = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.senderAuthReducer.sender_token);
    const profileData = useSelector(state => state.senderAuthReducer.sender);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [pickUpAddress, setPickUpAddress] = useState('');
    const [dropOffAddress, setDropOffAddress] = useState('');
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClose = () => { setOpen(false); navigate('/sender-profile') };

    useEffect(() => {
        if (!token && !profileData) { navigate('/sender-login'); }
    }, []);


    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const result = await axios.post(`${url}/parcels/add-parcel`, { name, description, image, pick_up_address: pickUpAddress, drop_off_address: dropOffAddress },
                { headers: { 'x-auth': token } });
            setOpen(true);
        }
        catch (err) { setError(err.response.data); }
    };
    return (
        <Box component='form' onSubmit={handleSubmit} padding='20px'>
            <Stack gap='20px'>
                <TextField required sx={{ width: '50%' }} name='name' onChange={(evt) => setName(evt.target.value)} label='name' variant='outlined' type='text' />
                <TextField required sx={{ width: '50%' }} name='description' onChange={(evt) => setDescription(evt.target.value)} label='description' variant='outlined' type='text' />
                <TextField sx={{ width: '50%' }} name='image' onChange={(evt) => setImage(evt.target.value)} label='image' variant='outlined' type='text' />
                <TextField required sx={{ width: '50%' }} name='pickUpAddress' onChange={(evt) => setPickUpAddress(evt.target.value)} label='pick Up Address' variant='outlined' type='text' />
                <TextField required sx={{ width: '50%' }} name='dropOffAddress' onChange={(evt) => setDropOffAddress(evt.target.value)} label='drop Off Address' variant='outlined' type='text' />
                <Button type='submit' variant='contained' size='large' sx={{ width: '50%', fontSize: '20px', fontWeight: '700' }}>Submit</Button>
            </Stack>
            {error && <Alert severity="error">{error?.message}!</Alert>}
            <ParcelModal open={open} handleClose={handleClose} text={'parcel has been added'} />
        </Box>
    )
}

export default AddNewParcel;