import React, { Component } from "react";
import {Table} from "tabler-react";
import "./StatsGrid.css";


class PlayerStatsSummary extends Component{

    constructor(props){
        super(props)
    }


    getPlayerDataByYear = () => {
        let playerData = this.props.stats
            .map(function(data){
                return {
                    playerId: data.playerId,
                    year: data.year,
                    captain: data.captain,
                    average: data.average,
                    battingPercentage: data.battingPercentage,
                    defensivePosition: data.defensivePosition
                };
            });
        return playerData;
    }

    getCreatedPlayerRows = (stats) => {
        let finalData = stats.map(function(item){
            return(
                <Table.Row key={item.year}>
                    <Table.Col alignContent="center">{item.year}</Table.Col>
                    <Table.Col alignContent="center" >{item.average}</Table.Col>
                    <Table.Col alignContent="center" >{item.battingPercentage}</Table.Col>
                    <Table.Col alignContent="center" >{item.captain}</Table.Col>
                    <Table.Col alignContent="center" >{item.defensivePosition}</Table.Col>
                </Table.Row>
            );
        });

        return finalData;
    };

    render() {
        let playerData = this.getPlayerDataByYear();
        let finalData = this.getCreatedPlayerRows(playerData);

        return (
            <div className="DottedBox">
                <Table>
                    <Table.Header>
                        <Table.Row >
                            <Table.ColHeader alignContent="center" >Year</Table.ColHeader>
                            <Table.ColHeader alignContent="center" >Average</Table.ColHeader>
                            <Table.ColHeader alignContent="center" >On Base %</Table.ColHeader>
                            <Table.ColHeader alignContent="center" >Captain</Table.ColHeader>
                            <Table.ColHeader alignContent="center" >Position</Table.ColHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {finalData}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default PlayerStatsSummary;