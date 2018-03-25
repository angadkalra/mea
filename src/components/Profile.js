import React, {Component} from 'react'
import axios from 'axios'
import MyNavbar from '../components/Navbar'
import Movie from '../components/Movie'
import {Container, Row, Col} from 'reactstrap'
import profImg from '../media/profile.png'
import ScrollArea from 'react-scrollbar'
import ProfileSmall from '../components/ProfileSmall'
import '../css/Profile.css'

const navbarItems = [
    {
        logout: true
    }
]

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                movies: [],
                username: "",
                bio: ""
            }
        }
    }

    componentDidMount() {
        let url = '/api/profile/';
        if (this.props.match.params.id) {
            url += this.props.match.params.id;
        }
        axios.get(url)
        .then((response) => {
            console.log(response);
            let data = response.data;
            this.setState({user: data});
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {

        let cover = <div style={{objectFit: "cover", top: "0", bottom: "0", height: "10px", width: "10px", backgroundColor: "black"}}> </div>
        let user = this.state.user;

        return (
            <Container>
                <MyNavbar history={this.props.history} items={navbarItems} />
                
                <div className="left">
                    <Row>
                        <Col className="my-profile">
                            <p>{user.username}</p>
                            <ProfileSmall style={{cursor: "pointer", width: "80%"}} user={user} />
                            <div className="bio">
                                <p>{user.bio}</p>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h4>Playlists</h4>
                            <p>something</p>
                        </Col>
                    </Row>
                </div>
                
                <div className="right">
                    <h4> Movies </h4>

                    <Row className="profile-row">
                        {user.movies.map((movie) => {
                            return (
                                <Movie style={{marginTop: "10px", cursor: "pointer"}} movie={movie} history={this.props.history}/>
                            )
                        })}
                    </Row>  

                    <h4>Recommended</h4>
                    <Row className="profile-row">
                        {user.movies.map((movie) => {
                            return (
                                <div>
                                    <Movie style={{marginTop: "10px", cursor: "pointer"}} movie={movie} cover={cover} history={this.props.history}/>
                                </div>
                            )
                        })}
                    </Row>
                </div>
            </Container>
        )
    }
}