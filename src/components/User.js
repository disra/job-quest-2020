import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Joke from './Joke';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            firstName: "Chuck",
            lastNmae: "Norris",
            jokes: []
        };
        this.handleFNChange = this.handleFNChange.bind(this);
        this.handleLNChange = this.handleLNChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        fetch("http://api.icndb.com/jokes/random/" + this.state.value + "?firstName=" + this.state.firstName + "&lastName=" + this.state.lastName)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ jokes: result.value });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            );
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleFNChange(event) {
        this.setState({ firstName: event.target.value });
    }

    handleLNChange(event) {
        this.setState({ lastName: event.target.value });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <h1 className="mb-5" >Want some joke?</h1>
                    <Form.Row>
                        <Form.Group as={Col} controlId="firstName" onChange={this.handleFNChange}>
                            <Form.Label>
                                <p className="h3">Firstname</p>
                            </Form.Label>
                            <Form.Control type="text" placeholder="Chuck"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="lastName" onChange={this.handleLNChange}>
                            <Form.Label>
                                <p className="h3">LastName</p>
                            </Form.Label>
                            <Form.Control type="text" placeholder="Norris"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="numberOfJoke" onChange={this.handleChange}>
                        <Form.Label>
                            <p className="h3">How many ?</p>
                        </Form.Label>
                        <Form.Control type="text" placeholder="5"/>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
                <Joke data={this.state.jokes} />
            </div>
        );
    }
}

export default User;