import React from 'react'
import Obj from "./object";

class Objects extends React.Component {
    style = {
        display: "inline",
        width: "60%"
    };

    validateIp = () => {
        if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.props.state.ip.trim())) {
            alert("This is not valid ip-address");
            return ""
        }
        this.props.addObject()
    };

    render() {
        return (
            <table style={this.style} className="table table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Object Name</th>
                    <th>IP Address</th>
                    <th>Comment</th>
                    <th>
                        <button onClick={this.props.resetTable} className="btn btn-info">Reset</button>
                    </th>

                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>#</td>
                    <td><input value={this.props.state.name} name="name" onChange={this.props.handleChange}/></td>
                    <td><input value={this.props.state.ip} name="ip" onChange={this.props.handleChange}/></td>
                    <td><input value={this.props.state.comment} name="comment" onChange={this.props.handleChange}/></td>
                    <td>
                        <button onClick={this.validateIp} onChange={this.handleChange} className="btn btn-primary">Add
                        </button>
                    </td>
                </tr>

                {this.props.state.objects.map((obj, index) => (
                    <Obj
                        key={index}
                        index={index}
                        state={obj}
                        handleCellChange={this.props.handleCellChange}
                        deleteObject={this.props.deleteObject}
                    />
                ))}
                </tbody>
            </table>
        );
    }
}

export default Objects