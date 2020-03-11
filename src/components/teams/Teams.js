import React, {Component} from "react"
import EditTeam from "./EditTeam"
import NewTeam from "./EditTeam"

class Teams extends Component{

    constructor(props){
        super(props);

        this.state({

        })
    }

    render(){
        return(
            <div>
                <EditTeam/>
                <NewTeam/>
            </div>
        )
    }
}
export default Teams