import React, {Component} from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';

import {urlTodoLists} from '../../config';
import TodoListsEdit from './TodoListsEdit'
import TodoListsDelete from './TodoListsDelete'
import TodoListsAdd from './TodoListsAdd'
import TodoListsFilter from './TodoListsFilter'


class TodoLists extends Component {
    state = {
        todoLists: null,

        newListName: '',
        filterListName: '',
        emptyListToggle: false,
        snackbarOpen: false,
        msg: ''
    }

    componentDidMount() {
        this.getLists()
    }

    getLists = () => {
        fetch(`${urlTodoLists}`)
            .then(response => response.json())
            .then(data => this.setState({todoLists: this.sortLists(data)}))
    }

    sortLists = (arr) => {
        return arr.sort((a,b)=>{
            return a.id - b.id
        })
    }

    addList = () => {
        if (this.state.newListName) {
            const listObj = {
                name: this.state.newListName
            }
            fetch(`${urlTodoLists}`, {
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
        fetch(`${urlTodoLists}${listId}/`, {
            method: 'DELETE'
        })
            .then(() => {
                this.getLists();
                this.setState({msg: 'List has been deleted successfully', snackbarOpen: true})
            })
    }

    updateList = (listId, listName) => {
        const listObj = {
            name: listName
        }
        fetch(`${urlTodoLists}${listId}/`, {
            method: 'PATCH',
            body: JSON.stringify(listObj),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => console.log(json))
            .then(() => {
                this.getLists();
                this.setState({msg: 'List name has been updated successfully', snackbarOpen: true})
            })
            .catch(err => console.log(err))
    }

    handleNewListName = (event) => {this.setState({newListName: event.target.value})}
    handleFilterListName = (event, value) => {this.setState({filterListName: event.target.value})}
    handleEmptyListToggle = (event, toggle) => {this.setState({emptyListToggle: toggle})}
    handleSnackbarClose = () => {this.setState({snackbarOpen: false,})}


    render() {
        return (
            <div>
                <TodoListsAdd
                    state={this.state}
                    handleNewListName={this.handleNewListName}
                    addList={this.addList}
                />
                <TodoListsFilter
                    state={this.state}
                    handleFilterListName={this.handleFilterListName}
                    handleEmptyListToggle={this.handleEmptyListToggle}
                />
                <List>
                    <Subheader>All Lists</Subheader>
                    {
                        this.state.todoLists
                        &&
                        this.state.todoLists
                            .filter((el) => el.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(this.state.filterListName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) !== -1)
                            .filter((el) => this.state.emptyListToggle ? el.todos_count > 0 : el)
                            .map((el) => (
                                <div key={el.id}>
                                    <ListItem
                                        primaryText={el.name}
                                        secondaryText={`Todos in list: ${el.todos_count}`}
                                        rightIconButton={
                                            <IconButton>
                                                <TodoListsEdit id={el.id} name={el.name} click={this.updateList}/>
                                                <TodoListsDelete id={el.id} click={this.deleteList}/>
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