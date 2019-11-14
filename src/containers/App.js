import React, { Component }  from "react";
import { connect } from 'react-redux';
import  CardList  from "../components/CardList";
import SearchBar from '../components/SearchBar'
import './App.css';
import Scroll from "../components/Scroll";

import { setSearchField } from "../actions";

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {
    constructor(){
        super();
        this.state = {
            robots: []
        }
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response =>  response.json())
        .then(users => this.setState({robots: users}));
    }

    render(){
        const { robots } = this.state;
        const { searchField } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return !robots.length ?
             <h1>Loading</h1>
        :
            (
                <div className="tc">
                    <h1 className="f1">Robo Friends App</h1>
                    <SearchBar searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);