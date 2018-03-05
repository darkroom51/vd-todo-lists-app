import React from 'react';

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import BorderColor from 'material-ui/svg-icons/editor/border-color';
import Save from 'material-ui/svg-icons/content/save';
import Cancel from 'material-ui/svg-icons/navigation/cancel';


const TodoListEdit = (props) => (
    <div>
        {
            props.state.editMode !== props.el.id ?
                <div>
                    {props.el.name}
                    <BorderColor
                        style={{display: 'inline-block', color: '#aaa', height: 15, paddingLeft: 15}}
                        onClick={() => {props.editTask(props.el.id, props.el.name)}}
                    />
                </div>
                :
                <div>
                    <TextField
                        name={"el.id"}
                        fullWidth={true}
                        value={props.state.editTaskName}
                        onChange={props.handleEditTaskName}
                    />
                    <RaisedButton
                        label={"save"}
                        fullWidth={true}
                        primary={true}
                        icon={<Save/>}
                        onClick={() => {props.updateTask(props.el.id, props.state.editTaskName)}}
                    />
                    <RaisedButton
                        label={"cancel"}
                        fullWidth={true}
                        secondary={true}
                        icon={<Cancel/>}
                        onClick={props.cancelEditTask}
                    />
                </div>
        }
    </div>
)

export default TodoListEdit;