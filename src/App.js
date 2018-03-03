import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import TodoLists from './components/TodoLists'

const paperStyles = {
    margin: 20,
    padding: 20,
    textAlign: 'center'
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="container">
                    <AppBar
                        style={{textAlign: 'center'}}
                        showMenuIconButton={false}
                        title="ToDo Ur Life"
                    />
                    <Paper style={paperStyles}>
                        <TodoLists/>
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
