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
        let authToken = localStorage.getItem('authToken');
        if (authToken) {
            axios.defaults.headers.common['Authorization'] = authToken;
        }
        axios.get('/api/match/')
        .then((response) => {
            console.log(response);
            that.setState({top: response.data.curators});
        })
        .catch((error) => {
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

        return (
            <Container style={{textAlign: "center"}}>
                <MyNavbar items={navbarItems} />
                <Row className="onboard-row">
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
                </Row>
                <Button style={{marginTop: "20px"}} color="primary" onClick={this.submit}>Continue</Button>
            </Container>
        )
    }
}