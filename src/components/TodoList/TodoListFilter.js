import React from 'react';

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardHeader, CardText} from 'material-ui/Card';


const TodoListFilter = (props) => (
    <div>
        <Card>
            <CardHeader
                title={
                    props.state.filterTaskName !== '' || props.state.filterTasksSelect !== 0
                        ?
                        "Filter is ON"
                        :
                        "Filter Your Todos"
                }
                actAsExpander={true}
                showExpandableButton={true}
                style={{padding: 10, backgroundColor: '#efefef'}}
            />
            <CardText
                expandable={true}
                style={{textAlign: 'left', paddingTop: '0px'}}
            >
                <TextField
                    floatingLabelText="Find your Todo ..."
                    fullWidth={true}
                    value={props.state.filterTaskName}
                    onChange={props.handleFilterTaskName}
                />
                <SelectField
                    floatingLabelText="Todos status"
                    value={props.state.filterTasksSelect}
                    onChange={props.handleFilterTasksSelect}
                    style={{display: 'inline-block'}}
                >
                    <MenuItem value={0} primaryText="All Todos" style={{color: "#BDBDBD"}}/>
                    <MenuItem value={1} primaryText="Undone Todos"/>
                    <MenuItem value={2} primaryText="Done Todos"/>
                </SelectField>
            </CardText>
        </Card>
    </div>
)

export default TodoListFilter;