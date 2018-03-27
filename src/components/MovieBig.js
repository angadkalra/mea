import React, {Component} from 'react'
import axios from 'axios'
import {Row, Col, Container, Button} from 'reactstrap'
import '../css/MovieBig.css'
import MyNavbar from '../components/Navbar'
import ProfileSmall from '../components/ProfileSmall'

export default class MovieBig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            movie: {
                imdbId: "",
                base: {
                    id: "",
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
            },
            added: false
        }
    }

    movieAdded = (movies ,id) => {
        console.log(id)
        for (let m of movies) {
            console.log(m.imdbId);
            if (m.imdbId == id) return true;
        }
        return false;
    }

    componentWillMount() {
        let authToken = localStorage.getItem('authToken');
        if (authToken) {
            axios.defaults.headers.common['Authorization'] = authToken;
        }
        let url = '/api/profile/';
        let that = this;
        let id = this.props.match.params.id;
        axios.post('/api/movies/', {
            movieId: id
        })
        .then((response) => {
            console.log(response);
            let movie = response.data;
            axios.get(url)
            .then((response2) => {
                console.log(response2);
                let data = response2.data;
                let friends = that.state.friends;
                friends = friends.concat(data.followers);
                friends = friends.concat(data.followings);
                let movId = movie.base.id.substr(7);
                movId = id.substr(0, id.length);
                let added = this.movieAdded(data.movies, movId);
                that.setState({friends: friends, movie: movie, added: added});
            })
            .catch((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    recommend = (user) => {
        console.log(user);
        let id = this.state.movie.base.id.substr(7);
        id = id.substr(0, id.length - 1);
        console.log(id);
        axios.post('/api/recommend/', {
            imdbID: id,
            profileID: [
                user
            ]
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    addMovie = () => {
        let that = this;
        let id = this.state.movie.base.id.substr(7);
        id = id.substr(0, id.length - 1);
        axios.post('/api/profile/update/', {
            addMovies: [
                {
                    imdbId: id
                }
            ]
        })
        .then((response) => {
            that.setState({added: true})
        })
        .catch((error) => {

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

        let text = this.state.added ? "Added!" : "Add Movie"
        
        console.log(movie);
        console.log(this.state.friends);

        return (
            <Container>
                <MyNavbar items={navItem} search={true} history={this.props.history}/>
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
                        <Button onClick={this.addMovie}>{text}</Button>
                    </Col>
                </Row>
                <h4 style={{marginTop: "20px"}}>Recommend to</h4>
                <Row className="movieBig-row">
                    {this.state.friends.map((f) => {
                        return (
                            <div onClick={() => this.recommend(f.id)}>
                                <ProfileSmall style={{marginTop: "10px", cursor: "pointer"}} user={f} history={this.props.history}/>
                            </div>
                        )
                    })}
                </Row>
            </Container>
        )
    }
}