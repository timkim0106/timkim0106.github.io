import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import LeagueOfLegendsBlog from './pages/LeagueOfLegendsBlog';
import BlogPostViewer from './pages/BlogPostViewer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header 
          githubUrl="https://github.com/timkim0106" 
          resumeUrl="" 
        />
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/league-of-legends" element={<LeagueOfLegendsBlog />} />
            <Route path="/blog/post/:slug" element={<BlogPostViewer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
