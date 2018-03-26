import React, {Component} from 'react'
import ProfPic from '../media/profile.png'
import '../css/ProfileSmall.css'

export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.goto = this.goto.bind(this)
    }

    goto() {
        let url = '/profile/' + this.props.user.id;
        if (this.props.history) {
            this.props.history.push(url);
        }
    }

    render() {
        console.log(this.props.user);
        return (
            <div style={this.props.style} onClick={this.goto}>
                {this.props.user.username}
                <div>
                    <img className="smallProfPic" src={ProfPic}/>
                </div>
                {this.props.user.bio}
            </div>
        )
    }
}   