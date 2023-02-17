import { Box, Button, Stack, TextField, Typography, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { register as senderRegister } from '../store/actions/senderAuthActions';
import { register as bikerRegister } from '../store/actions/bikerAuthActions';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Image1 from './../assets/saloodo5.png';
import CheckIcon from '@mui/icons-material/Check';
const RegisterPage = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const token = useSelector(state => type == 'sender' ? state.senderAuthReducer.sender_token : state.bikerAuthReducer.biker_token);
  const error = useSelector(state => type == 'sender' ? state.senderAuthReducer.error : state.bikerAuthReducer.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type == 'sender') { dispatch(senderRegister({ email, username, password })); }
    else { dispatch(bikerRegister({ email, username, password })); }
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
          <TextField fullWidth name='email' value={email} onChange={(evt) => setEmail(evt.target.value)} label='Email' variant='outlined' type='email' />
        </Box>
        <Box width={'400px'}>
          <TextField fullWidth name='username' value={username} onChange={(evt) => setUsername(evt.target.value)} label='username' variant='outlined' type='text' />
        </Box>
        <Box width={'400px'}>
          <TextField fullWidth name='password' value={password} onChange={(evt) => setPassword(evt.target.value)} label='Password' variant='outlined' type='password' />
        </Box>

        <Button type='submit' variant='contained' size='large' sx={{ fontSize: '20px', fontWeight: '700' }}>Submit</Button>
        <Link to={type == 'biker' ? '/biker-login' : '/sender-login'}>already a member?</Link>
        {error && <Alert severity="error">{error?.message}!</Alert>}
      </Stack>


    </Stack>
  )
}

export default RegisterPage;