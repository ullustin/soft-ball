import React, {Component} from "react"
import {Form, Button, Card} from "tabler-react";

class CreateWeek extends Component{
    constructor(props){
        super(props)
    }

    createWeekForm = () =>{
      return(
          <div>
            <Form>
                <Form.Input label="League" name='league' />
                <Form.Input label="Week" name='week' />
                <Form.Input label="Position" name='position' />
                <Form.Input label="Size" name='size' />
                <Form.Input label="Start" name='startDateTime' />
                <Form.Input label="End" name='endDateTime' />
            </Form>
          </div>
      );
    };

    render(){
        return (
            <div>
                <Card>
                    <Card.Header>
                        <Card.Title>Create New Week Ranking</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {this.createWeekForm()}
                    </Card.Body>
                    <Card.Footer>
                        <Button block color="primary">
                            Submit
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default CreateWeek;