import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import BorderColor from 'material-ui/svg-icons/editor/border-color';
import TextField from 'material-ui/TextField'

const styles = {
    editBtn: {
        display: "block",
        position: "absolute",
        right: 24,
        top: 12,
        height: 24,
        width: 24
    }
}

class TodoListsEdit extends React.Component {
    state = {
        editListName: this.props.name,

        open: false
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = (listId, listName) => {
        if (this.props.listName!=='') {
            const taskObj = {
                name: listName
            }
            fetch(`https://todos.venturedevs.net/api/todolists/${listId}/`, {
                method: 'PATCH',
                body: JSON.stringify(taskObj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
            console.log(taskObj)
        }
    }

    handleEditListName = (event, value) => {
        this.setState({editListName: event.target.value})
    }



    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Update"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.handleSubmit(this.props.id, this.state.editListName)}
            />,
        ];


        return (
            <div>
                <div
                    tooltip="Edit"
                    style={styles.editBtn}
                    onClick={this.handleOpen}>
                    <BorderColor color={"#777"}/>
                </div>

                <Dialog
                    title="Edit List Name"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <TextField
                        name={"this.props.id"}
                        fullWidth={true}
                        value={this.state.editListName}
                        onChange={this.handleEditListName}
                    />
                </Dialog>
            </div>
        );
    }
}


export default TodoListsEdit