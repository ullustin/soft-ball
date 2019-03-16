import React, { Component } from "react";
import "tabler-react/dist/Tabler.css";
import {Grid, Card} from "tabler-react";
import PropTypes from "prop-types";
import StatsGrid from "./StatsGrid";
import PlayerChart from "./PlayerChart"
import PlayerStatsSummary from "./PlayerStatsSummary"

class PlayerProfilesGroup extends Component {

    constructor(props){
        super(props);
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
                            <Grid.Col width={4}>
                                <PlayerChart playerStats={this.props.player.statsDTOS}/>
                            </Grid.Col>
                            <Grid.Col width={8}>
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




