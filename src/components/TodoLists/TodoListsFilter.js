import React from 'react';

import TextField from 'material-ui/TextField'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';


const TodoListsFilter = (props) => (
    <div>
        <Card>
            <CardHeader
                title={
                    props.state.filterListName !== '' || props.state.emptyListToggle
                        ?
                        "Filter is ON"
                        :
                        "Filter Your Lists"
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
                    floatingLabelText="Find your List ..."
                    fullWidth={true}
                    value={props.state.filterListName}
                    onChange={props.handleFilterListName}
                />
                <div style={{maxWidth: 200, paddingTop: 20}}>
                    <Toggle
                        label="Hide empty lists"
                        style={{display: 'inline-block'}}
                        toggled={props.state.emptyListToggle}
                        onToggle={props.handleEmptyListToggle}
                    />
                </div>
            </CardText>
        </Card>
    </div>
)

export default TodoListsFilter;