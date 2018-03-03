import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class TodoList extends Component {
    state={
        todoList: null,
        listId: this.props.match.params.id,

        newTaskName: '',
        msg:''
    }

    componentDidMount(){
        fetch(`https://todos.venturedevs.net/api/todolists/${this.state.listId}`)
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
                .then(() => this.setState({newTaskName: '', msg: 'Task has been added successfully'}))
        }
    }

    newTaskNameInputHandler = (event) => {
        this.setState({newTaskName: event.target.value})
    }


    render() {
        //console.log(this.state.todoList) //wld_CL

        return (
            <div>
                <TextField
                    hintText={"New Task..."}
                    fullWidth={true}
                    value={this.state.newTaskName}
                    onChange={this.newTaskNameInputHandler}
                />
                <RaisedButton
                    label={"add"}
                    primary={true}
                    fullWidth={true}
                    onClick={this.addTask}
                />
                <List>
                    <Subheader>Single List</Subheader>
                    {
                        this.state.todoList
                        &&
                        this.state.todoList
                            .map((el)=>(
                                <ListItem
                                    key={el.id}
                                    primaryText={el.name}
                                    secondaryText={`Is complete: ${el.is_complete}`}
                                    onClick={() => {this.props.history.push(`/todo-list/${el.id}`)}}
                                />
                            ))
                    }
                </List>
            </div>
        );
    }
}

export default TodoList;