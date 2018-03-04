import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Add from 'material-ui/svg-icons/content/add';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import TodoListsEdit from './TodoListsEdit'
import TodoListsDelete from './TodoListsDelete'


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


    updateList = (listId, listName) => {
        const listObj = {
            name: listName
        }
        fetch(`https://todos.venturedevs.net/api/todolists/${listId}/`, {
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
                this.setState({editMode: -1, msg: 'List name has been updated successfully', snackbarOpen: true})
            })
            .catch(err => console.log(err))
        console.log(listObj)
    }


    newListNameInputHandler = (event) => {
        this.setState({newListName: event.target.value})
    }

    handleFilterListName = (event, value) => {
        this.setState({filterListName: event.target.value})
    }

    handleEmptyListToggle = (event, toggle) => this.setState({emptyListToggle: toggle})

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
                        <div style={{maxWidth: 200, paddingTop: 20}}>
                            <Toggle
                                label="Hide empty lists"
                                style={{display: 'inline-block'}}
                                toggled={this.state.emptyListToggle}
                                onToggle={this.handleEmptyListToggle}
                            />
                        </div>
                    </CardText>
                </Card>

                <List>
                    <Subheader>All Lists</Subheader>
                    {
                        this.state.todoLists
                        &&
                        this.state.todoLists
                            .filter((el) => el.name.indexOf(this.state.filterListName) !== -1)
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