import { Box, Button, TextField, Alert } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState, useEffect } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfile } from '../store/actions/bikerAuthActions';
import ParcelModal from '../components/ParcelModal';
import { pickParcel } from '../store/actions/parcelActions';
const PickParcelPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pickupDate, setPickupDate] = useState(new Date().toISOString().substring(0, 10));
    const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().substring(0, 10));
    const token = useSelector(state => state.bikerAuthReducer.biker_token);
    const profileData = useSelector(state => state.bikerAuthReducer.biker);
    const parcels = useSelector(state => state.parcelsReducer.parcels);
    const bikerParcels = useSelector(state => state.bikerAuthReducer.parcels);
    const error = useSelector(state => state.parcelsReducer.error);
    const [parcel, setParcel] = useState({});
    const [open, setOpen] = useState(false);
    const {id} = useParams();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(pickParcel(token, id, {pick_up_date: pickupDate, delivery_date: deliveryDate}));
        dispatch(getProfile(token));
    };

    useEffect(()=>{
        if(token && !profileData){dispatch(getProfile(token));}
    },[token]);

    useEffect(()=>{
        if(parcels.length){setParcel(parcels.filter(parcel=>parcel._id==id)[0]);}
    },[]);

    useEffect(()=>{
        if(bikerParcels.findIndex(item=>item._id == parcel._id)>-1){setOpen(true);}
    },[bikerParcels]);

    /* useEffect(()=>{
      if(error){navigate('/parcels')}
  },[error]); */

  useEffect(()=>{
    if(!token){navigate('/biker-login');}
},[]);
const handleClose = () => {setOpen(false); navigate('/biker-profile')};
  return (
    <Box component='form' onSubmit={handleSubmit} padding='20px'>
        <Stack gap='20px'>
        <TextField disabled  sx={{width: '50%'}} name='name' value={parcel?.name} label='name' variant='outlined' type='text' />
        <TextField disabled  sx={{width: '50%'}} name='description'  value={parcel?.description}  label='description' variant='outlined' type='text' />
        <TextField disabled sx={{width: '50%'}} name='image'  value={parcel?.image} label='image' variant='outlined' type='text' />
        <TextField disabled  sx={{width: '50%'}} name='pickUpAddress' value={parcel?.pick_up_address} variant='outlined' type='text' />
        <TextField disabled  sx={{width: '50%'}} name='dropOffAddress' value={parcel?.drop_off_address} variant='outlined' type='text' />
        <TextField required name='date' onChange={(evt)=>setPickupDate(evt.target.value)} value={pickupDate} label='pick up date' variant='outlined' type='date' inputProps={{min: new Date().toISOString().substring(0, 10)}} />
        <TextField required name='date' onChange={(evt)=>setDeliveryDate(evt.target.value)} value={deliveryDate} label='delivery date' variant='outlined' type='date' inputProps={{min: new Date().toISOString().substring(0, 10)}} />
        <Button type='submit' variant='contained' size='large' sx={{width: '50%', fontSize: '20px', fontWeight: '700'}}>Confirm</Button>
        </Stack>
        {error&&<Alert severity="error">{error?.message}!</Alert>}
        <ParcelModal open={open} handleClose={handleClose} text={'parcel has been picked'} />
    </Box>
  )
}

export default PickParcelPage;