import React, {Component} from 'react'
import '../css/Movie.css'

export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.goto = this.goto.bind(this)
    }

    goto() {
        let url = '/movie/' + this.props.movie.imdbId;
        if (this.props.history) {
            this.props.history.push(url);
        }
    }

    render() {
        return (
            <div style={this.props.style} onClick={this.goto}>
                <div className="movie">
                    <img src={this.props.movie.posterUrl}/>
                </div>
            </div>
        )
    }
}   