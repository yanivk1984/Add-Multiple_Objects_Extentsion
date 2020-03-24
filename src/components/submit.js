import React from "react";
import Dropdown from "./dropdown"

export class Submit extends React.Component {
    constructor(props) {
        super(props);

        this.container = {
            border: "solid black 1px",
            marginLeft: "40px",
            display: "inline",
            padding: "20px",
            position: "absolute"
        };

        this.buttonStyle = {
            marginLeft: "10px",
            backgroundColor: "green",
            border: "none",
            display: "inline",
        };

        this.general = {
            position: "relative",
            display: "inline",
        };

        this.input = {
            display: "inline",
            height: "30px",
            padding: "0px !important",
            marginLeft: "10px",
            marginBottom: "0px"
        };

        this.firstBtn = {
            display: "block",
        };
    }

    render() {
        return (
            <div style={this.container}>
                <button style={{...this.buttonStyle, ...this.firstBtn}} className="btn btn-primary" onClick={this.props.submit} >Submit</button>
                <div style={this.general}>
                    <Dropdown
                        submitGroup={this.props.submitGroup}
                        groups={this.props.groups}
                        selected={this.props.selected}
                        showGroups={this.props.showGroups}
                        changeDropdownValue={this.props.changeDropdownValue}
                    />
                </div>
            </div>
        )
    }
}
