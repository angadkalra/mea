import React, {Component} from 'react'
import profImg from '../media/profile.png'
import axios from 'axios'
import '../css/ProfileSmall.css'

export default class ProfileSmall extends Component {
    constructor(props) {
        super(props);
        this.goto = this.goto.bind(this)
        this.state = {
            user: {
                username: ""
            }
        }
    }

    componentWillMount() {
        let authToken = localStorage.getItem('authToken');
        if (authToken) {
            axios.defaults.headers.common['Authorization'] = authToken;
        }
        let url = '/api/profile/';
        if (this.props.id) {
            url += this.props.id;
        }
        console.log(this.props);
        console.log("Profile small calling");
        console.log(url);
        axios.get(url)
        .then((response) => {
            console.log(response);
            let data = response.data;
            this.setState({user: data});
        })
        .catch((error) => {
            console.log(error);
            this.props.history.push('/login');
        })
    }

    goto() {
        let url = '/profile/'
        if (this.props.id && this.props.clickable) {
            url += this.props.id;
            if (this.props.history) {
                this.props.history.push(url);
            }
        }
    }

    render() {
        return (
            <div style={this.props.style} onClick={this.goto}>
                <p>{this.state.user.username}</p>
                <img className="smallProfPic" src={profImg}/>
            </div>
        )
    }
}   