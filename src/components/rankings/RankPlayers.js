import React, {Component} from "react";
import {Grid, Card, Form, List, Button,Alert} from "tabler-react";
import Select from 'react-select';
import { ClipLoader, GridLoader, FadeLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class RankPlayers extends Component{

    constructor(props){
        super(props);

        this.state = {
            loading:false,
            selectedOptions:[],
            selectedCaptainId:props.captainsList[0].playerId,
            captainsList:[],
            validForm:false,
            duplicateError:false
        }
    }

    handleChange = (selectedOption, event,) => {
        let stateSelectedOptions = this.state.selectedOptions;
        selectedOption["rank"] = event.name;
        stateSelectedOptions[event.name] = selectedOption;
        stateSelectedOptions[event.name]["rank"] = event.name + 1;

        let entries = 0;
        this.state.selectedOptions.map(function(item){
            entries ++;

        });

        if(this.state.selectedOptions.length == this.props.selectedWeekRank.size && this.props.selectedWeekRank.size == entries){
            this.setState({
                validForm: true
            })
        }

        this.setState(
            {
                selectedOptions:stateSelectedOptions,
                duplicateError:false
            });
    };

    renderCaptainsList = () =>{

        let optionsList = this.props.captainsList.map(function(item){
            return(
                <option key={item.playerId} value={item.playerId} >{item.playerName}</option>
            );
        });
        return optionsList;
    };

    renderPlayersList = () =>{


        let groupItemList = [];
        let players = this.props.playersList.map(function(player){
            return {value:player._id, label:player.name}
        });
        for(var i = 0; i < this.props.selectedWeekRank.size; i++){
            groupItemList.push(
                <List.GroupItem key={i}>
                    <Grid.Row cards alignItems="center">
                        <Grid.Col width={2}>{i + 1}.</Grid.Col>
                        <Grid.Col width={10}>
                            <Select
                                key={i}
                                name={i}
                                value={this.state.selectedOptions[{i}]}
                                onChange={this.handleChange}
                                options={players}
                            />
                        </Grid.Col>
                    </Grid.Row>
                </List.GroupItem>
            );
        }
        return (
            <List.Group>
                {groupItemList}
            </List.Group>
        );
    };

    handleClearSelectedWeekRank = () =>{
        this.props.onSelectClearRank();
    }

    submitForm = () =>{
        this.setState({
            loading:true
        });
        let idSet = new Set();
        let duplicatesExist = false;
        this.state.selectedOptions.map(function(item){
            if(!idSet.has(item.value))
                idSet.add(item.value);
            else{
                duplicatesExist = true;
            }
        });
        if(duplicatesExist)
            this.setState({
                duplicateError:true,
                loading:false
            });
        else{
            let captainRankDTO = {};
            captainRankDTO["weekRankId"] = this.props.selectedWeekRank.id;
            captainRankDTO["captain"] = "default";
            captainRankDTO["captainId"] = this.state.selectedCaptainId;

            let playerDTOList = [];

            let points = (this.state.selectedOptions.length + 1);

            this.state.selectedOptions.map(function(item){
                playerDTOList.push(
                    {
                        "playerId":item.value,
                        "rank":item.rank,
                        "points":points - item.rank
                    }
                )
            });

            captainRankDTO["playerRankDTOList"] = playerDTOList;

            fetch(`http://167.99.103.86:8080/v1/soft-ball/rankings/save-ranking`, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(captainRankDTO), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    this.setState({
                        loading:false
                    });
                    this.handleClearSelectedWeekRank();
                    console.log('Success:', JSON.stringify(response))
                })
                .catch(error => {
                    this.setState({
                        loading:false
                    });
                    this.handleClearSelectedWeekRank();
                    console.error('Error:', error)
                });
        }

    };

    selectCaptain = (event) =>{
        console.log(event.target.value)
        this.setState({
            selectedCaptain:event.target.value
        });
        console.log(this.state.selectedCaptain);

    }

    render(){
        return(
            <div>
                <Card className="CardWeekRank">
                    <Card.Header>
                        <Card.Title className="card-title">
                            Week:{this.props.selectedWeekRank.week}
                            <span className="position-title">{this.props.selectedWeekRank.position}</span>
                            <span className="float-right"><Button onClick={this.handleClearSelectedWeekRank} color="primary" >Back</Button></span>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {/*value={this.state.selectedCaptainId}*/}

                        {!this.state.loading &&
                            <Form.Select  onChange={this.selectCaptain}
                                         className="selectMargin">
                                {this.renderCaptainsList()}
                            </Form.Select>
                        }
                        {this.state.duplicateError &&
                            <Alert type="danger">
                                <strong>Duplicates</strong> A player has been selected twice!
                            </Alert>
                        }
                        {!this.state.loading && this.renderPlayersList()}

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
                        {!this.state.validForm && <Button disabled onClick={this.submitForm} color="primary" block>Submit</Button>}
                        {this.state.validForm && <Button  onClick={this.submitForm} color="primary" block>Submit</Button>}

                    </Card.Footer>
                </Card>
            </div>
        )
    }

}
export default RankPlayers

