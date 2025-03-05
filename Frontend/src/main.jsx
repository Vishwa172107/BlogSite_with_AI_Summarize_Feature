import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './header.jsx';
import { About } from './About.jsx';
import { CreateBlog } from './CreateBlog.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<App />} />
        <Route path='/about' element={<About />} />
        <Route path='/create-blog' element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
