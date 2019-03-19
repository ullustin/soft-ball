import React, { Component } from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import "./StatsGrid.css";


class PlayerChart extends Component{

    constructor(props){
        super(props)
    }

    compare = (a,b) =>{
        const yearA = parseInt(a.Year);
        const yearb = parseInt(b.Year);

        let comparison = 0;

        if(yearA > yearb){
            comparison = 1;
        }
        else if (yearA < yearb){
            comparison = -1;
        }
        return comparison;
    }

    getKeyAndRange = (valueKey) =>{
        let keyAndRange = {};

        switch(valueKey){
            case 'average':
                keyAndRange['key'] = "Average";
                keyAndRange['range'] = [300,1000];
                return keyAndRange;
            case 'battingPercentage':
                keyAndRange['key'] = "On Base %";
                keyAndRange['range'] = [300,1000];
                return keyAndRange;
            case 'plateAppearances':
                keyAndRange['key'] = "Plate Appearences";
                keyAndRange['range'] = [0,100];
                return keyAndRange;
            case 'hits':
                keyAndRange['key'] = "Hits";
                keyAndRange['range'] = [0,100];
                return keyAndRange;
            case 'atBats':
                keyAndRange['key'] = "At Bats";
                keyAndRange['range'] = [0,100];
                return keyAndRange;
            case 'runs':
                keyAndRange['key'] = "Runs";
                keyAndRange['range'] = [0,100];
                return keyAndRange;
            case 'firstBase':
                keyAndRange['key'] = "Singles";
                keyAndRange['range'] = [0,50];
                return keyAndRange;
            case 'secondBase':
                keyAndRange['key'] = "Doubles";
                keyAndRange['range'] = [0,50];
                return keyAndRange;
            case 'thirdBase':
                keyAndRange['key'] = "Triples";
                keyAndRange['range'] = [0,50];
                return keyAndRange;
            case 'homeRuns':
                keyAndRange['key'] = "Home Runs";
                keyAndRange['range'] = [0,50];
                return keyAndRange;
            case 'walks':
                keyAndRange['key'] = "Walks";
                keyAndRange['range'] = [0,50];
                return keyAndRange;
            case 'rbis':
                keyAndRange['key'] = "RBIS";
                keyAndRange['range'] = [0,100];
                return keyAndRange;
                break;
                keyAndRange['key'] = "Average";
                keyAndRange['range'] = [300,1000];
                return keyAndRange;
        }

    }

    filterData = () =>{
        let dataArray = [];
        let keyAndRange = this.getKeyAndRange(this.props.statSelection);
        let stat = this.props.statSelection;

        this.props.playerStats.forEach(function(stats){
            let gridstat = {};
            if(keyAndRange.key == "Average" || keyAndRange.key == "On Base %")
                gridstat[keyAndRange.key] = stats[stat]*1000;
            else
                gridstat[keyAndRange.key] = stats[stat];
            gridstat["Year"] = stats.year;


            dataArray.push(
                gridstat
            )
        });

        dataArray = dataArray.sort(this.compare);
        console.log(dataArray);
        return dataArray;
    };

    yAxisDomain = () => {
        let keyAndRange = this.getKeyAndRange(this.props.statSelection);
        console.log(keyAndRange.range);
        return keyAndRange.range;
    };

    getDataKey = () => {
        let keyAndRange = this.getKeyAndRange(this.props.statSelection);
        console.log(keyAndRange.range);
        return keyAndRange.key;
    }


    render() {
        return (
            <div className="gridSize">
                <LineChart
                    width={350}
                    height={200}
                    data={this.filterData()}
                    margin={{
                        top: 10, right: 30, left: 0, bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Year" />
                    {/*<YAxis type="number" domain={['dataMin - 100', 'dataMax + 100']} />*/}
                    <YAxis type="number" domain={this.yAxisDomain()} />

                    <Tooltip />
                    <Line type="monotone" dataKey={this.getDataKey()} stroke="#8884d8" fill="#8884d8" />
                </LineChart>

            </div>
        )
    }
}

export default PlayerChart;

