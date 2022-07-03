import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import 'antd/dist/antd.min.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import PostDetail from './components/Home/Posts/PostDetail/PostDetail';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
      <Route path= '/register' element={<Register />} />
      <Route path= '/login' element={<Login />} />
      <Route path= '/profile' element={<Profile />} />
      <Route path= '/home' element={<Home />} />
      <Route path= '/posts/id/_id' element={<PostDetail />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
