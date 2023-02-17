import React, { useEffect } from 'react';
import { getNewParcels } from '../store/actions/parcelActions';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Stack, Button } from '@mui/material';
import ParcelCard from '../components/ParcelCard';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../store/actions/bikerAuthActions';

const ParcelsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parcels = useSelector(state => state.parcelsReducer.parcels);
  const profileData = useSelector(state => state.bikerAuthReducer.biker);
  const token = useSelector(state => state.bikerAuthReducer.biker_token);
  const error = useSelector(state => state.parcelsReducer.error);
  useEffect(() => {
    if (!profileData) { dispatch(getProfile(token)); }
    if (profileData && token) { dispatch(getNewParcels(token)); }
  }, [profileData]);

  useEffect(() => {
    if (error) { navigate('/biker-login'); return; }
  }, [error]);

  useEffect(() => {
    if (!token) { navigate('/biker-login'); return; }

  }, []);
  return (
    <Box>
      <Typography mb={'20px'} variant='h3' textTransform={'capitalize'} fontWeight={'700'}>new parcels</Typography>
      <Stack direction='row' flexWrap='wrap'>
        {parcels.length ? parcels.map((parcel, i) => <ParcelCard key={i} parcel={parcel}></ParcelCard>) : <Typography variant='h4' textTransform={'capitalize'} color='red' fontWeight={'400'}>no ready parcels yet</Typography>}
      </Stack>
    </Box>
  )
}

export default ParcelsPage;