import React, {Component} from 'react';

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Add from 'material-ui/svg-icons/content/add';


class TodoListAdd extends Component {
    render() {
        return (
            <div>
                <TextField
                    hintText={"New Todo..."}
                    fullWidth={true}
                    value={this.props.state.newTaskName}
                    onChange={this.props.handleNewTaskNameInput}
                />
                <RaisedButton
                    label={"add todo"}
                    primary={true}
                    fullWidth={true}
                    icon={<Add />}
                    onClick={this.props.addTask}
                />
            </div>
        );
    }
}

export default TodoListAdd;