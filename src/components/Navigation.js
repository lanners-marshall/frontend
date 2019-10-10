import React, { useState } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  NavbarToggler
} from 'reactstrap';

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar color='light' light expand='md'>
        <NavbarBrand>Note App</NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setOpen(!open);
          }}
        />
        <Collapse isOpen={open} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={RRNavLink} exact to='/' activeClassName='active'>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={RRNavLink}
                exact
                to='/registration'
                activeClassName='active'
              >
                registration
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
