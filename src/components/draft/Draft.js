import React, {Component} from "react";
import StatsGrid from "../stats/grid/StatsGrid"
import PlayerProfilesGroup from "../stats/summary/PlayerProfilesGroup"
import DraftBoard from "./board/DraftBoard"
import { css } from '@emotion/core';
// First way to import
import { FadeLoader } from 'react-spinners';
import "../stats/grid/StatsGrid.css";
import {Grid} from "tabler-react";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Draft extends Component  {
    constructor(props){
        super(props);

        this.updateYear = this.updateYear.bind(this);
        this.selectPlayer = this.selectPlayer.bind(this);
        this.draftPlayer = this.draftPlayer.bind(this);
        this.undoPick = this.undoPick.bind(this);

        this.state = {
            loading: true,
            players: [],
            player:{},
            leagueAverages:{},
            draft:{},
            draftId:"3e160ff4-3c17-4808-85fc-997dea98acbc",
            year: 2019
        };
    }
    componentDidMount(){
        this.getDraft();
        this.fetchPlayers();
    }
    fetchPlayers(){
        fetch(`http://localhost:8080/v1/soft-ball/stats/get-undrafted-players?draftId=`+ this.state.draftId)
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
    getDraft(){

        fetch(`http://localhost:8080/v1/soft-ball/draft/get-drafts?draftId=` + this.props.draftId)
            .then(response => response.json())
            .then(
                data => {
                    this.setState({
                        draft:data[0],
                        draftID: this.state.draftID
                    });
                }
            )
            .catch(error => this.setState({ error, isLoading: false }));
    }
    updateYear = (year) => {
        let newState = {
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
    draftPlayer = () =>{
        this.getDraft();
        this.fetchPlayers();
    };
    undoPick = () =>{
        this.getDraft();
        this.fetchPlayers();
    }
    render(){
        return (
            <div className="container"  style={{'maxWidth':'1400px'}}>
                <h1></h1>
                <div id="profile-group">
                    <PlayerProfilesGroup draftId={this.state.draftId} player={this.state.player} draftPlayer={this.draftPlayer}/>
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
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Col width={4}>
                            {!this.state.loading && <StatsGrid draftPlayer={this.draftPlayer} isDraft={true} updateYear={this.updateYear} selectPlayer={this.selectPlayer} players={this.state.players} year={this.state.year} />}
                        </Grid.Col>
                        <Grid.Col width={8}>
                            {!this.state.loading && <DraftBoard  draftId={this.state.draftId} undoPick={this.undoPick} draft={this.state.draft} />}
                        </Grid.Col>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Draft;
