import React from 'react';
import { Typography, Card, CardHeader, CardMedia, CardContent, Button } from '@mui/material';
import ParcelImage from './../assets/parcel.png';
import { Link } from 'react-router-dom';
const ParcelCard = ({ parcel, type }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={parcel.name}
        subheader={parcel.status} action={parcel.status == 'ready' && type != 'sender' ?
          <Link to={`/parcel-pick/${parcel._id}`}><Button variant='contained' size='small'>pick</Button></Link> : parcel.status == 'picked' && type != 'sender' ?
            <Link to={`/parcel-deliver/${parcel._id}`}><Button variant='contained' size='small'>deliver</Button></Link> : null} />


      <CardMedia
        component='img'
        height='194'
        image={ParcelImage}
        alt='pair of shoes'
      />
      <CardContent>
        <Typography variant='body1' color=''>
          pick up address: {parcel.pick_up_address}
        </Typography>
        <Typography variant='body1' color=''>
          drop off address: {parcel.drop_off_address}
        </Typography>
        <Typography variant='body1' color=''>
          pick up date: {parcel.pick_up_date || 'not specified yet'}
        </Typography>
        <Typography variant='body1' color=''>
          delivery date: {parcel.delivery_date || 'not specified yet'}
        </Typography>
        <Typography variant='body1' color=''>
          biker name: {parcel.biker_name || 'not specified yet'}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ParcelCard;