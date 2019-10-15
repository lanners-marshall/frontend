import React, { useEffect } from 'react';
import Registration from './components/authentication/Registration';
import Landing from './components/Landing';
import NoPage from './components/NoPage';
import Notes from './components/notes/Notes';
import Note from './components/notes/Note';
import CreateNote from './components/notes/CreateNote';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkToken } from './store/actions/authenticationActions';
import PropTypes from 'prop-types';
import './custom.css';

const App = ({ loggedIn, loggedOut, checkToken }) => {
  useEffect(() => {
    checkToken();
  }, [loggedIn]);
  return (
    <>
      {loggedIn && (
        <Switch>
          <Route exact path='/notes' component={Notes} />
          <Route path='/notes/:id' component={Note} />
          <Route path='/create' component={CreateNote} />
          <Route component={NoPage} />
        </Switch>
      )}
      {loggedOut && (
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/registration' component={Registration} />
          <Route component={NoPage} />}
        </Switch>
      )}
    </>
  );
};

App.propTypes = {
  loggedIn: PropTypes.bool,
  checkToken: PropTypes.func,
  loading: PropTypes.bool,
  loggedOut: PropTypes.bool
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  loading: state.auth.loading,
  loggedOut: state.auth.loggedOut
});

export default connect(
  mapStateToProps,
  { checkToken }
)(App);
