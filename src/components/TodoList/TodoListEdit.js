import React, {Component} from 'react';

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import BorderColor from 'material-ui/svg-icons/editor/border-color';
import Save from 'material-ui/svg-icons/content/save';
import Cancel from 'material-ui/svg-icons/navigation/cancel';


class TodoListEdit extends Component {
    render() {
        return (
            <span>
                {
                    this.props.state.editMode !== this.props.el.id ?
                        <span>
                            {this.props.el.name}
                            <BorderColor
                                style={{display: 'inline-block', color: '#aaa', height: 15, paddingLeft: 15}}
                                onClick={() => {this.props.editTask(this.props.el.id, this.props.el.name)}}
                            />
                        </span>
                        :
                        <span>
                          <TextField
                              name={"el.id"}
                              fullWidth={true}
                              value={this.props.state.editTaskName}
                              onChange={this.props.handleEditTaskName}
                          />
                          <RaisedButton
                              label={"save"}
                              fullWidth={true}
                              primary={true}
                              icon={<Save/>}
                              onClick={() => {this.props.updateTask(this.props.el.id, this.props.state.editTaskName)}}
                          />
                          <RaisedButton
                              label={"cancel"}
                              fullWidth={true}
                              secondary={true}
                              icon={<Cancel/>}
                              onClick={this.props.cancelEditTask}
                          />
                        </span>
                }
            </span>
        );
    }
}

export default TodoListEdit;