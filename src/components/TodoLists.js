import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Add from 'material-ui/svg-icons/content/add';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Save from 'material-ui/svg-icons/content/save';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import TodoListsEdit from './TodoListsEdit'


class TodoLists extends Component {
    state = {
        todoLists: null,

        newListName: '',
        filterListName: '',
        editMode: -1,
        editListName: '',
        snackbarOpen: false,
        msg: ''
    }

    componentDidMount() {
        this.getLists()
    }

    getLists = () => {
        fetch(`https://todos.venturedevs.net/api/todolists/`)
            .then(response => response.json())
            .then(data => this.setState({todoLists: data}))
    }

    addList = () => {
        if (this.state.newListName) {
            const listObj = {
                name: this.state.newListName
            }
            fetch(`https://todos.venturedevs.net/api/todolists/`, {
                method: 'POST',
                body: JSON.stringify(listObj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => console.log(json))
                .then(() => {
                    this.getLists()
                    this.setState({newListName: '', msg: 'List has been added successfully', snackbarOpen: true})
                })
        }
    }

    deleteList = (listId) => {
        fetch(`https://todos.venturedevs.net/api/todolists/${listId}/`, {
            method: 'DELETE'
        })
            //.then(response => console.log(response))
            .then(() => {
                this.getLists();
                this.setState({msg: 'List has been deleted successfully', snackbarOpen: true})
            })
        console.log(listId)
    }

    // editList = (taskId, taskName) => {
    //     this.setState({editMode: taskId, editListName: taskName})
    // }

    // updateList = (taskId, taskName) => {
    //     const taskObj = {
    //         //id: taskId,
    //         name: taskName
    //         //is_complete: !taskDone
    //         //todo_list: todoListId
    //     }
    //     fetch(`https://todos.venturedevs.net/api/todos/${taskId}/`, {
    //         method: 'PATCH',
    //         body: JSON.stringify(taskObj),
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(json => console.log(json))
    //         .then(() => {
    //             this.getTasks();
    //             this.setState({editMode: -1, msg: 'Task name has been updated successfully', snackbarOpen: true})
    //         })
    //         .catch(err => console.log(err))
    //     console.log(taskObj)
    // }


    newListNameInputHandler = (event) => {
        this.setState({newListName: event.target.value})
    }

    handleFilterListName = (event, value) => {
        this.setState({filterListName: event.target.value})
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbarOpen: false,
        });
    };

    render() {
        //console.log(this.state.todoLists) //wld_CL

        return (
            <div>
                <TextField
                    hintText={"New list..."}
                    fullWidth={true}
                    value={this.state.newListName}
                    onChange={this.newListNameInputHandler}
                />
                <RaisedButton
                    label={"create"}
                    primary={true}
                    fullWidth={true}
                    icon={<Add/>}
                    onClick={this.addList}
                />

                <Card>
                    <CardHeader
                        title={
                            this.state.filterListName !== '' ?
                                "Filter is ON"
                                :
                                "Filter Your Lists"
                        }
                        actAsExpander={true}
                        showExpandableButton={true}
                        style={{padding:10, backgroundColor:'#efefef'}}
                    />
                    <CardText
                        expandable={true}
                        style={{textAlign: 'left', paddingTop:'0px'}}
                    >
                        <TextField
                            floatingLabelText="Find your List ..."
                            fullWidth={true}
                            value={this.state.filterListName}
                            onChange={this.handleFilterListName}
                        />
                    </CardText>
                </Card>

                <List>
                    <Subheader>My All Lists</Subheader>
                    {
                        this.state.todoLists
                        &&
                        this.state.todoLists
                            .filter((el) => el.name.indexOf(this.state.filterListName) !== -1)
                            .map((el) => (
                                <div key={el.id}>
                                    <ListItem
                                        primaryText=
                                            {
                                                this.state.editMode !== el.id ?
                                                    <span>
                                                        {el.name}
                                                    </span>
                                                    :
                                                    <span>

                                                    <RaisedButton
                                                        label={"save"}
                                                        fullWidth={true}
                                                        primary={true}
                                                        icon={<Save />}
                                                        onClick={() => {this.updateList(el.id, this.state.editListName)}}
                                                    />
                                                    <RaisedButton
                                                        label={"cancel"}
                                                        fullWidth={true}
                                                        secondary={true}
                                                        icon={<Cancel />}
                                                        onClick={this.cancelEditList}
                                                    />
                                                    </span>
                                            }
                                        secondaryText={`Todos in list: ${el.todos_count}`}
                                        rightIconButton={
                                            <IconButton>
                                                <TodoListsEdit id={el.id} name={el.name}/>
                                                    <div
                                                        onClick={() => this.deleteList(el.id)}
                                                    >
                                                    <ActionDelete color={"#777"} />
                                                    </div>
                                            </IconButton>}
                                        onClick={() => {
                                            this.props.history.push(`/todo-list/${el.id}`)
                                        }}
                                    />
                                    <Divider/>
                                </div>
                            ))
                    }
                </List>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.msg}
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackbarClose}
                />
            </div>
        );
    }
}

export default TodoLists;