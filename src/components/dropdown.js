import React from "react";

class Dropdown extends React.Component {
    render() {
        return (
                <div className="btn-group m-2">
                    {console.log(this.props.selected)}
                    <button type="button" onClick={this.props.submitGroup} className="btn btn-success">{this.props.selected}</button>
                    <button type="button" onClick={this.props.showGroups} className="btn btn-success dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="sr-only"></span>
                    </button>
                    <div className="dropdown-menu">
                        {this.props.groups.map(dropItem => (
                            <h5 key={dropItem} onClick={() => this.props.changeDropdownValue(dropItem)} className="dropdown-item" >{dropItem}</h5>
                        ))}
                    </div>
                </div>
        );
    }
}


export default Dropdown;