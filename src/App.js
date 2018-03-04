import React, {Component} from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {BrowserRouter, Route} from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'

import TodoLists from './components/TodoLists'
import TodoList from './components/TodoList'
import {langTitle} from './config'


class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <BrowserRouter>
                <div className="wld-container">
                    <AppBar
                        style={{textAlign: 'center'}}
                        showMenuIconButton={false}
                        title={langTitle}
                    />
                    <Paper className="wld-paper-pm">
                        <Route path="/" exact={true} component={TodoLists}/>
                        <Route path="/todo-list/:id/" component={TodoList}/>
                    </Paper>
                </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;
