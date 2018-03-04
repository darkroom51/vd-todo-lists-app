import React, {Component} from 'react';

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Add from 'material-ui/svg-icons/content/add';


class TodoListsAdd extends Component {
    render() {
        return (
            <div>
                <TextField
                    hintText={"New List..."}
                    fullWidth={true}
                    value={this.props.state.newListName}
                    onChange={this.props.handleNewListName}
                />
                <RaisedButton
                    label={"create list"}
                    primary={true}
                    fullWidth={true}
                    icon={<Add/>}
                    onClick={this.props.addList}
                />
            </div>
        );
    }
}

export default TodoListsAdd;