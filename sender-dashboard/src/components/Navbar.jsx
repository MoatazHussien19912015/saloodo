import React from 'react';
import { Button, Stack, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutSender } from '../store/actions/senderAuthActions';
import { logout as logoutBiker } from '../store/actions/bikerAuthActions';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sender_token = useSelector(state => state.senderAuthReducer.sender_token);
  const biker_token = useSelector(state => state.bikerAuthReducer.biker_token);
  const [anchorElBiker, setAnchorElBiker] = React.useState(null);
  const bikerOpen = Boolean(anchorElBiker);
  const [anchorElSender, setAnchorElSender] = React.useState(null);
  const senderOpen = Boolean(anchorElSender);
  const handleClick = (event) => {
    if (event.currentTarget.id == 'biker-button') setAnchorElBiker(event.currentTarget);
    else { setAnchorElSender(event.currentTarget) }
  };
  const handleClose = () => {
    setAnchorElBiker(null);
    setAnchorElSender(null);
  };
  return (
    <Stack direction='row' sx={{ marginTop: '20px', px: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link to='/'>
        <img src={'https://www.saloodo.com/wp-content/uploads/2021/05/logo-saloodo-dark.svg'} alt='logo' style={{ width: '170px', height: '70px', margin: '0 20px' }} />
      </Link>
      <Stack direction='row' gap='50px' fontSize='24px' alignItems={'flex-end'}>

        {biker_token && <Button
          id="biker-button"
          aria-haspopup="true"
          onClick={handleClick}
        >
          biker
        </Button>}
        <Menu
          id="basic-menu"
          anchorEl={anchorElBiker}
          open={bikerOpen}
          onClose={handleClose}
        >
          {!biker_token ? <><MenuItem onClick={handleClose}><Link to='/biker-register'><Button variant='text' sx={{ paddingTop: '10px' }}>register as biker</Button></Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to='/biker-login'><Button variant='text' sx={{ paddingTop: '10px' }}>login as biker</Button></Link></MenuItem></> :
            <><MenuItem onClick={handleClose}><Link to='/biker-profile'><Button variant='text' sx={{ paddingTop: '10px' }}>Profile</Button></Link></MenuItem>
              <MenuItem onClick={handleClose}><Button onClick={() => { dispatch(logoutBiker()); navigate('/'); }} variant='text' sx={{ paddingTop: '10px' }}>Logout</Button></MenuItem></>}
        </Menu>

        {sender_token && <Button
          id="sender-button"
          aria-haspopup="true"
          onClick={handleClick}
        >
          sender
        </Button>}
        <Menu
          id="basic-menu"
          anchorEl={anchorElSender}
          open={senderOpen}
          onClose={handleClose}
        >
          {!sender_token ? <><MenuItem onClick={handleClose}><Link to='/sender-register'><Button variant='text' sx={{ paddingTop: '10px' }}>register as sender</Button></Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to='/sender-login'><Button variant='text' sx={{ paddingTop: '10px' }}>login as sender</Button></Link></MenuItem></> :
            <><MenuItem onClick={handleClose}><Link to='/sender-profile'><Button variant='text' sx={{ paddingTop: '10px' }}>Profile</Button></Link></MenuItem>
              <MenuItem onClick={handleClose}><Button onClick={() => { dispatch(logoutSender()); navigate('/'); }} variant='text' sx={{ paddingTop: '10px' }}>Logout</Button></MenuItem></>}
        </Menu>


      </Stack>

    </Stack>
  )
}

export default Navbar;