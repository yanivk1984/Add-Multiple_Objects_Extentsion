import React from 'react'

class Obj extends React.Component {
    constructor(prop) {
        super(prop);
    }

    handleChange = (e) => {
        this.props.handleCellChange(this.props.state.id, e.target.name, e.target.value)
    };

    render() {
        return (
            <tr>
                <td>{this.props.index}</td>
                <td><input value={this.props.state.name} name="name"
                           onChange={this.handleChange}/></td>
                <td><input value={this.props.state.ip} name="ip"
                           onChange={this.handleChange}/></td>
                <td><input value={this.props.state.comment} name="comment"
                           onChange={this.handleChange}/></td>
                <td onClick={() => this.props.deleteObject(this.props.state.name)}>
                    <button className="btn btn-danger">Delete</button>
                </td>
            </tr>
        )
    }
}

export default Obj