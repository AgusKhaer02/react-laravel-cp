import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Nav, Navbar as BSNavbar, NavbarBrand,NavbarCollapse,NavLink,NavbarToggle } from 'react-bootstrap';

class Navbar extends React.Component {
    constructor(){
        super();
        this.state = {name : "Lauwba Academy"};
        this.menu = [
            {url : "/", title : "Home"},
            {url : "/about", title : "About"},
            {url : "/contact", title : "Contact"},
        ];
    }

    render() {
        return (
            <BSNavbar bg="primary" expand="lg">
                <Container>
                    <NavbarBrand href="#home">{this.state.name}</NavbarBrand>
                    <NavbarToggle aria-controls="basic-navbar-nav" />
                    <NavbarCollapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {
                                this.menu.map((value, index) => (
                                    <NavLink key={index} href={value.url}>{value.title}</NavLink>
                                ))
                            }
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </BSNavbar>
        );
    }
}


export default Navbar;