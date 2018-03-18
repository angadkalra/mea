import React, {Component} from 'react'
import '../css/Movie.css'

export default class Movie extends Component {
    render() {
        return (
            <div className="movie">
                <img src={this.props.movie.posterUrl}/>
            </div>
        )
    }
}   