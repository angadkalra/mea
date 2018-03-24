import React, {Component} from 'react'
import {Row, Col, Container} from 'reactstrap'
import Movie from '../components/Movie'
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
        })
        .catch((error) => {

        })
        
    }

    choose(movie) {
        console.log(movie);
        // let chosen = this.chosen;
        // let top = this.top;
        // chosen.push(movie);
        // top.
        // this.setState(chosen)
    }

    render() {
        return (
            <Container>
                <Row className="onboard-row">
                    {this.state.top.map((movie) => {
                        <div className="movie-choose" onClick={this.choose(movie)}>
                            <Movie movie={movie} />
                        </div>
                    })}
                </Row>
            </Container>
        )
    }
}