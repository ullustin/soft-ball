import React, { Component } from "react";
import ReactFileReader from 'react-file-reader';
import { Table, Button, Card,} from "tabler-react";

class StatsUpload extends Component{

    constructor(props){
        super(props);
        this.state = {
            uploadedStats: [],

        };
    }

    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function(e) {

            const csv = reader.result;
            let lines = csv.split("\n");
            let result = [];
            let headers=lines[0].split(',');
            for(var i=1;i<lines.length;i++){
                var obj = {};
                var currentline=lines[i].split(',');
                for(var j=0;j<headers.length;j++){
                    obj[headers[j]] = currentline[j];
                }
                if(obj.Name.length > 0){
                    result.push(obj);
                }
            }
            this.setState({
                uploadedStats:result
            });

        }.bind(this);
        reader.readAsText(files[0]);
    };

    uploadTemplate = () =>{
        return (
        <ReactFileReader handleFiles={this.handleFiles}  fileTypes={'.csv'}>
            <button className='btn'>Upload Stats</button>
        </ReactFileReader>
        )
    };

    getCreatedPlayerRows = () => {
        let finalData = this.state.uploadedStats.map(function(item){
            return(
                <Table.Row key={item.playerId}>
                    <Table.Col alignContent="center">{item.year}</Table.Col>
                    <Table.Col alignContent="center">{item.Name}</Table.Col>
                    <Table.Col alignContent="center" >{item.plateAppearances}</Table.Col>
                    <Table.Col alignContent="center" >{item.atBats}</Table.Col>
                    <Table.Col alignContent="center" >{item.runs}</Table.Col>
                    <Table.Col alignContent="center" >{item.hits}</Table.Col>
                    <Table.Col alignContent="center" >{item.firstBase}</Table.Col>
                    <Table.Col alignContent="center" >{item.secondBase}</Table.Col>
                    <Table.Col alignContent="center" >{item.thirdBase}</Table.Col>
                    <Table.Col alignContent="center" >{item.homeRuns}</Table.Col>
                    <Table.Col alignContent="center" >{item.rbis}</Table.Col>
                    <Table.Col alignContent="center" >{item.walks}</Table.Col>
                    <Table.Col alignContent="center" >{item.battingPercentage}</Table.Col>
                    <Table.Col alignContent="center" >{item.average}</Table.Col>
                    <Table.Col alignContent="center" >{item.captain}</Table.Col>
                    <Table.Col alignContent="center" >{item.defensivePosition}</Table.Col>
                </Table.Row>
            );
        });

        return finalData;
    };


    fetchPlayers(){
        fetch(`http://167.99.103.86/v1/soft-ball/stats/get-all-players-and-stats`)
            .then(response => response.json())
            .then(
                data => {
                    this.setState({
                        players:data
                    });
                }
            )
            .catch(error => this.setState({ error, isLoading: false }));
    }

    convertToDTO = (dataArray) =>{
        let dto = [];
        dataArray.forEach(function(item){
            let playerDTO = {
                name:item.Name,
                statsDTOS:[]
            };

            let statsDTO = {
                year: item.year,
                plateAppearances: item.plateAppearances,
                atBats: item.atBats,
                runs: item.runs,
                hits: item.hits,
                firstBase: item.firstBase,
                secondBase: item.secondBase,
                thirdBase: item.thirdBase,
                homeRuns: item.homeRuns,
                rbis: item.rbis,
                walks: item.walks,
                battingPercentage: item.battingPercentage,
                average: item.average,
                slugingPercentage: item.slugingPercentage,
                playersInScoringPosition: item.playersInScoringPosition,
                captain: item.captain,
                defensivePosition: item.defensivePosition
            };
            playerDTO.statsDTOS.push(statsDTO);
            dto.push(playerDTO);
        });
        return dto;
    };

    postData = () => {
        let playersList = this.convertToDTO(this.state.uploadedStats);

        fetch(`http://http://167.99.103.86:8080/v1/soft-ball/stats/insert-uploaded-stats`, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(playersList), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    };


    render() {
        let template = this.uploadTemplate();
        let finalData = this.getCreatedPlayerRows();


        return(
            <div className="container">
                <h2></h2>
                <Button onClick={this.postData} color="primary">Post</Button>

                {template}
                <Card>
                    <Card.Header>
                        <Card.Title></Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table>
                            <Table.Header>
                                <Table.Row >
                                    <Table.ColHeader alignContent="center">year</Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >  Name</Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >PA      </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >AB      </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >Runs    </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >Hits    </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >Singles </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >Doubles </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >Triples </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >HR      </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >RBI     </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >Walks   </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >OBP     </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >AVG     </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >Captain     </Table.ColHeader>
                                    <Table.ColHeader alignContent="center" >Def Pos     </Table.ColHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {finalData}
                            </Table.Body>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default StatsUpload;