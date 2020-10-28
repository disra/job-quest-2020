import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

class Joke extends Component {

    render() {
        return (
            <div>
                <ListGroup className="mt-5">
                    {this.props.data.map((jokes, index) => {
                        return (
                            <ListGroupItem key={jokes.id}>
                                <h4>Joke No.{index + 1}</h4> {jokes.joke}
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </div>
        );
    }
}

export default Joke;