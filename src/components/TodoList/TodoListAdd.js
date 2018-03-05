import React from 'react';

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Add from 'material-ui/svg-icons/content/add';


const TodoListAdd = (props) => (
    <div>
        <TextField
            hintText={"New Todo..."}
            fullWidth={true}
            value={props.state.newTaskName}
            onChange={props.handleNewTaskNameInput}
        />
        <RaisedButton
            label={"add todo"}
            primary={true}
            fullWidth={true}
            icon={<Add/>}
            onClick={props.addTask}
        />
    </div>
)

export default TodoListAdd;