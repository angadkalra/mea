import React, {Component} from 'react'
import axios from 'axios'
import Brand from '../media/brand.png'
import {Nav, Navbar, NavItem, NavLink, NavbarBrand, Button, Input, Form} from 'reactstrap'
import * as Scroll from 'react-scroll'
import {Link} from 'react-router-dom'
import '../css/Navbar.css'
let ScrollLink = Scroll.Link

export default class MyNavbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            search: "",
            results: []
        }
    }

    logout() {
        localStorage.setItem('authToken', "")
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

    gotoMovie = () => {
        let url = '/movie/';
        url += this.state.results[0].imdbId;
        this.props.history.push(url);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        let that = this;
        axios.post('/api/movies/search/', {
            query: value
        })
        .then((response) => {
            that.setState({results: response.data});
        })
        .catch((error) => {
            console.log(error);
        })
      }
    
    render() {

        let search;
        if (this.props.search) {
            search = 
                <div style={{marginLeft: "20px"}}>
                <Form onSubmit={this.gotoMovie}>
                    <Input list="searches" placeholder="Search..." name="search" onChange={this.handleInputChange} />
                    <datalist id="searches">
                        {this.state.results.map((movie) => {
                            return (
                                <option value={movie.title}/>
                            )
                        })}
                    </datalist>
                </Form>
                </div>
        }

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
                    {search}
                </Nav>
            </Navbar>
        )
    }

}