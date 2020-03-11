import React, {Component} from "react"
import {Table, Button, Card} from "tabler-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Admin.css"

class League extends Component{

    constructor(props){
        super(props)
    }

    createLeagueTable = () =>{
        return (
            <Table>
                <Table.Header className="leagueHeader">
                    <Table.ColHeader></Table.ColHeader>
                    <Table.ColHeader>League</Table.ColHeader>
                    <Table.ColHeader>Year</Table.ColHeader>
                    <Table.ColHeader><FontAwesomeIcon size="2x" icon="plus"/></Table.ColHeader>
                </Table.Header>
                <Table.Body className="leagueBody">
                    <Table.Row className="middleAlign">
                        <Table.Col className="middleAlign">1</Table.Col>
                        <Table.Col className="middleAlign">A League</Table.Col>
                        <Table.Col className="middleAlign">2019</Table.Col>
                        <Table.Col className="middleAlign">
                            <Button color="primary">Edit</Button>
                        </Table.Col>
                    </Table.Row>
                </Table.Body>
            </Table>

        )
    };

    render(){
        return(
            <div>
                <Card>
                    <Card.Body>
                        {this.createLeagueTable()}
                    </Card.Body>
                </Card>

            </div>
        )
    }
}
export default League