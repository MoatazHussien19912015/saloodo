import React, { useEffect, useState } from 'react';
import { getProfile } from '../store/actions/bikerAuthActions';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Stack, Button } from '@mui/material';
import ParcelCard from '../components/ParcelCard';
import { useNavigate } from 'react-router-dom';
const BikerProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.bikerAuthReducer.biker_token);
  const profileData = useSelector(state => state.bikerAuthReducer.biker);
  const parcels = useSelector(state => state.bikerAuthReducer.parcels);
  const error = useSelector(state => state.bikerAuthReducer.error);


  const picked = parcels.filter(parcel => parcel.status == 'picked');
  const delivered = parcels.filter(parcel => parcel.status == 'delivered');

  useEffect(() => {
    if (token && !profileData) { dispatch(getProfile(token)); }
  }, [token]);

  useEffect(() => {
    if (error) { navigate('/biker-login') }
  }, [error]);

  useEffect(() => {
    if (!token) { navigate('/biker-login') }
  }, []);



  return (
    <Box>
      <Typography mb='20px' variant='h2'>welcome {profileData?.username}</Typography>
      <Button type='submit' onClick={() => navigate('/parcels')} variant='contained' sx={{ marginBottom: '20px', fontSize: '20px', fontWeight: '700' }}>find new parcels</Button>

      <Box border={'10px solid  #ffff00'} borderRadius='20px' padding='20px' mb='30px' >
        <Typography mb={'20px'} variant='h3' textTransform={'capitalize'} fontWeight={'700'}>pending parcels</Typography>
        <Stack direction='row' gap='50px' justifyContent='flex-start' mb='20px'>
          {picked.length ? picked.map((parcel, i) => <ParcelCard key={i} parcel={parcel}></ParcelCard>) : <Typography variant='h4' textTransform={'capitalize'} color='red' fontWeight={'400'}>no picked up pending parcels yet</Typography>}
        </Stack>
      </Box>

      <Box border={'10px solid  #009900'} borderRadius='20px' padding='20px' mb='30px' >
        <Typography mb={'20px'} variant='h3' textTransform={'capitalize'} fontWeight={'700'}>delivered parcels</Typography>
        <Stack direction='row' gap='50px' justifyContent='flex-start' mb='20px'>
          {delivered.length ? delivered.map((parcel, i) => <ParcelCard key={i} parcel={parcel}></ParcelCard>) : <Typography variant='h4' textTransform={'capitalize'} color='red' fontWeight={'400'}>no delivered parcels yet</Typography>}
        </Stack>
      </Box>

    </Box>
  )
}

export default BikerProfilePage;