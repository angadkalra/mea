import React, {Component} from 'react'
import axios from 'axios'
import MyNavbar from '../components/Navbar'
import Movie from '../components/Movie'
import {Container, Row, Col} from 'reactstrap'
import profImg from '../media/profile.png'
import ScrollArea from 'react-scrollbar'
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
            username: "",
            bio: "",
            movies: []
        }
    }

    componentDidMount() {
        axios.get('/api/profile/')
        .then((response) => {
            console.log(response);
            let data = response.data;
            this.setState({username: data.username, bio: data.bio, movies: data.movies});
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {

        let cover = <div style={{objectFit: "cover", top: "0", bottom: "0", height: "10px", width: "10px", backgroundColor: "black"}}> </div>

        return (
            <Container>
                <MyNavbar history={this.props.history} items={navbarItems} />
                
                <div className="left">
                    <Row>
                        <Col className="my-profile">
                            <p>{this.state.username}</p>
                            <img src={profImg}/>
                            <div className="bio">
                                <p>{this.state.bio}</p>
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
                        {this.state.movies.map((movie) => {
                            return (
                                <Movie style={{marginTop: "10px", cursor: "pointer"}} movie={movie} history={this.props.history}/>
                            )
                        })}
                    </Row>  

                    <h4>Recommended</h4>
                    <Row className="profile-row">
                        {this.state.movies.map((movie) => {
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