import React, {Component} from 'react'
import {Row, Col, Container} from 'reactstrap'
import Movie from '../components/Movie'
import MyNavbar from '../components/Navbar'
import axios from 'axios'
import '../css/Onboarding.css'

export default class Onboarding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosen: [],
            top: []
        }
    }

    componentDidMount() {
        let that = this;
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
        let chosen = this.chosen;
        let top = this.top;
        chosen.push(movie);
        this.setState({chosen: chosen})
    }

    render() {

        let navbarItems = []

        return (
            <Container>
                <MyNavbar items={navbarItems} />
                <Row className="onboard-row">
                    {this.state.top.map((movie, i) => {
                        return (
                            <div className="movie">
                                <div className="movie-cover" onClick={() => this.choose(movie)}>
                                </div>
                                <Movie style={{position: "absolute"}} key={i} movie={movie} />
                            </div>
                        )
                    })}
                </Row>
            </Container>
        )
    }
}