import React from "react";

export class TopBar extends React.Component {
    render() {
        const style = {
            backgroundColor: "#E65684",
            height: "50px",
            alignItems: "center",
            border: "black solid 1px",
            marginBottom: "10px",
            fontFamily: "Sans-Serif",
        };
        const textStyle = {
            marginLeft: "10px"
        };

        return (
            <div style={style}>
                <h3 style={textStyle}>Check Point Object Adder</h3>
            </div>
        )
    }
}