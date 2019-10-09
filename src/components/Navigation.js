import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <br />
      <Link to='/registration'>Registration</Link>
    </nav>
  );
};

export default Navigation;
