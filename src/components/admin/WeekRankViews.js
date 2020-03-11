import React, {Component} from "react"
import {Card, Button} from "tabler-react"

class WeekRankViews extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Card>
                    <Card.Header>
                        <Card.Title>Weeks Rankings</Card.Title>
                    </Card.Header>
                    <Card.Body>

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
export default WeekRankViews