import React, {Component} from "react";
import StatsGrid from "./grid/StatsGrid"
import PlayerProfilesGroup from "./summary/PlayerProfilesGroup"
import { css } from '@emotion/core';
// First way to import
import {FadeLoader } from 'react-spinners';
import "./grid/StatsGrid.css";
import {Grid} from "tabler-react";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Stats extends Component  {

    constructor(props){
        super(props);

        this.updateYear = this.updateYear.bind(this);
        this.selectPlayer = this.selectPlayer.bind(this);

        this.state = {
            loading: true,
            players: [],
            player:{},
            leagueAverages:{},
            year: 2019
        };
    }

    fetchPlayers(){
        fetch(`http://localhost:8080/v1/soft-ball/stats/get-all-players-and-stats`)
            .then(response => response.json())
            .then(
                data => {
                    this.setState({
                        players:data,
                        loading:false
                    });
                }
            )
            .catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount(){
        this.fetchPlayers();
    }

    updateYear = (year) => {
        let newState = {
            players: this.state.players,
            player: this.state.player,
            year: year
        };
        this.setState(newState);
    };

    selectPlayer = (playerId) =>{

        let player = {};
        this.state.players.forEach(function(item){
            if(item.id == playerId)
                player = item;
        });
        this.setState({
            players: this.state.players,
            player: player,
            year: this.state.year
        });
    };

    render(){
        return (
            <div className="container">
                <h1></h1>
                <div id="profile-group">
                    <PlayerProfilesGroup player={this.state.player}/>
                </div>
                <div className='sweet-loading'>
                    <FadeLoader
                        css={override}
                        sizeUnit={"px"}
                        size={150}
                        color={'#467fcf'}
                        loading={this.state.loading}
                    />
                </div>
                <Grid.Row>
                    <Grid.Col  width={16}>
                        {!this.state.loading && <StatsGrid isDraft={false} updateYear={this.updateYear} selectPlayer={this.selectPlayer} players={this.state.players} year={this.state.year} />}
                    </Grid.Col>
                </Grid.Row>



            </div>
        );
    }
}

export default Stats;
