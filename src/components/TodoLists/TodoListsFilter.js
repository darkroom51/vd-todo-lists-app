import React, {Component} from 'react';

import TextField from 'material-ui/TextField'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';


class TodoListsFilter extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardHeader
                        title={
                            this.props.state.filterListName !== '' || this.props.state.emptyListToggle
                                ?
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
                            value={this.props.state.filterListName}
                            onChange={this.props.handleFilterListName}
                        />
                        <div style={{maxWidth: 200, paddingTop: 20}}>
                            <Toggle
                                label="Hide empty lists"
                                style={{display: 'inline-block'}}
                                toggled={this.props.state.emptyListToggle}
                                onToggle={this.props.handleEmptyListToggle}
                            />
                        </div>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default TodoListsFilter;