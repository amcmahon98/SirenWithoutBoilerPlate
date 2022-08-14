import React from "react";
import { Navbar, Nav} from 'react-bootstrap';
import { NavLink} from 'react-router-dom';
import "../Styling/Navigation.css";
import logo from "../images/sirenlogo.png";

const Navigation = () => {
  return (
        
    <Navbar fill collapseOnSelect expand="lg" >
        <Nav.Link className="nav-link-text" as={NavLink} to="/"><img className="logo" src={logo} alt=""/></Nav.Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav variant="tabs" className="tab-color" defaultActiveKey="/" fill style={{width: "100%"}}>
            <Nav.Item>
                <Nav.Link className="nav-link-text" as={NavLink} to="/schedule">Schedule</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className="nav-link-text" as={NavLink} to="/analytics">Analytics</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className="nav-link-text" as={NavLink} to="/maintenance">Maintenance</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link className="nav-link-text" as={NavLink} to="/account">Account</Nav.Link>
            </Nav.Item>
            </Nav>
        </Navbar.Collapse>
        
    </Navbar>
  )
}

export default Navigation;