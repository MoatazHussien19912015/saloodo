import React, { useEffect } from 'react';
import { getProfile } from '../store/actions/senderAuthActions';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Stack, Button } from '@mui/material';
import ParcelCard from '../components/ParcelCard';
import { useNavigate } from 'react-router-dom';
const SenderProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.senderAuthReducer.sender_token);
  const profileData = useSelector(state => state.senderAuthReducer.sender);
  const parcels = useSelector(state => state.senderAuthReducer.parcels);
  const error = useSelector(state => state.senderAuthReducer.error);
  const ready = parcels.filter(parcel => parcel.status == 'ready');
  const picked = parcels.filter(parcel => parcel.status == 'picked');
  const delivered = parcels.filter(parcel => parcel.status == 'delivered');
  useEffect(() => {
    if (token && !profileData) { dispatch(getProfile(token)); }
  }, [token]);

  useEffect(() => {
    if (error) { navigate('/sender-login') }
  }, [error]);

  useEffect(() => {
    if (!token) { navigate('/sender-login') }
  }, []);



  return (
    <Box>
      <Typography mb='20px' variant='h2'>welcome {profileData?.username}</Typography>
      <Box border={'10px solid  #0099ff'} borderRadius='20px' padding='20px' mb='30px' >

        <Typography mb={'20px'} variant='h3' textTransform={'capitalize'} fontWeight={'700'}>ready to pick Up parcels</Typography>
        <Stack direction='row' gap='50px' justifyContent='flex-start' mb='20px'>
          {ready.length ? ready.map((parcel, i) => <ParcelCard key={i} parcel={parcel} type='sender'></ParcelCard>) : <Typography variant='h4' textTransform={'capitalize'} color='red' fontWeight={'400'}>no ready to pick up parcels yet</Typography>}
        </Stack>
      </Box>

      <Box border={'10px solid  #ffff00'} borderRadius='20px' padding='20px' mb='30px' >
        <Typography mb={'20px'} variant='h3' textTransform={'capitalize'} fontWeight={'700'}>pending parcels</Typography>
        <Stack direction='row' gap='50px' justifyContent='flex-start' mb='20px'>
          {picked.length ? picked.map((parcel, i) => <ParcelCard key={i} parcel={parcel} type='sender'></ParcelCard>) : <Typography variant='h4' textTransform={'capitalize'} color='red' fontWeight={'400'}>no picked up pending parcels yet</Typography>}
        </Stack>
      </Box>

      <Box border={'10px solid  #009900'} borderRadius='20px' padding='20px' mb='30px' >
        <Typography mb={'20px'} variant='h3' textTransform={'capitalize'} fontWeight={'700'}>delivered parcels</Typography>
        <Stack direction='row' gap='50px' justifyContent='flex-start' mb='20px'>
          {delivered.length ? delivered.map((parcel, i) => <ParcelCard key={i} parcel={parcel} type='sender'></ParcelCard>) : <Typography variant='h4' textTransform={'capitalize'} color='red' fontWeight={'400'}>no delivered parcels yet</Typography>}
        </Stack>
      </Box>

      <Button variant='contained' size='large' sx={{ fontSize: '20px', fontWeight: '700' }} onClick={() => navigate('/add-new-parcel')}>Add New Parcel</Button>

    </Box>
  )
}

export default SenderProfilePage;