import React, { Component }  from "react";
import  CardList  from "./CardList";
import SearchBar from './SearchBar'
import './App.css';

class App extends Component {


    constructor(){
        super();
        this.state = {
            robots: [],
            searchField: ""
        }
    }

    componentDidMount(){
        fetch("http://jsonplaceholder.typicode.com/users")
        .then(response =>  response.json())
        .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) =>  {
        this.setState({searchField: event.target.value});
    }

    render(){

        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
        });

        if(this.state.robots.length === 0){
            return <h1>Loading</h1>
        }
        else{
            return (
                <div className="tc">
                    <h1 className="f1">Robo Friends App</h1>
                    <SearchBar searchChange={this.onSearchChange} />
                    <CardList robots={filteredRobots}/>
                </div>
            );
        }
    }
}

export default App;