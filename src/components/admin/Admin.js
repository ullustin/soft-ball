import React, {Component} from "react"
import CreateWeek from "./CreateWeekRanks"
import WeekRankViews from "./WeekRankViews"
import League from "./League"
import {Grid} from "tabler-react";
import "./Admin.css"

class Admin extends Component{
    constructor(props){
        super(props);

        this.state = {
            weeks:[]
        }
    }

    render(){
        return (
            <div className="container">
                <h1></h1>
                <Grid.Row >
                    <Grid.Col className="leagueColumn" width={4}>
                        <League/>
                    </Grid.Col>
                    <Grid.Col width={2}>
                    </Grid.Col>
                    <Grid.Col className="OutFieldClass" width={6}>
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Col width={6}>
                        <WeekRankViews/>
                    </Grid.Col>
                    <Grid.Col className="OutFieldClass" width={6}>
                        <CreateWeek/>
                    </Grid.Col>
                </Grid.Row>
            </div>
        )
    }

}

export default Admin;