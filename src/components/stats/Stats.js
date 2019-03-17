import React, {Component} from "react";
import StatsGrid from "./StatsGrid"
import PlayerProfilesGroup from "./PlayerProfilesGroup"

class Stats extends Component  {

    constructor(props){
        super(props);

        this.updateYear = this.updateYear.bind(this);
        this.selectPlayer = this.selectPlayer.bind(this);

        this.state = {
            players: [],
            player:{},
            year: 2018
        };
    }

    fetchPlayers(){
        fetch(`http://localhost:8080/v1/soft-ball/stats/get-all-players-and-stats`)
            .then(response => response.json())
            .then(
                data => {
                    this.setState({
                        players:data
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
                <PlayerProfilesGroup player={this.state.player}/>
                <StatsGrid updateYear={this.updateYear} selectPlayer={this.selectPlayer} players={this.state.players} year={this.state.year} />
            </div>
        );
    }
}

export default Stats;