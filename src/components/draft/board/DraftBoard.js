import React, {Component} from "react";
import { css } from '@emotion/core';
import "../../stats/grid/StatsGrid.css";
import { Table, Label } from 'semantic-ui-react'
import StatsGrid from "../../stats/grid/StatsGrid";
import PropTypes from "prop-types";


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class DraftBoard extends Component  {

    constructor(props){
        super(props);
    }


    getStripedStyle(){
        return { 'backgroundColor': '#fffe7a' };
    }

    undoPickRequest(){

        fetch(`http://localhost:8080/v1/soft-ball/draft/undo-pick?draftId=`+ this.props.draftId)
            .then(response => response.json())
            .then(this.props.undoPick())
            .catch(error => this.setState({ error, isLoading: false }));
    };

    getPick = (round, pick) =>{
        let player = "";
        if(this.props.draft){
            this.props.draft.picks.forEach( draftPick => {
                if(draftPick.round === round && draftPick.pick === pick)
                    player = draftPick.playerDTO.name;
            })
        }
        return player.trim();
    };

    undoPick = () => {
        this.undoPickRequest();
    }

    componentDidMount(){
    }

    render(){
        return (
            <div>
                <button onClick={this.undoPick}>undo</button>
                <Table striped celled compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{'width':'10px'}} />
                            <Table.HeaderCell>Jesse</Table.HeaderCell>
                            <Table.HeaderCell>Tom</Table.HeaderCell>
                            <Table.HeaderCell>James</Table.HeaderCell>
                            <Table.HeaderCell>Justin</Table.HeaderCell>
                            <Table.HeaderCell>Brett</Table.HeaderCell>
                            <Table.HeaderCell>Darren</Table.HeaderCell>
                            <Table.HeaderCell style={{'width':'10px'}} />
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row >
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>{this.getPick(1,1)}</Table.Cell>
                            <Table.Cell>{this.getPick(1,2)}</Table.Cell>
                            <Table.Cell>{this.getPick(1,3)}</Table.Cell>
                            <Table.Cell>{this.getPick(1,4)}</Table.Cell>
                            <Table.Cell>{this.getPick(1,5)}</Table.Cell>
                            <Table.Cell>{this.getPick(1,6)}</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row style={{ ...this.getStripedStyle() }}>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>{this.getPick(2,6)}</Table.Cell>
                            <Table.Cell>{this.getPick(2,5)}</Table.Cell>
                            <Table.Cell>{this.getPick(2,4)}</Table.Cell>
                            <Table.Cell>{this.getPick(2,3)}</Table.Cell>
                            <Table.Cell>{this.getPick(2,2)}</Table.Cell>
                            <Table.Cell>{this.getPick(2,1)}</Table.Cell>
                            <Table.Cell>2</Table.Cell>

                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>3</Table.Cell>
                            <Table.Cell>{this.getPick(3,1)}</Table.Cell>
                            <Table.Cell>{this.getPick(3,2)}</Table.Cell>
                            <Table.Cell>{this.getPick(3,3)}</Table.Cell>
                            <Table.Cell>{this.getPick(3,4)}</Table.Cell>
                            <Table.Cell>{this.getPick(3,5)}</Table.Cell>
                            <Table.Cell>{this.getPick(3,6)}</Table.Cell>
                            <Table.Cell></Table.Cell>

                        </Table.Row>

                        <Table.Row style={{ ...this.getStripedStyle() }}>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>{this.getPick(4,6)}</Table.Cell>
                            <Table.Cell>{this.getPick(4,5)}</Table.Cell>
                            <Table.Cell>{this.getPick(4,4)}</Table.Cell>
                            <Table.Cell>{this.getPick(4,3)}</Table.Cell>
                            <Table.Cell>{this.getPick(4,2)}</Table.Cell>
                            <Table.Cell>{this.getPick(4,1)}</Table.Cell>
                            <Table.Cell>4</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>5</Table.Cell>
                            <Table.Cell>{this.getPick(5,1)}</Table.Cell>
                            <Table.Cell>{this.getPick(5,2)}</Table.Cell>
                            <Table.Cell>{this.getPick(5,3)}</Table.Cell>
                            <Table.Cell>{this.getPick(5,4)}</Table.Cell>
                            <Table.Cell>{this.getPick(5,5)}</Table.Cell>
                            <Table.Cell>{this.getPick(5,6)}</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row style={{ ...this.getStripedStyle() }}>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>{this.getPick(6,6)}</Table.Cell>
                            <Table.Cell>{this.getPick(6,5)}</Table.Cell>
                            <Table.Cell>{this.getPick(6,4)}</Table.Cell>
                            <Table.Cell>{this.getPick(6,3)}</Table.Cell>
                            <Table.Cell>{this.getPick(6,2)}</Table.Cell>
                            <Table.Cell>{this.getPick(6,1)}</Table.Cell>
                            <Table.Cell>6</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>7</Table.Cell>
                            <Table.Cell>{this.getPick(7,1)}</Table.Cell>
                            <Table.Cell>{this.getPick(7,2)}</Table.Cell>
                            <Table.Cell>{this.getPick(7,3)}</Table.Cell>
                            <Table.Cell>{this.getPick(7,4)}</Table.Cell>
                            <Table.Cell>{this.getPick(7,5)}</Table.Cell>
                            <Table.Cell>{this.getPick(7,6)}</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row style={{ ...this.getStripedStyle() }}>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>{this.getPick(8,6)}</Table.Cell>
                            <Table.Cell>{this.getPick(8,5)}</Table.Cell>
                            <Table.Cell>{this.getPick(8,4)}</Table.Cell>
                            <Table.Cell>{this.getPick(8,3)}</Table.Cell>
                            <Table.Cell>{this.getPick(8,2)}</Table.Cell>
                            <Table.Cell>{this.getPick(8,1)}</Table.Cell>
                            <Table.Cell>8</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>9</Table.Cell>
                            <Table.Cell>{this.getPick(9,1)}</Table.Cell>
                            <Table.Cell>{this.getPick(9,2)}</Table.Cell>
                            <Table.Cell>{this.getPick(9,3)}</Table.Cell>
                            <Table.Cell>{this.getPick(9,4)}</Table.Cell>
                            <Table.Cell>{this.getPick(9,5)}</Table.Cell>
                            <Table.Cell>{this.getPick(9,6)}</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row style={{ ...this.getStripedStyle() }}>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>{this.getPick(10,6)}</Table.Cell>
                            <Table.Cell>{this.getPick(10,5)}</Table.Cell>
                            <Table.Cell>{this.getPick(10,4)}</Table.Cell>
                            <Table.Cell>{this.getPick(10,3)}</Table.Cell>
                            <Table.Cell>{this.getPick(10,2)}</Table.Cell>
                            <Table.Cell>{this.getPick(10,1)}</Table.Cell>
                            <Table.Cell>10</Table.Cell>
                        </Table.Row>
                        <Table.Row >
                            <Table.Cell>11</Table.Cell>
                            <Table.Cell>{this.getPick(11,1)}</Table.Cell>
                            <Table.Cell>{this.getPick(11,2)}</Table.Cell>
                            <Table.Cell>{this.getPick(11,3)}</Table.Cell>
                            <Table.Cell>{this.getPick(11,4)}</Table.Cell>
                            <Table.Cell>{this.getPick(11,5)}</Table.Cell>
                            <Table.Cell>{this.getPick(11,6)}</Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row style={{ ...this.getStripedStyle() }}>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>{this.getPick(12,6)}</Table.Cell>
                            <Table.Cell>{this.getPick(12,5)}</Table.Cell>
                            <Table.Cell>{this.getPick(12,4)}</Table.Cell>
                            <Table.Cell>{this.getPick(12,3)}</Table.Cell>
                            <Table.Cell>{this.getPick(12,2)}</Table.Cell>
                            <Table.Cell>{this.getPick(12,1)}</Table.Cell>
                            <Table.Cell>12</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}
StatsGrid.propTypes = {
    draftId: PropTypes.string,
    draft: PropTypes.object,
    undoPick: PropTypes.func
};

export default DraftBoard;
