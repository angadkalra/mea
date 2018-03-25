import React, {Component} from 'react'
import axios from 'axios'
import Brand from '../media/brand.png'
import {Nav, Navbar, NavItem, NavLink, NavbarBrand, Button} from 'reactstrap'
import * as Scroll from 'react-scroll'
import {Link} from 'react-router-dom'
import '../css/Navbar.css'
let ScrollLink = Scroll.Link

export default class MyNavbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        axios.get('/api/logout/')
        .then((response) => {
            this.props.history.push('/login')
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    scrollLink = (item) => {
        return (
            <ScrollLink to={item.to} smooth={true} activeClass="activeNavLink"> {item.name} </ScrollLink>
        )
    }

    normalLink = (item) => {
        return (
            <Link style={{color: "white", textDecoration: "none"}} to={item.to}> {item.name} </Link>
        )
    }
    
    render() {
        return (
            <Navbar color="faded" light fixed="top" className="navbar" style={{paddingLeft: "10%"}}>
                <NavbarBrand href="/"><img style={{height: "40px"}} src={Brand}/></NavbarBrand>
                <Nav className="ml-auto">
                    {this.props.items.map((item) => {
                        if (item.logout) {
                            return (
                                <NavItem className="navLink">
                                    <NavLink style={{color: "white", textDecoration: "none"}} onClick={this.logout}>
                                        Logout
                                    </NavLink>
                                </NavItem>
                            )
                        } else {
                            return (
                                <NavItem className="navLink">
                                    <NavLink>
                                        {item.scrollLink ? this.scrollLink(item) : this.normalLink(item)}
                                    </NavLink>
                                </NavItem>
                            )
                        }
                    })}
                </Nav>
            </Navbar>
        )
    }

}