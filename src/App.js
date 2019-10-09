import React, { useEffect } from 'react';
import Registration from './components/authentication/Registration';
import Landing from './components/Landing';
import NoPage from './components/NoPage';
import Notes from './components/notes/Notes';
import Navigation from './components/Navigation';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkToken } from './store/actions/authenticationActions';
import PropTypes from 'prop-types';

const App = ({ loggedIn, checkToken }) => {
  useEffect(() => {
    checkToken();
  }, [loggedIn]);

  return (
    <>
      {loggedIn ? (
        <Switch>
          <Route path='/notes' component={Notes} />
          <Route component={NoPage} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/registration' component={Registration} />
          <Route component={NoPage} />
        </Switch>
      )}
    </>
  );
};

App.propTypes = {
  loggedIn: PropTypes.bool,
  checkToken: PropTypes.func
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

export default connect(
  mapStateToProps,
  { checkToken }
)(App);
