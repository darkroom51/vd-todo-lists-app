import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class TodoLists extends Component {
    state={
        todoLists: null,

        newListName: '',
        msg: ''
    }

    componentDidMount(){
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
                .then(() => this.setState({newListName: '', msg: 'List has been added successfully'}))
        }
    }

    newListNameInputHandler = (event) => {
        this.setState({newListName: event.target.value})
    }

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
                    onClick={this.addList}
                />
            <List>
                <Subheader>All Lists</Subheader>
                {
                    this.state.todoLists
                    &&
                    this.state.todoLists
                        .map((el)=>(
                            <ListItem
                                key={el.id}
                                primaryText={el.name}
                                secondaryText={`Todos in list: ${el.todos_count}`}
                                onClick={() => {this.props.history.push(`/todo-list/${el.id}`)}}
                            />
                        ))
                }
            </List>
            </div>
        );
    }
}

export default TodoLists;