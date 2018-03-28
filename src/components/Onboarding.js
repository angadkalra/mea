import React, {Component} from 'react'
import {Row, Col, Container, Button} from 'reactstrap'
import Movie from '../components/Movie'
import MyNavbar from '../components/Navbar'
import axios from 'axios'
import '../css/Onboarding.css'
import FaCheck from 'react-icons/lib/fa/check'

export default class Onboarding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosen: [],
            top: []
        }
        this.state.chose
    }

    componentDidMount() {
        let that = this;
        let authToken = localStorage.getItem('authToken');
        if (authToken) {
            axios.defaults.headers.common['Authorization'] = authToken;
        }
        axios.post('/api/movies/', {
            top: 50
        })
        .then((response) => {
            console.log(response);
            that.setState({top: response.data});
        })
        .catch((error) => {
            console.log("Couldnt get top");
        })
    }

    choose(movie) {
        console.log(movie);
        let chosen = this.state.chosen;
        let top = this.state.top;
        chosen.push(movie);
        let index = top.indexOf(movie);
        top.splice(index,1);
        this.setState({chosen: chosen, top: top})
    }

    submit = (event) => {
        let that = this;
        axios.post('/api/profile/update/', {
            addMovies: that.state.chosen
        })
        .then((response) => {
            this.props.history.push('/curators');
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {

        let navbarItems = []

        return (
            <Container style={{textAlign: "center"}}>
                <MyNavbar items={navbarItems} />
                <Row className="onboard-row">
                    {this.state.top.map((movie, i) => {
                        return (
                            <div className="movie">
                                <div className="movie-cover" onClick={() => this.choose(movie)}>
                                    <FaCheck id="checkOnb"/>
                                </div>
                                <Movie style={{position: "absolute"}} key={i} movie={movie} />
                            </div>
                        )
                    })}
                </Row>
                <Button style={{marginTop: "20px"}} color="primary" onClick={this.submit}>Continue</Button>
            </Container>
        )
    }
}