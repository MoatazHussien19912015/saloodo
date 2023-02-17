import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';

import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import BikerProfilePage from './pages/BikerProfilePage';
import SenderProfilePage from './pages/SenderProfilePage';
import AddNewParcel from './pages/AddNewParcel';
import ParcelsPage from './pages/ParcelsPage';
import PickParcelPage from './pages/PickParcelPage';
import DeliverParcelPage from './pages/DeliverParcelPage';

function App() {
  return (
    <Box  m='20px' /* sx={{width: {xl: '1488px'}}} */>
      <Navbar />
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='/biker-register' element={<RegisterPage type={'biker'} />} />
        <Route path='/sender-register' element={<RegisterPage type={'sender'} />} />
        <Route path='/biker-login' element={<LoginPage type={'biker'} />} />
        <Route path='/sender-login' element={<LoginPage type={'sender'} />} />
        <Route path='/biker-profile' element={<BikerProfilePage />} />
        <Route path='/sender-profile' element={<SenderProfilePage />} />
        <Route path='/add-new-parcel' element={<AddNewParcel />} />
        <Route path='/parcels' element={<ParcelsPage />} />
        <Route path='/parcel-pick/:id' element={<PickParcelPage />} />
        <Route path='/parcel-deliver/:id' element={<DeliverParcelPage />} />
       {/*  <Route path='/exercise/:id' element={<ExerciseDetails />} /> */}
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
