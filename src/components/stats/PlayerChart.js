import React, { Component } from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
//import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

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

    filterData = () =>{
        let dataArray = [];
        this.props.playerStats.forEach(function(stats){
            dataArray.push(
                {Year:stats.year ,Average:stats.average*1000}
            )
        });
        dataArray = dataArray.sort(this.compare);
        return dataArray;
    };

    data = [
        {Year: '2013', Average: 768},
        {Year: '2014', Average: 701},
        {Year: '2015', Average: 702},
        {Year: '2016', Average: 746},
        {Year: '2017', Average: 618},
        {Year: '2018', Average: 703}
    ];

    render() {
        return (
            <div>
                <LineChart
                    width={400}
                    height={200}
                    data={this.filterData()}
                    margin={{
                        top: 10, right: 30, left: 0, bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Year" />
                    {/*<YAxis type="number" domain={['dataMin - 100', 'dataMax + 100']} />*/}
                    <YAxis type="number" domain={[300, 1000]} />

                    <Tooltip />
                    <Line type="monotone" dataKey="Average" stroke="#8884d8" fill="#8884d8" />
                </LineChart>

            </div>
        )
    }
}

export default PlayerChart;

