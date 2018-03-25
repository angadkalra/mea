import React, {Component} from 'react'
import {Row, Col, Container, Button} from 'reactstrap'
import ProfileSmall from '../components/ProfileSmall'
import MyNavbar from '../components/Navbar'
import axios from 'axios'
import '../css/ChooseCurators.css'
import FaCheck from 'react-icons/lib/fa/check'

export default class ChooseCurators extends Component {
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
        axios.get('/api/match/')
        .then((response) => {
            console.log(response);
            that.setState({top: response.data.profileIDs});
        })
        .catch((error) => {
            console.log("Couldnt get top");
        })
    }

    choose(profileID) {
        console.log(profileID);
        let chosen = this.state.chosen;
        let top = this.state.top;
        chosen.push(profileID);
        let index = top.indexOf(profileID);
        top.splice(index,1);
        this.setState({chosen: chosen, top: top})
    }

    submit = (event) => {
        let that = this;
        axios.post('/api/profile/update/', {
            addMovies: that.state.chosen
        })
        .then((response) => {
            this.props.history.push('/profile');
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
                                    <FaCheck id="check"/>
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