import React, {Component} from 'react'
import '../css/Signup.css'
import { Alert, Button, Jumbotron,  Form, FormGroup, Input, Label, Container, Row, Col, FormFeedback } from 'reactstrap';
import axios from 'axios'
import MyNavbar from '../components/Navbar'

export default class SignupForm extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    confPassword: '',
    usernameValid: false,
    passwordValid: false,
    firstNameValid: false,
    emailValid: false,
    lastNameValid: false,
    confPasswordValid: false,
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
    let toSend = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }
    let conf = (this.state.confPassword == this.state.password);
    this.setState({submitted: true, confPasswordValid: conf, success: true});
    axios.post('/api/signup2/', toSend)
    
    .then((response) => {
      console.log(response);
      axios.post('/api/login/', {
        username: toSend.username,
        password: toSend.password
      })
      
      .then((response) => {
        console.log(response);
        that.props.history.push('/onboarding');
      })
      
      .catch((err) => {
        that.props.history.push('/login');
      })
    })
    
    .catch((error) => {
      console.log(error);
      that.setState({success: false});
    });
  }

  render() {

    let submitText = this.state.success ? "Thanks!" : "Submit"
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
                <h1>Singup</h1>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" name="email" id="Email" onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input invalid={this.state.submitted && !this.state.firstNameValid} type="plaintext" name="firstName" id="FirstName" onChange={this.handleInputChange} />
                  <FormFeedback>Field needs to be filled in</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input invalid={this.state.submitted && !this.state.lastNameValid} type="plaintext" name="lastName" id="LastName" onChange={this.handleInputChange} />
                  <FormFeedback>Field needs to be filled in</FormFeedback>
                </FormGroup>
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
                <FormGroup>
                  <Label for="confPassword">Confirm Password</Label>
                  <Input invalid={this.state.submitted && !this.state.confPasswordValid} type="password" name="confPassword" id="ConfPassword" onChange={this.handleInputChange} />
                  <FormFeedback>Passwords need to match</FormFeedback>
                </FormGroup>
                  <Button type="submit" color="primary" >{submitText}</Button>
                  {warning}
              </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}