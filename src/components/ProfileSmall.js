import React, {Component} from 'react'
import profImg from '../media/profile.png'
import '../css/ProfileSmall.css'

export default class ProfileSmall extends Component {
    constructor(props) {
        super(props);
        this.goto = this.goto.bind(this)
    }

    goto() {
        let url = '/profile/'
        if (this.props.user.id) {
            url += this.props.user.id;
        }
        if (this.props.history) {
            this.props.history.push(url);
        }
    }

    render() {
        return (
            <div style={this.props.style} onClick={this.goto}>
                <img className="smallProfPic" src={profImg}/>
            </div>
        )
    }
}   