import React, {Component} from 'react'
import '../css/Landing.css'
import Brand from '../media/brand.png'
import Hero from '../media/hero6.jpg'
import About from '../media/about.png'
import Movies from '../media/Movies.png'
import Discover from '../media/Discover.png'
import Curator from '../media/Curator.png'
import Link from 'react-router-redux-dom-link'
import * as Scroll from 'react-scroll'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Row,
    Col,
    InputGroup, 
    InputGroupAddon, 
    Button, 
    Input,
    Form,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption } from 'reactstrap';

let ScrollLink = Scroll.Link
      
const items = [
    {
        src: Movies,
        altText: 'Signup',
        caption: ''
    },
    {
        src: Discover,
        altText: 'Discover',
        caption: ''
    },
    {
        src: Curator,
        altText: 'Curate',
        caption: ''
    }
];
      
export default class Landing extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
            email: "",
            activeIndex: 0
        };

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }
      
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type ===
            'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault()
        console.log("Receiving email")
        console.log(this.state.email)
        this.props.onSubmit(this.state.email)
    }

    render() {
        const { activeIndex } = this.state;

        const slides = items.map((item) => {
            return (
              <CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={item.src}
                style={{overflowY: "hidden"}}
              >
                <img id="carousel_item" src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
              </CarouselItem>
            );
        });

        return (
            <Container fluid={true}>

            <Navbar color="faded" light fixed="top" className="navbar" style={{paddingLeft: "10%"}}>
                <NavbarBrand href="/"><img style={{height: "40px"}} src={Brand}/></NavbarBrand>
                <Nav className="ml-auto">
                    <NavItem className="navLink">
                        <NavLink>
                            <ScrollLink to="about" smooth={true} activeClass="activeNavLink"> About </ScrollLink>
                        </NavLink>
                    </NavItem>
                    <NavItem className="navLink">
                        <NavLink>
                        <ScrollLink to="example" smooth={true} activeClass="activeNavLink"> Example </ScrollLink>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>

            <Row className="landingRow">
                <Col style={{paddingLeft: "0px", paddingRight: "0px"}}>
                    <div id="hero">
                        <img src={Hero} style={{height: "100%", width: "100%"}} />
                        <div id="hero-detail">
                            <h1>Mea, welcome to your curated content.</h1>
                            <h4>all natural, organic, human content recommendation.</h4>
                            <Form onSubmit={this.onSubmit}>
                                <InputGroup style={{width: "60%", margin: "0 auto", marginTop: "20px"}}>
                                    <Input name="email" type="email" placeholder="email" onChange={this.handleInputChange} />
                                    <InputGroupAddon>
                                    <Button type="submit" color="primary" style={{borderTopLeftRadius: "0px", borderBottomLeftRadius: 
                                    "0px"}}>Keep me updated</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Form>
                            <p style={{marginTop: "20px", }}>Movies | TV | Books | Podcasts</p>
                            <p>Coming Soon</p>         
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="landingRow">
                <Col style={{paddingLeft: "0px", paddingRight: "0px"}}>
                    <div id="about">
                        <div className="left">
                            <div className="centerHor centerVert" style={{top: "20%", width: "60%"}}>
                                <h2>What do we do?</h2>
                                <h4 className="paragraph">Human recommendations</h4>
                                <p>Follow friends and curators with similar taste for great new content recommendations.</p>
                                <h4 className="paragraph">Smart</h4>
                                <p>We'll match you up with curators who share your taste with our smart, machine learning based matching algorithms</p>
                                <h4 className="paragraph">All in one place</h4>
                                <p>All the books, podcasts, movies, and TV shows you've watched and been recommended, available at your convenience</p>
                            </div>
                        </div>
                        <div className="right">
                            <div className="centerHor centerVert" style={{top:"35%", width: "75%"}}>
                                <img style={{height: "100%", width: "100%"}} src={About}/>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <hr style={{size: "5px", width: "80%"}}/>

            <Row className="landingRow">
                <Col style={{paddingLeft: "20vw", paddingRight: "20vw", paddingTop: "50px"}} id="example">
                    <Carousel
                        activeIndex={activeIndex}
                        next={this.next}
                        previous={this.previous}
                    >
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                    </Carousel>
                </Col>
            </Row>

            <Row className="footer">
                <Col>
                    <div style={{paddingRight: "100px", paddingLeft: "100px", paddingTop: "40px", fontSize: "0.8em"}}>
                        <p>Info</p>
                        <p>This project will culminate in a proof of concept testing the idea that human recommendations are preferred over machine learning recommendations. To show your support sign up with your email, so we can keep you updated</p>
                    </div>
                </Col>
            </Row>

            </Container>
        )
    }
}