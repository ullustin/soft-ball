import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import "./Home.css"
import { Grid, Form, Card } from "tabler-react";

import RankingsView from "./rankings/RankingsView";

//ToDo Add a schedule component
class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1></h1>
                <Grid.Row >
                    <Grid.Col className="OutFieldClass" width={6}>
                        <RankingsView position="OutField" />
                    </Grid.Col>


                    <Grid.Col width={6}>
                        {/*<Card>*/}
                            {/*<Card.Header>*/}
                                {/*<Card.Title>Schedule</Card.Title>*/}
                            {/*</Card.Header>*/}
                            {/*<Card.Body>*/}


                            {/*</Card.Body>*/}
                            {/*<Card.Footer>*/}

                            {/*</Card.Footer>*/}
                        {/*</Card>*/}

                    </Grid.Col>
                </Grid.Row>

            </div>
        );
    }
}

export default Home;







