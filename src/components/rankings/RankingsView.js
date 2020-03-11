import React, {Component} from "react";
import {Grid, Card, Form, Table} from "tabler-react";
import {FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


class RankingsView extends Component{

    constructor(props){
        super(props)

        this.onChangePosition = this.changeSelectPosition.bind(this);
        this.onChangeWeek = this.changeSelectWeek.bind(this);

        this.state = {
            loading:true,
            rankings:{},
            selectedWeek:1000,
            position:props.position
        }
    }
    changeSelectPosition(event){
        this.setState({
            position:event.target.value
        })
    }
    changeSelectWeek(event){
        this.setState({
            selectedWeek:event.target.value
        })
    }
    createPositionOptions(){

        let positionSet = new Set();
        this.state.rankings.forEach(function(item){
            if(!positionSet.has(item.position)) {
                positionSet.add(item.position)
            }
        });

        positionSet = Array.from(positionSet);
        let positionOptions = positionSet.map(function(item){

            return (<option key={item} value={item}>{item == "InField" ? "In Field":"Out Field"}</option>)
        });

        return positionOptions;
    }
    createWeekOptions(){

        let weekSet = new Set();
        // weekSet.add("Overall");
        this.state.rankings.forEach(function(item){
            if(!weekSet.has(item.week)) {
                weekSet.add(item.week)
            }
        });

        weekSet = Array.from(weekSet);
        let weekOptions = weekSet.map(function(item){
            let selectOption = item;

            if(item == 0)
                selectOption = "Pre Season";
            else if(item == 1000)
                selectOption = "Up To Date";

            return  (<option key={item} value={item}>{selectOption}</option>)
        })
        return weekOptions;
    }
    getTopTen(){

        let rank = null;
        let week = this.state.selectedWeek;
        let position = this.state.position;
        this.state.rankings.forEach(function(item){

            if(item.week == week && item.position == position) {

                return rank = item.playerRankDTOList;
            }
        });
        let count = 0;

        let topTen = null;
        if(rank) {
             topTen = rank.map(function (item) {
                if (count < 10) {
                    count++;
                    return (
                        <Table.Row key={item.playerId}>
                            <Table.Col>{count}</Table.Col>
                            <Table.Col>{item.playerName}</Table.Col>
                            <Table.Col>{item.points}</Table.Col>
                        </Table.Row>
                    )
                }
            })
        }
        return topTen
    }
    getTrailing(){
        let rank = null;
        let week = this.state.selectedWeek;
        let position = this.state.position;
        this.state.rankings.forEach(function(item){
            if(item.week == week && item.position == position) {
                return rank = item.playerRankDTOList;
            }
        });
        let count = 0;
        let trailingString = "";

        if(rank) {
            rank.forEach(function (item) {
                count++;
                if (count > 10) {
                    trailingString += (item.playerName + "(" + item.points + "), ")
                }
            });
        }
        return trailingString;
    }
    getRankings(){
        fetch(`http://localhost:8080/v1/soft-ball/rankings/get-rankings-by-week`)
            .then(response => response.json())
            .then(
                data => {
                    // this.generateOverall(data);
                    this.setState({
                        rankings:data.filter(function(item){
                            if(item.status == "Complete"){
                                return item;
                            }
                        }),
                        loading:false
                    });
                }
            )
            .catch(error => {
                this.setState({ error, isLoading: false })
            });
    }
    componentDidMount(){
        this.getRankings();
    }
    render(){
        return (
            <div>
                <Card>
                    <Card.Header>
                        <Card.Title>Coaches Poll</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {!this.state.loading && <div>
                            <Grid.Row >
                                <Grid.Col width={6}>
                                    <Form.Select value={this.state.position} label="Position" onChange={this.onChangePosition} className="selectMargin">
                                        {this.state.rankings.length > 0 && this.createPositionOptions()}
                                    </Form.Select>
                                </Grid.Col>
                                <Grid.Col width={6}>
                                    <Form.Select value={this.state.selectedWeek} label="Week" onChange={this.onChangeWeek} className="selectMargin">
                                        {this.state.rankings.length > 0 && this.createWeekOptions()}
                                    </Form.Select>
                                </Grid.Col>

                            </Grid.Row>

                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColHeader>Rank</Table.ColHeader>
                                        <Table.ColHeader>Name</Table.ColHeader>
                                        <Table.ColHeader>Points</Table.ColHeader>

                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.state.rankings.length > 0 && this.getTopTen()}
                                </Table.Body>
                            </Table>
                        </div>}

                        <div className='sweet-loading'>
                            <FadeLoader
                                css={override}
                                sizeUnit={"px"}
                                size={150}
                                color={'#467fcf'}
                                loading={this.state.loading}
                            />
                        </div>


                    </Card.Body>
                    <Card.Footer>
                        {this.state.rankings.length > 0 && this.getTrailing()}
                    </Card.Footer>
                </Card>
            </div>
        )
    }
}

export default RankingsView
