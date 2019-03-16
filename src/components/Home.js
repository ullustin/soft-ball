import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import { Grid } from "tabler-react";

class Home extends Component {
    render() {
        return (

            <Grid.Row>
                <Grid.Col width={2}></Grid.Col>
                <Grid.Col width={8}>
                    <h1>Home</h1>
                </Grid.Col>
                <Grid.Col width={2}></Grid.Col>
            </Grid.Row>
        );
    }
}

export default Home;




