import React, { useState } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import HeroBannerImage4 from './../assets/saloodo4.jpg';
import {Link} from 'react-router-dom';
const HeroBanner = () => {

    const [image, setImage] = useState(HeroBannerImage4);
  return (
    <Stack p='20px' className='hero-banner-img' alignItems='center' justifyContent='center'>
       <Typography variant='h1' color='white'>We make logistics fast smart and reliable</Typography>
       <Typography mt='100px' variant='h3' color='white'> Saloodo Bike! connects senders and bikers on a digital freight platform </Typography>
       <Stack direction='row' gap='30px' mt='300px'>
        <Link to='/biker-register'><Button size='large'  sx={{backgroundColor: '#ffff00', color: 'black', fontWeight: '700', fontSize: '20px' }}>join as biker</Button></Link>
        <Link to='/sender-register'><Button size='large'  sx={{backgroundColor: '#ffff00', color: 'black', fontWeight: '700', fontSize: '20px' }}>join as sender</Button></Link>
        </Stack>
    </Stack>
  )
}

export default HeroBanner;