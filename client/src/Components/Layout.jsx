import React from 'react';
import Header from './Header'; // Header component
import Footer from './Footer'; // Footer component
import './Layout.css'; // Layout-specific styles

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <main className="layout-content">
        {children} {/* This renders the current route content */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
