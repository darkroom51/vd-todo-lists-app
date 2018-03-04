import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';


const styles = {
    deleteBtn: {
        display: "block",
        position: "absolute",
        right: 0,
        top: 12,
        height: 24,
        width: 24
    }
}


class TodoListsDelete extends React.Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = (listId) => {
            this.props.click(listId);
            this.handleClose();
    }


    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                keyboardFocused={true}
                onClick={() => this.handleSubmit(this.props.id)}
            />,
        ];


        return (
            <div>
                <div
                    style={styles.deleteBtn}
                    onClick={this.handleOpen}>
                    <ActionDelete color={"#777"}/>
                </div>

                <Dialog
                    title="Delete List"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <div>
                        <p>
                            This list and all its todos will be <span style={{color:'red',fontWeight:'bold'}}>permanently deleted</span>.<br />
                            This action can not be undone.
                        </p>
                        <p>Do you want to continue?</p>
                    </div>
                </Dialog>
            </div>
        );
    }
}


export default TodoListsDelete