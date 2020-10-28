import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import User from './components/User';
import './sass/index.scss'

class App extends Component{
  constructor(props){
    super(props);
    this.state = {joke: ""};
    this.onDataChange = this.onDataChange.bind(this);
  }

  onDataChange(newJoke) {
    this.state({joke: newJoke});
  }

  render() {
    return (
      <Container>
          <Row className="mt-5">
            <Col className="col-12">
              <User/>
            </Col>
          </Row>
      </Container>
    );
  }
}

export default App;
