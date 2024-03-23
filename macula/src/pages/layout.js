
import React from 'react';
import Navbar from '../components/Navbar'; // Import your existing navbar component

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
