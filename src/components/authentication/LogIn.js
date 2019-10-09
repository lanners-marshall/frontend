import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authenticationActions';

const LogIn = ({ loading, loginUser, history, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = e => {
    e.preventDefault();
    const user = { username, password };
    setUsername('');
    setPassword('');
    loginUser(user, history);
  };

  return (
    <div>
      Login
      <form onSubmit={e => login(e)}>
        <input
          placeholder='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

LogIn.propType = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  history: PropTypes.object,
  loginUser: PropTypes.func
};

export default connect(
  null,
  { loginUser }
)(LogIn);
