import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Update from './components/Update';

function App() {
  return (
    <div >
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/Profile' element={<Profile/>}/>
    <Route path='/Update' element={<Update/>}/>
    
   </Routes>
   </BrowserRouter>
    
    </div>
  );
}

export default App;
