/* eslint-disable no-console */
import React, { Component } from "react";
import { Table, Button, Card, Form} from "tabler-react";
import PropTypes from "prop-types";
import FilterableTable from 'react-filterable-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./StatsGrid.css";

import "tabler-react/dist/Tabler.css";

class StatsGrid extends Component {

    constructor(props) {
        super(props);
    }

    handleYearChange = (event) => {
        this.props.updateYear(parseInt(event.target.value));
    }

    handleSelectPlayer = (event) => {
        this.props.selectPlayer(event.target.value);
    }

    dropdown(){
        return(
            <Form.Select onChange={this.handleYearChange} value={this.props.year} className="selectgroup-item">
                <option key="2018" value="2018">2018</option>
                <option key="2017" value="2017">2017</option>
                <option key="2016" value="2016">2016</option>
                <option key="2015" value="2015">2015</option>
                <option key="2014" value="2014">2014</option>
            </Form.Select>
        )
    }

    getPlayerDataByYear = () => {
        let year = this.props.year;
        let playerData = this.props.players
            .filter(function(data){
                let flag = false;
                data.statsDTOS.forEach(function(item){
                    if(item.year === year)
                        flag = true;
                })
                return flag;
            })
            .map(function(data){
                let playerByYear;
                data.statsDTOS.forEach(function(item){
                    if(item.year === year)
                        playerByYear = {
                            playerId: item.playerId,
                            name:data.firstName + " " + data.lastName,
                            plateAppearances: item.plateAppearances,
                            atBats:item.atBats,
                            runs: item.runs,
                            hits: item.hits,
                            firstBase: item.firstBase,
                            secondBase: item.secondBase,
                            thirdBase: item.thirdBase,
                            homeRuns: item.homeRuns,
                            rbis: item.rbis,
                            walks: item.walks,
                            battingPercentage: item.battingPercentage,
                            slugingPercentage: item.slugingPercentage,
                            average: item.average,
                            playersInScoringPosition: item.playersInScoringPosition,
                            year: item.year
                        };
                });
                return playerByYear;
            });

        return playerData;
    }

    newCreatePlayerRows = (playerData, playerButtonHandler) => {
        const data = [];

        const renderPlayerButton = (props) =>{
            return(
                <span>
                    <Button onClick={props.record.handler} value={props.record.playerId} color="primary">Select</Button>
                </span>
            )
        };

        const fields = [
            { name: "",                  displayName: this.dropdown(),                   buttonMethod:this.handleSelectPlayer, render:renderPlayerButton },
            { name: 'name',              displayName: "Name",               inputFilterable: true, sortable: true },
            { name: 'plateAppearances',  displayName: "PA",   inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'atBats',            displayName: "AB",             inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'runs',              displayName: "Runs",               inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'hits',              displayName: "Hits",               inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'firstBase',         displayName: "Singles",          inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'secondBase',        displayName: "Doubles",         inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'thirdBase',         displayName: "Triples",          inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'homeRuns',          displayName: "HR",           inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'rbis',              displayName: "RBIS",               inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'walks',             displayName: "BB",              inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'battingPercentage', displayName: "OBP",  inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'average',           displayName: "Average",            inputFilterable: true, exactFilterable: true, sortable: true }

        ];

        playerData.forEach(function(dataItem){
           data.push(
               {
                   playerId: dataItem.playerId,
                   handler:playerButtonHandler,
                   button:"select",
                   name: dataItem.name,
                   plateAppearances:dataItem.plateAppearances,
                   atBats:dataItem.atBats,
                   runs:dataItem.runs,
                   hits:dataItem.hits,
                   firstBase:dataItem.firstBase,
                   secondBase:dataItem.secondBase,
                   thirdBase:dataItem.thirdBase,
                   homeRuns:dataItem.homeRuns,
                   rbis:dataItem.rbis,
                   walks:dataItem.walks,
                   battingPercentage:dataItem.battingPercentage,
                   average:dataItem.average
               }
           )
        });

        return (
            <div id="FilteredTableId">
                <FilterableTable
                    namespace="People"
                    iconSort={<FontAwesomeIcon icon="sort"/>}
                    iconSortedAsc={<FontAwesomeIcon icon="angle-down"/>}
                    onFilterRemoved={false}
                    headerVisible={true}
                    pagersVisible={false}
                    pagerTopClassName="pagerTop"
                    data={data}
                    fields={fields}
                    noRecordsMessage="There are no people to display"
                    noFilteredRecordsMessage="No people match your filters!"
                />
            </div>
        )
    };

    render() {
        let sortData = this.getPlayerDataByYear();

        return(
            <div>
                <Card>
                    <Card.Header>
                        <Card.Title>Stats</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="DottedBox">
                            {this.newCreatePlayerRows(sortData, this.handleSelectPlayer)}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

StatsGrid.propTypes = {
    updateYear: PropTypes.func,
    selectPlayer: PropTypes.func,
    players: PropTypes.array,
    year :   PropTypes.number
};

export default StatsGrid;







