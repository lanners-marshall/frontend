import React, { useState } from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Navigation from '../Navigation';
import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Spinner
} from 'reactstrap';
import classnames from 'classnames';
import Footer from '../Footer';
import { connect } from 'react-redux';

const Registration = ({ history, loading }) => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <>
      <Navigation />
      <br />
      <Container style={{ maxWidth: '800px' }}>
        <h1>Registration</h1>
        {loading ? (
          <Spinner
            style={{ width: '3rem', height: '3rem', marginTop: '30px' }}
          />
        ) : (
          <>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => {
                    setActiveTab('1');
                  }}
                  href='#'
                  style={{ color: 'black' }}
                >
                  Sign Up
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => {
                    setActiveTab('2');
                  }}
                  href='#'
                  style={{ color: 'black' }}
                >
                  Log In
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                <SignUp history={history} />
              </TabPane>
              <TabPane tabId='2'>
                <LogIn history={history} />
              </TabPane>
            </TabContent>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading
});

export default connect(
  mapStateToProps,
  null
)(Registration);
