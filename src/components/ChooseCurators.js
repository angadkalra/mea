import React, {Component} from 'react'
import {Row, Col, Container, Button, Jumbotron} from 'reactstrap'
import ProfileSmall from '../components/ProfileSmall'
import Movie from '../components/Movie'
import MyNavbar from '../components/Navbar'
import axios from 'axios'
import '../css/ChooseCurators.css'
import FaCheck from 'react-icons/lib/fa/check'
import FaSpinner from 'react-icons/lib/fa/spinner'

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
        let authToken = localStorage.getItem('authToken');
        if (authToken) {
            axios.defaults.headers.common['Authorization'] = authToken;
        }
        axios.get('/api/match/')
        .then((response) => {
            console.log(response);
            that.setState({top: response.data.curators});
            // that.forceUpdate();
        })
        .catch((error) => {
            console.log(error);
            console.log("Couldnt get top");
        })
    }

    choose(user) {
        console.log(user);
        let chosen = this.state.chosen;
        let top = this.state.top;
        chosen.push(user.id);
        let index = top.indexOf(user);
        top.splice(index,1);
        this.setState({chosen: chosen, top: top});
    }

    submit = (event) => {
        let that = this;
        axios.post('/api/profile/update/', {
            addFollowings: that.state.chosen
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
        let loading;
        if (this.state.top.length < 1) {
            loading = 
            <Jumbotron style={{marginTop: "40vh"}}>
                <h2>Your curators are being retrieved</h2>
                <FaSpinner style={{fontSize: "3em"}}/>
            </Jumbotron>
        }

        return (
            <Container style={{textAlign: "center"}}>
                <MyNavbar items={navbarItems} />
                {loading}
                <div className="contain" style={{paddingTop: "10vh", maxHeight: "80vh"}}>
                    {this.state.top.map((user) => {
                        return (
                            <Row className="onboard-row">
                                <div className="profile-cover" onClick={() => this.choose(user)}>
                                    <FaCheck id="check"/>
                                </div>
                                <Col md="3">
                                    <ProfileSmall user={user} clickable={false}/>
                                </Col>
                                <Col md="9" className="cueratorMovies">
                                    {user.movies.map((m) => {
                                        return (
                                            <Movie movie={m} style={{display: "inline-block"}}/>
                                        )
                                    })}
                                </Col>
                            </Row>
                        )
                    })}
                </div>
                {/* <Row className="onboard-row">
                    {this.state.top.map((user, i) => {
                        return (
                            <div className="profile">
                                <div className="profile-cover" onClick={() => this.choose(user)}>
                                    <FaCheck id="check"/>
                                </div>
                                <ProfileSmall key={i} user={user} clickable={false}/>
                            </div>
                        )
                    })}
                </Row> */}
                <Button style={{marginTop: "20px"}} color="primary" onClick={this.submit}>Continue</Button>
            </Container>
        )
    }
}