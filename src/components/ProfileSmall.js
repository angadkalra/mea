import React, {Component} from 'react'
import profImg from '../media/profile.png'
import '../css/ProfileSmall.css'

export default class ProfileSmall extends Component {
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
                <div className="profileSmall">
                    <img src={profImg}/>
                </div>
            </div>
        )
    }
}   