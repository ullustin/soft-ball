import React, {Component} from "react";
import {Grid, Card, Form, List, Button} from "tabler-react";
import Select from 'react-select';

class RankPlayers extends Component{

    constructor(props){
        super(props);

        this.state = {
            selectedOptions:[],
            captainsList:[]
        }
    }

    handleChange = (selectedOption, event,) => {
        let stateSelectedOptions = this.state.selectedOptions;
        selectedOption["rank"] = event.name;
        stateSelectedOptions[event.name] = selectedOption;
        stateSelectedOptions[event.name]["rank"] = event.name + 1;
        this.setState({ selectedOptions:stateSelectedOptions});
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
            // let selectOptionsValue = "selectedOptions" + i;
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
        //Check if selected captain has already been entered.
        //Verify that there arent any duplicates.
    };

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
                        <Form.Select className="selectMargin">
                            {this.renderCaptainsList()}
                        </Form.Select>
                        {this.renderPlayersList()}
                        <Button onClick={this.submitForm} color="primary" block>Submit</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}
export default RankPlayers

