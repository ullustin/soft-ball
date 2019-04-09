import React, {Component} from "react";
import {Grid, Card, Form, Button} from "tabler-react";
import PropTypes from "prop-types";
import "./Rankings.css";

class WeekRank extends Component{

    constructor(props){
        super(props);

    }

    handleSelectedRank = (event) => {
        let rank = null;
        this.props.weeklyRanks.map(function(item){
            if(item.id == event.target.value)
                rank = item;
        });

        this.props.weekRankHandler(rank);
    };

    createCards(handler){
        if(Object.entries(this.props.weeklyRanks).length !== 0){
            let finalData = this.props.weeklyRanks.map(function(item){
                return(
                    <Card key={item.id}>
                        <Card.Body className="weekRankStyle">
                            <Grid.Row>
                                <Grid.Col className="Position" width={12}>{item.position}</Grid.Col>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Col width={8}>Week {item.week}</Grid.Col>
                                <Grid.Col width={4}>
                                    <Button onClick={handler} value={item.id} color="primary">Rank</Button>
                                </Grid.Col>
                            </Grid.Row>
                        </Card.Body>
                    </Card>
                );
            });
            return finalData;
        } else{
            return(<div></div>);
        }

    }

    render(){
        return(
            <div>
                <Card>
                    <Card.Header>
                        <Card.Title>A-League Weekly Ranking</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        {this.createCards(this.handleSelectedRank)}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

WeekRank.propTypes = {
    weeklyRanks: PropTypes.array
}

export default WeekRank;