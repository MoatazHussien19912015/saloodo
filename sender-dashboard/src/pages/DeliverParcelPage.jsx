import { Box, Button, TextField, Alert } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { url } from '../config';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfile } from '../store/actions/bikerAuthActions';
import ParcelModal from '../components/ParcelModal';
const DeliverParcelPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.bikerAuthReducer.biker_token);
    const profileData = useSelector(state => state.bikerAuthReducer.biker);
    const bikerParcels = useSelector(state => state.bikerAuthReducer.parcels);
    const [error, setError] = useState(null);
    const [parcel, setParcel] = useState({});
    const [open, setOpen] = useState(false);
    const { id } = useParams();

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            axios.get(`${url}/parcels/deliver-parcel/${id}`, { headers: { 'x-auth': token } }); dispatch(getProfile(token));
            setOpen(true);
        }

        catch (err) { setError(err.response.data) }
    };

    useEffect(() => {
        if (token && !profileData) { dispatch(getProfile(token)); }
    }, [token]);

    useEffect(() => {
        if (bikerParcels.length) { setParcel(bikerParcels.filter(item => item._id == id)[0]); }
    }, [bikerParcels]);


    useEffect(() => {
        if (!token) { navigate('/biker-login'); }
    }, []);
    const handleClose = () => { setOpen(false); navigate('/biker-profile') };
    return (
        <Box component='form' onSubmit={handleSubmit} padding='20px'>
            <Stack gap='20px'>
                <TextField disabled sx={{ width: '50%' }} name='name' value={parcel?.name} variant='outlined' type='text' />
                <TextField disabled sx={{ width: '50%' }} name='description' value={parcel?.description} variant='outlined' type='text' />
                <TextField disabled sx={{ width: '50%' }} name='image' value={parcel?.image} label='image' variant='outlined' type='text' />
                <TextField disabled sx={{ width: '50%' }} name='pickUpAddress' value={parcel?.pick_up_address} variant='outlined' type='text' />
                <TextField disabled sx={{ width: '50%' }} name='dropOffAddress' value={parcel?.drop_off_address} variant='outlined' type='text' />
                <TextField disabled sx={{ width: '50%' }} name='date' value={parcel?.pick_up_date} variant='outlined' type='date' />
                <TextField disabled sx={{ width: '50%' }} name='date' value={parcel?.delivery_date} variant='outlined' type='date' />
                <Button type='submit' variant='contained' size='large' sx={{ width: '50%', fontSize: '20px', fontWeight: '700' }}>Deliver</Button>
            </Stack>
            {error && <Alert severity="error">{error?.message}!</Alert>}
            <ParcelModal open={open} handleClose={handleClose} text={'parcel has been delivered'} />
        </Box>
    )
}

export default DeliverParcelPage;