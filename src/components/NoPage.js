import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NoPage = ({ loggedIn, loggedOut }) => {
  console.log(loggedIn, loggedOut);
  return (
    <div>
      <h1>404</h1>
      {loggedIn && <Link to='/notes'>Notes</Link>}
      {loggedOut && <Link to='/'>Home</Link>}
    </div>
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
