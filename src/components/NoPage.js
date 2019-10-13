import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';

const NoPage = ({ loggedIn, loggedOut }) => {
  console.log(loggedIn, loggedOut);
  return (
    <>
      {loggedIn && <Redirect to='/notes' />}
      {loggedOut && <Redirect to='/' />}
    </>
  );
};

NoPage.propTypes = {
  loggedIn: PropTypes.bool,
  loggedOut: PropTypes.bool
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  loggedOut: state.auth.loggedOut
});

export default connect(
  mapStateToProps,
  null
)(NoPage);
