import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Nav, Grid} from "tabler-react";

import './App.css';
import Home from "./components/Home"
import Stats from "./components/stats/Stats";
import StatsUpload from "./components/stats/StatsUpload"
import Rankings from "./components/rankings/Rankings"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSort, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleUp);
library.add(faAngleDown);
library.add(faSort);

class App extends Component {
  render() {
    return (
        <Router>
            <div>

                <Grid.Row>
                    <Grid.Col width={12}>
                        <Nav>
                            <Nav.Item ></Nav.Item>
                            <Nav.Item icon="globe"></Nav.Item>
                            <Nav.Item to="/">Home</Nav.Item>
                            <Nav.Item to="/stats">Stats</Nav.Item>

                        </Nav>
                    </Grid.Col>
                </Grid.Row>
                <Route path="/" exact component={Home}/>
                <Route path="/stats" component={Stats}/>
                <Route path="/upload-stats" component={StatsUpload}/>
                <Route path="/rankings" component={Rankings}/>

            </div>
        </Router>
    );
  }
}

export default App;
