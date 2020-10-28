### Eiloy Job Interview 2020
Hi all applicants! Welcome to Eiloy Job Interview 2020. Being and work at Eiloy is challenging so we have challenges for you! These challenges are designed to assess your learning skill, which is the fundamental and most important skill of great software developer. So I do not expect you to have full or any knowledge about the topic beforehand but it's your job to try to learn and answer those challenges.
## Algorithm in Javascript
Code must be writted in Javascript language. The code will be tested with Node8, so you can use all Javascript features that equivalent to Node8.
1. Write a function that shift the elements of array to left or right by n elements in infinity loop. the function recevice 3 parameters, 1st is an array, 2nd the is direction ('left' or 'right'), 3rd is the number of elements will be shifted. For example,
```
> shift(['john', 'jane', 'sarah', 'alex'], 'left', 2)
['sarah', 'alex', 'john', 'jane']
> shift([1, 2, 3, 4 ,5], 'right', 3)
[3, 4, 5, 1, 2]
```
Answer:
```javascript
const shiftArray = (array, direction, n) => {
    const length = array.length;
    if (direction === "left") {
        for (let i = 0; i < (n % length); i++) {
            array.push(array.shift());
        }
    } else if (direction === "right") {
        for (let i = 0; i < (n % length); i++) {
            array.unshift(array.pop());
        }
    } else {
        return "You should fill in this  \"shiftArray([yourArray], 'left/right' , n)\" patterns."
    }
    return array;
}

console.log("right", shiftArray([1, 2, 3, 4, 5], 'right', 3));
console.log("left", shiftArray(['john', 'jane', 'sarah', 'alex'], 'left', 2));
```
2. Download [hero.json](https://github.com/aoffy-kku/job-quest-2020/blob/master/hero.json) and write a code to caculate these values from **hero.json**
- 2.1 Average **networth** of all heroes
- 2.2 Average **level** for hero that has 'intelligent' as **primary_attribute**
- 2.3 Find the hero who got the most **assist**
- 2.4 Find the hero who got the worst **kill/death ratio** (ratio = kill/death)

Answer:
```javascript
const heros = require('../data/hero.json');

const average = heros.map(hero => hero.networth).reduce((x, y) => x + y) / heros.length;
console.log(average);

const averageLevel = heros.map(hero => hero.primary_attribute === "intelligent" ? hero.level : 0).reduce((x, y) => x + y) / heros.length;
console.log(averageLevel);

const mostAssist = Math.max.apply(null, heros.map(hero => hero.assist));
const heroMostAssist = heros.filter(hero => hero.assist === mostAssist);
console.log(heroMostAssist[0].name);

const ratio = heros.map(hero => hero.kill/hero.death);
const heroWithWorstRatio = heros[ratio.indexOf(Math.min(...ratio))].name;
console.log(heroWithWorstRatio);
```
## Simple Web Application: A joke from Chuck Norris.
This part of quest will be a challenging one. You are going to make a simple web application which allow users to get some joke from **Chuck Norris** himself.
> Chuck Norris once ordered a Big Mac at Burger King, and got one.
### Features
- Users can get a joke from [Chuck Norris API](http://www.icndb.com/api/)
- Users has options to change number of result jokes, user's first name and last name
- UI Design as you wish.
### Technical description
- Using data from [REST API](http://www.icndb.com/api/)
- Any tools & framework is allowed.
- If you are using tools & framework which is same as our tech stack (React, Redux, styled-components etc.) will be a plus.
- Any extra feature will be a plus.

Answer:
```
//Note: Sass and react-bootstrap is used.
//In App.js

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

//In Joke.js

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

//In User.js

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

```

## Questions
Q1: What do you do if the tester found a bug on your application on Saturday?

Ans: I will find where bug it is and fix in that day (If I'm not with my computer normally after dinner). 

Q2: Do you think working with Thai people will be difficult to communicate?

Ans: Sometimes, because everyone has unique word for their own but if I stayed for enough time, It doesn't hard to understand. I hope that.

Q3: What do you expect to get from work at Eiloy?

Ans: Learn new thing espacially not javascript or web development if the company happy I happy. That's all.

## Submitting
Please fork this repo and submit your repository at p.kittisak@forexcityth.com along with your contact information.
Note: These challenges must be done by yourself. There is no benefit for both sides if the answer do not reflect your true skill.
