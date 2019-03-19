import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import {Grid, Card, Form} from "tabler-react";
import PropTypes from "prop-types";
import StatsGrid from "./StatsGrid";
import PlayerChart from "./PlayerChart"
import PlayerStatsSummary from "./PlayerStatsSummary"
import "./StatsGrid.css";

class PlayerProfilesGroup extends Component {

    constructor(props){
        super(props);

        this.state={
            selectedStat:"average"
        }
    }

    handleStateChange = (event) =>{

        this.setState({
            selectedStat:event.target.value
        })
    }

    playerExists = () => {
        if(Object.entries(this.props.player).length !== 0)
        {
            return (
                <Card>
                    <Card.Header>
                        <Card.Title>{this.props.player.firstName} {this.props.player.lastName}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Grid.Row>
                            <Grid.Col className="gridSize" width={4}>
                                <Form.Select onChange={this.handleStateChange} className="selectMargin">
                                    <option key="average"           value="average" >Average</option>
                                    <option key="battingPercentage" value="battingPercentage" >On Base %</option>
                                    <option key="plateAppearances"  value="plateAppearances" >Plate Appearences</option>
                                    <option key="hits"              value="hits" >Hits</option>
                                    <option key="atBats"            value="atBats" >At Bats</option>
                                    <option key="runs"              value="runs" >Runs</option>
                                    <option key="firstBase"         value="firstBase" >Singles</option>
                                    <option key="secondBase"        value="secondBase" >Doubles</option>
                                    <option key="thirdBase"         value="thirdBase" >Triples</option>
                                    <option key="homeRuns"          value="homeRuns" >Home Runs</option>
                                    <option key="walks"             value="walks" >Walks</option>
                                    <option key="rbis"              value="rbis" >RBIS</option>
                                </Form.Select>

                                <PlayerChart statSelection={this.state.selectedStat} playerStats={this.props.player.statsDTOS}/>
                            </Grid.Col>
                            <Grid.Col className="defaultColumn" width={1}>
                            </Grid.Col>
                            <Grid.Col className="summaryGridSize" width={7}>
                                <PlayerStatsSummary stats={this.props.player.statsDTOS} />
                            </Grid.Col>
                        </Grid.Row>
                    </Card.Body>
                </Card>
            );
        }
        else {
            return(<div></div>)
        }
    };

    render() {
        return (this.playerExists())
    }
}

StatsGrid.propTypes = {
    player: PropTypes.object
};

export default PlayerProfilesGroup;




