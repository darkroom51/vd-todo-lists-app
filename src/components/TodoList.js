import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ActionDelete from 'material-ui/svg-icons/action/delete';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import CheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import BorderColor from 'material-ui/svg-icons/editor/border-color';
import Save from 'material-ui/svg-icons/content/save';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Add from 'material-ui/svg-icons/content/add';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';


class TodoList extends Component {
    state = {
        todoList: null,
        listId: this.props.match.params.id,

        newTaskName: '',
        filterTaskName: '',
        filterTasksSelect: 0,
        editMode: -1,
        editTaskName: '',
        snackbarOpen: false,
        msg: ''
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks = () => {
        fetch(`https://todos.venturedevs.net/api/todolists/${this.state.listId}/`)
            .then(response => response.json())
            .then(data => this.setState({todoList: data}))
    }

    addTask = () => {
        if (this.state.newTaskName) {
            const taskObj = {
                name: this.state.newTaskName,
                is_complete: false,
                todo_list: this.state.listId
            }
            fetch(`https://todos.venturedevs.net/api/todos/`, {
                method: 'POST',
                body: JSON.stringify(taskObj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => response.json())
                .then(json => console.log(json))
                .then(() => {
                    this.getTasks();
                    this.setState({newTaskName: '', msg: 'Task has been added successfully', snackbarOpen: true})
                })
        }
    }

    deleteTask = (taskId) => {
        fetch(`https://todos.venturedevs.net/api/todos/${taskId}/`, {
            method: 'DELETE'
        })
        //.then(response => console.log(response))
            .then(() => {
                this.getTasks();
                this.setState({msg: 'Task has been deleted successfully', snackbarOpen: true})
            })
    }

    toggleDoneTask = (taskId, taskName, taskDone, todoListId) => {
        const taskObj = {
            //id: taskId,
            //name: taskName,
            is_complete: !taskDone
            //todo_list: todoListId
        }
        fetch(`https://todos.venturedevs.net/api/todos/${taskId}/`, {
            method: 'PATCH',
            body: JSON.stringify(taskObj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .then(() => {
                this.getTasks();
                this.setState({msg: 'Task "completed/uncompleted" toggled successfully', snackbarOpen: true})
            })
            .catch(err => console.log(err))
        console.log(taskObj)
    }

    editTask = (taskId, taskName) => {
        this.setState({editMode: taskId, editTaskName: taskName})
    }

    updateTask = (taskId, taskName) => {
        const taskObj = {
            //id: taskId,
            name: taskName
            //is_complete: !taskDone
            //todo_list: todoListId
        }
        fetch(`https://todos.venturedevs.net/api/todos/${taskId}/`, {
            method: 'PATCH',
            body: JSON.stringify(taskObj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .then(() => {
                this.getTasks();
                this.setState({editMode: -1, msg: 'Task name has been updated successfully', snackbarOpen: true})
            })
            .catch(err => console.log(err))
        console.log(taskObj)
    }

    cancelEditTask = () => {
        this.setState({editMode: -1, editTaskName: ''})
    }

    handleNewTaskNameInput = (event) => {
        this.setState({newTaskName: event.target.value})
    }

    handleFilterTaskName = (event, value) => {
        this.setState({filterTaskName: event.target.value})
    }

    handleFilterTasksSelect = (event, index, value) => {
        this.setState({filterTasksSelect: value})
    }

    handleEditTaskName = (event, value) => {
        this.setState({editTaskName: event.target.value})
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbarOpen: false,
        });
    };


    render() {
        //console.log(this.state.todoList) //wld_CL

        return (
            <div>
                <TextField
                    hintText={"New Todo..."}
                    fullWidth={true}
                    value={this.state.newTaskName}
                    onChange={this.handleNewTaskNameInput}
                />
                <RaisedButton
                    label={"add"}
                    primary={true}
                    fullWidth={true}
                    icon={<Add />}
                    onClick={this.addTask}
                />

                <Card>
                    <CardHeader
                        title={
                            this.state.filterTaskName !== '' ?
                                "Filter is ON"
                                :
                                "Filter Your Todos"
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
                            floatingLabelText="Find your Todo ..."
                            fullWidth={true}
                            value={this.state.filterTaskName}
                            onChange={this.handleFilterTaskName}
                        />
                        <SelectField
                            floatingLabelText="Todos status"
                            value={this.state.filterTasksSelect}
                            onChange={this.handleFilterTasksSelect}
                            style={{display: 'inline-block'}}
                        >
                            <MenuItem value={0} primaryText="All Todos" style={{color: "#BDBDBD"}}/>
                            <MenuItem value={1} primaryText="Undone Todos"/>
                            <MenuItem value={2} primaryText="Done Todos"/>
                        </SelectField>
                    </CardText>
                </Card>

                <List>
                    <Subheader>Single List</Subheader>
                    {
                        this.state.todoList
                        &&
                        this.state.todoList
                            .filter((el) => el.name.indexOf(this.state.filterTaskName) !== -1)
                            .filter((el) => (
                                this.state.filterTasksSelect === 0 ?
                                    true
                                    :
                                    this.state.filterTasksSelect === 1 ?
                                        el.is_complete === false
                                        :
                                        el.is_complete === true
                            ))
                            .map((el) => (
                                <div key={el.id}>
                                    <ListItem
                                        primaryText=
                                            {
                                                this.state.editMode !== el.id ?
                                                    <span>
                                                        {el.name}
                                                        <BorderColor
                                                            style={{display: 'inline-block', color: '#aaa', height: 15, paddingLeft:15}}
                                                            onClick={() => {this.editTask(el.id, el.name)}}
                                                        />
                                                    </span>
                                                    :
                                                    <span>
                                                    <TextField
                                                        name={"el.id"}
                                                        fullWidth={true}
                                                        value={this.state.editTaskName}
                                                        onChange={this.handleEditTaskName}
                                                    />
                                                    <RaisedButton
                                                        label={"save"}
                                                        fullWidth={true}
                                                        primary={true}
                                                        icon={<Save />}
                                                        onClick={() => {this.updateTask(el.id, this.state.editTaskName)}}
                                                    />
                                                    <RaisedButton
                                                        label={"cancel"}
                                                        fullWidth={true}
                                                        secondary={true}
                                                        icon={<Cancel />}
                                                        onClick={this.cancelEditTask}
                                                    />
                                                    </span>
                                            }

                                        rightIcon={<ActionDelete onClick={() => this.deleteTask(el.id)}/>}
                                        leftIcon={
                                            el.is_complete === false ?
                                                <CheckBoxOutlineBlank
                                                    onClick={() => this.toggleDoneTask(el.id, el.name, el.is_complete, this.state.listId)}/>
                                                :
                                                <CheckBox
                                                    onClick={() => this.toggleDoneTask(el.id, el.name, el.is_complete, this.state.listId)}/>
                                        }
                                        style={
                                            el.is_complete === false ?
                                                {textDecoration: 'none'}
                                                :
                                                {textDecoration: 'line-through', color: '#999'}
                                        }
                                        disabled={true}
                                    />
                                    <Divider/>
                                </div>
                            ))
                    }
                </List>
                <Divider/>
                <RaisedButton
                    label={"back to lists"}
                    default={true}
                    fullWidth={true}
                    icon={<ArrowBack />}
                    onClick={this.props.history.goBack}
                />
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

export default TodoList;