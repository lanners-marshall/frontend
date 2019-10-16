import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authenticationActions';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

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
    <div style={{ marginTop: '15px' }}>
      {error && <Alert color='danger'>{error}</Alert>}
      <Form onSubmit={login}>
        <FormGroup>
          <Label for='username'>Username</Label>
          <Input
            type='text'
            name='username'
            id='username'
            placeholder='username'
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for='password'>Password</Label>
          <Input
            type='password'
            name='password'
            id='examplePassword'
            placeholder='password placeholder'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
};

LogIn.propType = {
  error: PropTypes.string,
  history: PropTypes.object,
  loginUser: PropTypes.func
};

const mapStateToProps = state => ({
  error: state.auth.loginError
});

export default connect(
  mapStateToProps,
  { loginUser }
)(LogIn);
