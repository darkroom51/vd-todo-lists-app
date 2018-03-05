import React from 'react';

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Add from 'material-ui/svg-icons/content/add';


const TodoListsAdd = (props) => (
    <div>
        <TextField
            hintText={"New List..."}
            fullWidth={true}
            value={props.state.newListName}
            onChange={props.handleNewListName}
        />
        <RaisedButton
            label={"create list"}
            primary={true}
            fullWidth={true}
            icon={<Add/>}
            onClick={props.addList}
        />
    </div>
)

export default TodoListsAdd;