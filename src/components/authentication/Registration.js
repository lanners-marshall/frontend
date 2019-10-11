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
  Row
} from 'reactstrap';
import classnames from 'classnames';
import '../custom.css';
import Footer from '../Footer';

const Registration = props => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <>
      <Navigation />
      <br />
      <Container>
        <h1>Registration</h1>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              style={{ '&:hover': { cursor: 'pointer' } }}
              onClick={() => {
                setActiveTab('1');
              }}
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
            >
              Log In
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
            <SignUp history={props.history} />
          </TabPane>
          <TabPane tabId='2'>
            <LogIn history={props.history} />
          </TabPane>
        </TabContent>
      </Container>
      <Footer />
    </>
  );
};

export default Registration;
