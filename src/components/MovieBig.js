import React, {Component} from 'react'
import axios from 'axios'
import {Row, Col, Container} from 'reactstrap'
import '../css/MovieBig.css'
import MyNavbar from '../components/Navbar'

export default class MovieBig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            movie: {
                base: {
                    image: {
                        url: ""
                    },
                    title: "",
                    year: ""
                },
                ratings: {
                    rating: 0
                },
                metacriticScore: {
                    metaScore: 0
                },
                plot: {
                    outline: {
                        text: ""
                    }
                }
            }
        }
    }

    componentWillMount() {
        let that = this;
        let id = this.props.match.params.id;
        axios.post('/api/movies/', {
            movieId: id
        })
        .then((response) => {
            console.log(response);
            that.setState({movie: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        let movie = this.state.movie;
        let navItem = [
            {
                scrollLink: false,
                to: "/profile",
                name: "Profile"
            }
        ]

        return (
            <Container>
                <MyNavbar items={navItem}/>
                <Row style={{marginTop: "100px"}}>
                    <Col id="moviePoster" md="3">
                        <img className="poster" src={movie.base.image.url}/>
                    </Col>
                    <Col id="movieDescript" md="9">
                        <h5 style={{display: "inline"}}>{movie.base.title}</h5>({movie.base.year})
                        <p/>
                        <p>
                            IMDB: {movie.ratings.rating}/10 <br/>
                            MetaScore: {movie.metacriticScore.metaScore}/100
                        </p>
                        <p>Plot: {movie.plot.outline.text}</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}