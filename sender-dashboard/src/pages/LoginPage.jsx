import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Image1 from './../assets/saloodo5.png';
import React, { useState, useEffect } from 'react';
import { login as senderLogin } from '../store/actions/senderAuthActions';
import { login as bikerLogin } from '../store/actions/bikerAuthActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
const LoginPage = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = useSelector(state => type == 'sender' ? state.senderAuthReducer.sender_token : state.bikerAuthReducer.biker_token);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type == 'sender') { dispatch(senderLogin({ email, password })); }
    else { dispatch(bikerLogin({ email, password })); }
  };
  useEffect(() => {
    console.log(token);
    if (token) {
      if (type == 'sender') { navigate('/sender-profile'); }
      else { navigate('/biker-profile'); }
    }
  }, [token]);

  return (
    <Stack sx={{ flexDirection: { lg: 'row', xs: 'column' }, justifyContent: 'space-around', gap: '20px', mt: '200px', mb: '100px' }}>
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>
        <Box textAlign={'left'}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}><CheckIcon color='success' /> <span>Over 50.000 shippers globally</span></Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}><CheckIcon color='success' /> <span>No monthly fees</span></Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}><CheckIcon color='success' /> <span>Fast payment within 14 days</span></Box>
        </Box>

        <img src={Image1} alt='' />
        <Typography variant='h4' fontSize={'24px'}>Get transport orders & increase sales with your Saloodo account</Typography>
      </Stack>


      <Stack component='form' onSubmit={handleSubmit} gap={'20px'} direction={'column'} sx={{ justifyContent: 'space-between', alignItems: 'center', width: { lg: '50%', xs: '100%' } }} >
        <Box width={'400px'}>
          <TextField fullWidth name='email' onChange={(evt) => setEmail(evt.target.value)} label='Email' variant='outlined' type='email' />
        </Box>
        <Box width={'400px'}>
          <TextField fullWidth name='password' onChange={(evt) => setPassword(evt.target.value)} label='Password' variant='outlined' type='password' />
        </Box>

        <Button type='submit' variant='contained' size='large' sx={{ fontSize: '20px', fontWeight: '700' }}>Submit</Button>


      </Stack>


    </Stack>
  )
}

export default LoginPage;