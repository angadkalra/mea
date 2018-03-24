import React, {Component} from 'react'
import '../css/Signup.css'
import { Alert, Button, Jumbotron,  Form, FormGroup, Input, Label, Container, Row, Col, FormFeedback } from 'reactstrap';
import axios from 'axios'
import MyNavbar from '../components/Navbar'

export default class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    usernameValid: false,
    passwordValid: false,
    submitted: false,
    success: false
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type ===
        'checkbox' ? target.checked : target.value;
    const name = target.name;
    const validName = name + 'Valid';
    const valid = (value != '' && value != ' ');
    this.setState({
      [name]: value,
      [validName]: valid
    });
  }

  componentDidMount() {
    // this.primaryInput.focus();
  }

  onSubmit = (event) => {
    event.preventDefault();
    let that = this;
    console.log(this.state.username);
    console.log(this.state.password);
    this.setState({submitted: true, success: true});
    axios.post('/api/login/', {
      username: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      console.log(response);
      that.props.history.push('/profile');
    })
    .catch((error) => {
      console.log(error);
      that.setState({success: false});
    });
  }

  render() {

    let submitText = this.state.success ? "Thanks!" : "Login"
    let navbarItems = []

    let warning;
    if(this.state.submitted && !this.state.success) {
      warning = <Alert style={{marginTop: "20px"}} color="danger">Something went wrong!</Alert>;
    }

    return (
      <Container fluid={true}>
        <MyNavbar items={navbarItems} />
        <Row> 
          <Col style={{paddingLeft: "20%", paddingRight: "20%", paddingTop: "10vh"}} className="main-signup">
              <Form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <FormGroup>
                  <Label for="lastName">Username</Label>
                  <Input invalid={this.state.submitted && !this.state.usernameValid} type="plaintext" name="username" id="Username" onChange={this.handleInputChange} />
                  <FormFeedback>Field needs to be filled in</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input invalid={this.state.submitted && !this.state.passwordValid} type="password" name="password" id="Password" onChange={this.handleInputChange} />
                  <FormFeedback>Field needs to be filled in</FormFeedback>
                </FormGroup>
                <Button type="submit" color="primary">{submitText}</Button>
                {warning}
              </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}