import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authenticationActions';

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = e => {
    e.preventDefault();
    alert('clicked');
  };

  return (
    <div>
      Login
      <form onSubmit={e => loginUser(e)}>
        <input
          placeholder='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <input
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

export default connect(
  null,
  { loginUser }
)(LogIn);

/*

SignUp.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  signup: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  signup: (user, history) => dispatch(signup(user, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);SignUp.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  signup: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  signup: (user, history) => dispatch(signup(user, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);


*/
