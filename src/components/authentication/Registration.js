import React, { useState } from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Navigation from '../Navigation';

const Registration = props => {
  const [tab, setTab] = useState(1);
  const changeTab = (e, tab) => {
    e.preventDefault();
    setTab(tab);
  };

  return (
    <div>
      <Navigation />
      Registration
      <br />
      <button onClick={e => changeTab(e, 1)}>SignUp</button>
      <button onClick={e => changeTab(e, 2)}>Login</button>
      {tab === 1 && <SignUp history={props.history} />}
      {tab === 2 && <LogIn />}
    </div>
  );
};

export default Registration;
