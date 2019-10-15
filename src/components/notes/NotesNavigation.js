import React, { useState } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler,
  Button
} from 'reactstrap';

const NotesNavigation = () => {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const user = localStorage.name;

  return (
    <Navbar color='light' light expand='md' className='navigation'>
      <NavbarBrand>Hi {user}</NavbarBrand>
      <NavbarToggler
        onClick={() => {
          setOpen(!open);
        }}
      />
      <Collapse isOpen={open} navbar>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink tag={RRNavLink} exact to='/notes' activeClassName='active'>
              notes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={RRNavLink}
              exact
              to='/create'
              activeClassName='active'
            >
              create note
            </NavLink>
          </NavItem>
          <NavItem>
            <Button onClick={logout}>Log Out</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NotesNavigation;
