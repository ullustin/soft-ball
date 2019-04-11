import React, {Component} from "react"
import "tabler-react/dist/Tabler.css";
import {Grid, Card, Form} from "tabler-react";
import WeekRank from "./WeekRank";
import RankPlayers from "./RankPlayers"

class Rankings extends Component{

    constructor(props){
        super(props);

        this.onSelectselectPositionRank = this.selectPositionRank.bind(this);
        this.onSelectClearRank = this.clearSelectedWeekRankHandler.bind(this);

        this.state = {
            loading:true,
            weeklyRanks:[],
            rank:{},
            playersList:[],
            captainsList:[],
            selectedWeekRank:{}
        }

    };

    selectPositionRank = (weekRank) =>{
        this.getCaptainsList(weekRank);
    };

    getWeeklyRanks(){
        fetch(`http://167.99.103.86:8080/v1/soft-ball/rankings/get-week-ranks`)
            .then(response => response.json())
            .then(
                data => {
                    this.setState({
                        weeklyRanks:data,
                        loading:false
                    });
                }
            )
            .catch(error => this.setState({ error, isLoading: false }));
    }

    getPlayersList(){
        fetch(`http://167.99.103.86:8080/v1/soft-ball/rankings/get-players-list`)
            .then(response => response.json())
            .then(
                data => {
                    this.setState({
                        playersList:data
                    });
                }
            )
            .catch(error => this.setState({ error, isLoading: false }));
    }

    getCaptainsList(weekRank){
        fetch(`http://167.99.103.86:8080/v1/soft-ball/rankings/get-captains-list?weekRankId=${weekRank.id}`)
            .then(response => response.json())
            .then(
                data => {
                    if(data.length != 0){
                        this.setState({
                            captainsList:data,
                            loading:this.state.loading,
                            weeklyRanks:this.state.weeklyRanks,
                            selectedWeekRank:weekRank
                        });
                    }
                }
            )
            .catch(error => {
                this.setState({ error, isLoading: false })
            });
    }

    clearSelectedWeekRankHandler(){
        this.setState({
            selectedWeekRank:{}
        })
    }

    componentDidMount(){
        this.getWeeklyRanks();
        this.getPlayersList();
    }

    render(){
        return (
            <div className="container">
                <h2></h2>
                <Grid.Row cards>
                    <Grid.Col width={1}></Grid.Col>
                    <Grid.Col width={4} className="CardWeekRank">
                        <div id="weekly-ranking">
                            {Object.entries(this.state.selectedWeekRank).length === 0 && <WeekRank weeklyRanks={this.state.weeklyRanks} weekRankHandler={this.onSelectselectPositionRank}/>}
                        </div>
                        <div id="select-rankings">
                            {Object.entries(this.state.selectedWeekRank).length !== 0 && <RankPlayers onSelectClearRank={this.onSelectClearRank} selectedWeekRank={this.state.selectedWeekRank} captainsList={this.state.captainsList} playersList={this.state.playersList}/>}
                        </div>
                    </Grid.Col>
                    <Grid.Col width={6}></Grid.Col>
                    <Grid.Col width={1}></Grid.Col>
                </Grid.Row>
            </div>
        )
    }
}
export default Rankings;