import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

class NavigationBar extends React.Component
{
    constructor(props){
        super(props);
        this.state = {};
    }

    render=()=>{
        return (
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">School Management Portal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Product Management" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">View Products</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Add Product</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
                </Navbar>
        )
    }
}
export default NavigationBar;