import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import 'antd/dist/antd.min.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path= '/register' element={<Register/>}/>
      <Route path= '/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;